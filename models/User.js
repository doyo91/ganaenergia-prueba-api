const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//   Schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: false,
    default: ''
  },
  passwordHash: { type: String, required: true }
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
