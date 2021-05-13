const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')
const tokenExtractor = require('../middlewares/TokenExtractor')

// @desc      Get all users
// @route     GET /api/users
// @access    Public
usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// @desc      Get single user
// @route     GET /api/users/:id
// @access    Public
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

// @desc      Register user
// @route     POST /api/users
// @access    Public
usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name: name || '',
    passwordHash
  })

  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

// @desc      Upadate name user
// @route     PUT /api/users/:id
// @access    Private
usersRouter.put('/:id', [tokenExtractor], async (req, res, next) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const user = await User.findByIdAndUpdate(id, { name }, {
      new: true
    })
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

// @desc      Delete user
// @route     DELETE /api/users/:id
// @access    Private
usersRouter.delete('/:id', [tokenExtractor], async (req, res, next) => {
  const { id } = req.params
  try {
    await User.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
