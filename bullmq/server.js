const http = require('http')

const { addJob } = require('./job/queue')

const httpServer = http.createServer()

httpServer.on('request', async function (req, res) {
  switch (req.url) {
    case '/': {
      res.statusCode = 200
      return res.end('<title>Home</title><p>Homepage.</p>')
    }
    case '/send-email': {
      await addJob()
      res.statusCode = 200
      return res.end('<title>BullMQ</title><p>Email Sent.</p>')
    }
    default: {
      res.statusCode = 404
      return res.end('<p>404: Page not found.</p>')
    }
  }
})

const PORT = 9000
httpServer.listen(PORT, function () {
  console.info(`Server running on http://localhost:${PORT}`)
})
