const { Schema, model } = require('mongoose')

//   Schema
const articleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }

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
