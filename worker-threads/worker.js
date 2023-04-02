const { parentPort, isMainThread } = require('worker_threads')

console.log('Is worker thread?', !isMainThread)

let count = 0
for (let i = 0; i <= 100_000_000_000; i++) {
  count += i
}

// Return the value back to the execution context
parentPort.postMessage(count)
