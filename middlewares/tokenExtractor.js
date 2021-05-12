const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  console.log('auth -->', authorization)
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, process.env.SEED_SECRET_JWT)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    next()
  } catch (error) {
    res.status(401).json({ error: 'token missing or invalid' })
    next(error)
  }
}

module.exports = tokenExtractor
