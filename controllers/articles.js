const articlesRouter = require('express').Router()
const Article = require('../models/Article')

// All articles
articlesRouter.get('/', async (req, res, next) => {
  try {
    const articles = await Article.find({})
    res.json(articles)
  } catch (error) {
    next(error)
  }
})

// Article by id
articlesRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const article = await Article.findById(id)
    if (article) return res.status(200).json(article)

    res.status(404).end()
  } catch (error) {
    next(error)
  }
})

// Create article
articlesRouter.post('/', async (req, res, next) => {
  const body = req.body
  if (!body) return res.status(400).json({ error: 'required data' })
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
    next(error)
  }
})

// Update article
articlesRouter.put('/:id', async (req, res, next) => {
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
    next(error)
  }
})

// Delete article
articlesRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    await Article.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = articlesRouter
