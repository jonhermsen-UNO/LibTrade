const model = {}

model.id = ''
model.name = ''
model.state = ''

model.updateID = (id) => {
  model.id = id
}

model.updateName = (name) => {
  model.name = name
}

model.updateState = (state) => {
  model.state = state
}

module.exports = model