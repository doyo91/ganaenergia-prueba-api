const articlesRouter = require('express').Router()
const Article = require('../models/Article')

// All articles
articlesRouter.get('/', async (req, res) => {
  const articles = await Article.find({})

  res.json(articles)
})

// Article by id
articlesRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const article = await Article.findById(id)
    if (article) return res.status(200).json(article)

    res.status(404).end()
  } catch (error) {
    console.log(error)
  }
})

// Create article
articlesRouter.post('/', async (req, res) => {
  const body = req.body
  const { title, description, price, stock, imageURL } = body
  const newArticle = new Article({
    title,
    description,
    price,
    stock,
    imageURL
  })

  try {
    const savedArticle = await newArticle.save()
    res.status(201).json(savedArticle)
  } catch (error) {
    console.log(error)
  }
})

// Update article
articlesRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, description, price, stock, imageURL } = req.body

  const newArticleInfo = {
    title,
    description,
    price,
    stock,
    imageURL
  }

  try {
    const updatedArticle = await Article.findByIdAndUpdate(id, newArticleInfo, {
      new: true
    })
    res.json(updatedArticle)
  } catch (error) {
    console.log(error)
  }
})

// Delete article
articlesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await Article.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    console.log(error)
  }
})

module.exports = articlesRouter
