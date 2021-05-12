const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

// All users
usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// User by id
usersRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    if (user) return res.status(200).json(user)

    res.status(404).end()
  } catch (error) {
    next(error)
  }
})

// Create user
usersRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    passwordHash
  })

  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

// Update article
// usersRouter.put('/:id', async (req, res, next) => {
//   const { id } = req.params
//   const { title, description, price, stock, imageURL } = req.body

//   const newArticleInfo = {
//     title,
//     description,
//     price,
//     stock,
//     imageURL
//   }

//   try {
//     const updatedArticle = await Article.findByIdAndUpdate(id, newArticleInfo, {
//       new: true
//     })
//     res.json(updatedArticle)
//   } catch (error) {
//     next(error)
//   }
// })

// Delete user
usersRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    await User.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
