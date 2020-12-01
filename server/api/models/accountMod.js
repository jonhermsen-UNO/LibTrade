const model = {}

model.id = ''
model.username = ''
model.email = ''
model.collegeID = ''

model.updateid = (id) => {
  model.id = id
}

model.updateUsername = (username) => {
  model.username = username
}

model.updateEmail = (email) => {
  model.email = email
}

model.updateCollege = (college) => {
  model.collegeID = college
}

module.exports = model