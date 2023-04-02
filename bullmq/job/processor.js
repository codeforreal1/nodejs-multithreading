const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  pool: true,
  host: '0.0.0.0',
  port: 1025,
  secure: false,
  auth: {
    user: 'admin',
    pass: 'a123456',
  },
})

module.exports = async function (job) {
  console.log('🚀 Sending Email', job)
  // Send mail
  const info = await transporter.sendMail(job.data)
  const previewURL = nodemailer.getTestMessageUrl(info)
  return { success: true, meta: { previewURL } }
}
