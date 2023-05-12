
const fs = require('fs');
const http = require('http');
const path = require('path');

const jsonServer = require('json-server');
const CDP = require('chrome-remote-interface');

const url = 'https://www.example.com';
const port = 3000;
const dbPath = path.join(__dirname, 'db.json');

(async () => {
  // Launch a headless Chrome instance using Chrome Remote Interface
  const client = await CDP();
  const { Network, Page } = client;

  await Promise.all([Network.enable(), Page.enable()]);

  // Intercept all XHR API calls and store them in a JSON file
  const requests = [];
  Network.requestWillBeSent(params => {
    if (params.type === 'XHR') {
      requests.push({
        url: params.request.url,
        method: params.request.method,
        postData: params.request.postData
      });
    }
  });
  await Page.navigate({ url: url });
  await Page.loadEventFired();
  await client.close();
  fs.writeFileSync(dbPath, JSON.stringify({ requests: requests }, null, 2));

  // Create a JSON Server instance and serve the stored requests as mock API
  const server = jsonServer.create();
  const router = jsonServer.router(dbPath);
  const middlewares = jsonServer.defaults();

  server.use(middlewares);
  server.use(router);
  server.listen(port, () => {
    console.log(`Mock server is running at http://localhost:${port}`);
    const routes = Object.keys(router.db.getState());
    console.log(`Endpoints:`);
    routes.forEach(route => {
      console.log(route);
    });
  });
})();
