const http = require('http')

const httpServer = http.createServer()

function longRunningTask() {
  let count = 0
  for (let i = 0; i <= 100_000_000_000; i++) {
    count += i
  }
}

httpServer.on('request', function (req, res) {
  switch (req.url) {
    case '/': {
      res.statusCode = 200
      return res.end('<title>Home</title><p>Homepage.</p>')
    }
    case '/long-task': {
      longRunningTask()
      res.statusCode = 200
      return res.end('<title>Long Task</title><p>Long Task Completed.</p>')
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
