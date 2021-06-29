const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

const getTemplateData = (templateName) => {
  switch (templateName) {

    case 'USER_SIGNUP':
      return {
        subject: 'Bienvenido a Commerce',
        template: 'user_signup.html'
      }

  }
}

const getSource = (fileName) => {
  const source = `${path.dirname(__filename)}/templates/${fileName}`
  return fs.readFileSync(source).toString() 
}

const buildTemplate = (templateName, data) => {
  const templateData = getTemplateData(templateName)
  // wrapper
  const wrapper = Handlebars.compile(
    getSource('wrapper.html')
  )

  // template source
  const body = Handlebars.compile(
    getSource(templateData.template)
  )

  return {
    subject: templateData.subject,
    html: wrapper({ body: body(data) })
  }
}

module.exports = { 
  buildTemplate
}
