const { Schema, model } = require('mongoose')

//   Schema
const articleSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  imageURL: String
})

// change method toJSON
articleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Model
const Article = model('article', articleSchema)

module.exports = Article
