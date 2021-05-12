const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/User')

// @desc      Login user
// @route     POST /api/login
// @access    Public
loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) { return res.status(401).json({ error: 'invalid username or password' }) }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.SEED_SECRET_JWT, {
    expiresIn: 60 * 60 * 24 * 7
  })

  res.status(200).json({
    username: user.username,
    token
  })
})

module.exports = loginRouter
