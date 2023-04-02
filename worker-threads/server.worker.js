const http = require('http')
const { Worker } = require('worker_threads')

const httpServer = http.createServer()

httpServer.on('request', function (req, res) {
  switch (req.url) {
    case '/': {
      res.statusCode = 200
      return res.end('<title>Home</title><p>Homepage.</p>')
    }
    case '/long-task': {
      const worker = new Worker('./worker.js')
      worker.on('message', function (count) {
        res.statusCode = 200
        return res.end(
          `<title>Long Task</title><p>Long Task Completed. Count=${count}</p>`
        )
      })
      worker.on('error', function () {
        res.statusCode = 500
        return res.end(`<title>Long Task</title><p>Error</p>`)
      })
      break
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
