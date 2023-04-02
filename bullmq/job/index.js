const { worker } = require('./worker')

worker.on('ready', function () {
  console.log(`${worker.name} listening for jobs.`)
})

worker.on('completed', async function (job) {
  console.log('WORKER: Task Completed', {
    meta: {
      worker: worker.name,
      job: {
        id: job.id,
        requestData: job.data,
        responseData: job.returnvalue,
      },
    },
  })
})

worker.on('failed', async function (job, error) {
  console.error('WORKER: Task Failed', {
    meta: {
      worker: worker.name,
      job: {
        id: job.id,
        requestData: job.data,
        error,
      },
    },
  })
})
process.on('SIGINT', async () => {
  await worker.close()
  process.exit(0)
})
