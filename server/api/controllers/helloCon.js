const model = require('../models/helloMod')
const controller = {}

controller.checkIP = (request, response, next) => {
  console.log(`${(new Date()).toLocaleTimeString()}: request from ${request.ip}`)
  next()
}

controller.sendDefault = (request, response) => {
  model.updateMessage('Hello World!')
  response.json(model)
}

controller.sendEcho = (request, response) => {
  model.updateMessage(request.params.msg)
  response.json(model)
}

module.exports = controller
