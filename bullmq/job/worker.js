const path = require('path')
const { Worker } = require('bullmq')

const redisConfig = require('../redis.config')

const workerName = 'WORKER_NAME' // This name needs to be used while creating a new queue

const worker = new Worker(workerName, path.join(__dirname, 'processor.js'), {
  connection: redisConfig,
})

module.exports = {
  worker,
  connection: redisConfig,
}
