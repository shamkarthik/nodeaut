const puppeteer = require('puppeteer')
const jsonServer = require('json-server')
const fs = require('fs')

// Define the path to the db.json file
const DB_PATH = './db.json'

// Check if the db.json file exists, and create it if it doesn't
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, '{}')
}

// Load the data from the db.json file
const data = JSON.parse(fs.readFileSync(DB_PATH))

// Create a new JSON Server instance and configure it
const server = jsonServer.create()
const router = jsonServer.router(data)
const middlewares = jsonServer.defaults()

// Use the middlewares and router with the server
server.use(middlewares)
server.use(router)

// Start the server on port 3000
server.listen(3000, () => {
  console.log('JSON Server is running')
})

// Intercept the network requests
async function interceptRequests() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setRequestInterception(true)

  page.on('request', (request) => {
    console.log(request.method() + ' ' + request.url())

    // Automatically create a new endpoint for this request
    const path = request.url().replace(/^https?:\/\/[^\/]+/, '').replace(/\?.*$/, '')

    router.get(path, (req, res) => {
      const data = { message: 'This is a mock response for ' + request.url() }

      res.json(data)
    })

    request.continue()
  })

  await page.goto('http://localhost:3000')

  await browser.close()
}

interceptRequests()
