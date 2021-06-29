const { authMiddleware } = require('./middlewares')
const { port, sendgrid } = require('./config/index')
const express = require('express')
const bodyParser = require('body-parser')
const response = require('./utils/responses')
const SendgridMail = require('@sendgrid/mail')
const { buildTemplate } = require('./utils/template')

const app = express()
app.use(bodyParser.json())

const sendEmail = async (req, res) => {
  try {
    //
    SendgridMail.setApiKey(sendgrid.api_key)

    const { to, template, body } = req.body
    const templateBuiled = buildTemplate(template, body)
    const msg = { to, from: sendgrid.from , ...templateBuiled}
    
    const result = await SendgridMail.send(msg)
    return response.success(res, result)
  
  } catch (err) {
    console.error(err)
    return response.error(res, err)
  }
}

app.post('/api/emails/send', authMiddleware, sendEmail)
app.listen(port)
