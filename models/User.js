const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//   Schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  passwordHash: String
})

userSchema.plugin(uniqueValidator)

// change method toJSON
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

// Model
const User = model('user', userSchema)

module.exports = User
