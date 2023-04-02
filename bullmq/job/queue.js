// @ts-check
const { Queue } = require('bullmq')

const redisConfig = require('../redis.config')

const queue = new Queue('WORKER_NAME', {
  connection: redisConfig,
})

function addJob() {
  return queue.add(
    (+new Date()).toString(), // queue key
    {
      from: 'codeforreal@outlook.com',
      subject: 'Test Email',
      text: 'An email sent using BullMQ',
      to: 'followers@instagram.com', // Your email
    },
    {
      removeOnComplete: true,
      removeOnFail: true,
    }
  )
}

module.exports = {
  queue,
  addJob,
}
