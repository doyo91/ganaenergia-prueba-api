const articlesRouter = require('express').Router()
const Article = require('../models/Article')
const tokenExtractor = require('../middlewares/TokenExtractor')

// @desc      Get all articles
// @route     GET /api/articles
// @access    Public
articlesRouter.get('/', async (req, res, next) => {
  try {
    const articles = await Article.find({})
    res.json(articles)
  } catch (error) {
    next(error)
  }
})

// @desc      Get article by id
// @route     GET /api/articles/:id
// @access    Public
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

// @desc      Create article
// @route     POST /api/articles
// @access    Private
articlesRouter.post('/', [tokenExtractor], async (req, res, next) => {
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

// @desc      Update article
// @route     PUT /api/articles/:id
// @access    Private
articlesRouter.put('/:id', [tokenExtractor], async (req, res, next) => {
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

// @desc      Delete article
// @route     DELETE /api/articles
// @access    Private
articlesRouter.delete('/:id', [tokenExtractor], async (req, res, next) => {
  const { id } = req.params
  try {
    await Article.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = articlesRouter
