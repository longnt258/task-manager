const sgMail = require('@sendgrid/mail')
const FROM_EMAIL = 'longnguyendev.225@gmail.com'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  to: 'longnguyendev.225@gmail.com',
  from: 'longnguyendev.225@gmail.com',
  subject: 'Test email from Nodejs app',
  html: '<h1>Hello world!</h1>'
}

const sendEmail = async () => {
  try {
    await sgMail.send(msg)
    console.log('Email sent')
  } catch (e) {
    console.error(e.response.body)
  }
}

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email,
    from: FROM_EMAIL,
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  }

  try {
    sgMail.send(msg)
  } catch (e) {
    
  }
}

const sendCancelationEmail = (email, name) => {
  const msg = {
    to: email,
    from: FROM_EMAIL,
    subject: 'Thanks for joining in!',
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`
  }

  try {
    sgMail.send(msg)
  } catch (e) {
    
  }
}

module.exports = { sendWelcomeEmail, sendCancelationEmail }