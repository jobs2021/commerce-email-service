require('dotenv/config')

const config = {
  port: process.env.PORT || 3001,
  env: process.env.NODE_ENV || 'development',
  
  x_access_token: process.env.APP_X_ACCESS_TOKEN,

  sendgrid: {
    api_key: process.env.APP_SENDGRID_API_KEY,
    from: process.env.APP_SENDGRID_FROM_EMAIL
  }

}

module.exports = config