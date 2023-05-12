
const fs = require('fs');
const http = require('http');
const path = require('path');

const jsonServer = require('json-server');
const puppeteer = require('puppeteer');

const url = 'https://www.example.com';
const port = 3000;
const dbPath = path.join(__dirname, 'db.json');
const endpointsPath = path.join(__dirname, 'endpoints.json');

(async () => {
  // Launch a headless browser using Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Intercept network requests and store them in a JSON file
  const requests = [];
  await page.setRequestInterception(true);
  page.on('request', request => {
    requests.push(request);
    request.continue();
  });
  await page.goto(url, { waitUntil: 'networkidle2' });
  await browser.close();
  const data = requests.map(request => ({
    url: request.url(),
    method: request.method(),
    postData: request.postData()
  }));
  fs.writeFileSync(dbPath, JSON.stringify({ requests: data }, null, 2));

  // Create a JSON Server instance and serve the stored requests as mock API
  const server = jsonServer.create();
  const router = jsonServer.router(dbPath);
  const middlewares = jsonServer.defaults();

  server.use(middlewares);
  server.use(router);
  server.listen(port, () => {
    console.log(`Mock server is running at http://localhost:${port}`);
    const routes = Object.keys(router.db.getState());
    const endpoints = {};
    routes.forEach(route => {
      const method = 'GET'; // default to GET method
      if (route.indexOf(' ') > 0) {
        const parts = route.split(' ');
        method = parts[0];
        route = parts[1];
      }
      endpoints[route] = method;
    });
    fs.writeFileSync(endpointsPath, JSON.stringify(endpoints, null, 2));
    console.log(`Endpoints are saved to ${endpointsPath}`);
  });
})();
