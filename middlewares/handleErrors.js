const logger = require('../utils/logger')

const errorHandler = (error, req, res, next) => {
  logger.info(error)

  if (error.name === 'CastError') {
    return res.status(400).send({
      error: 'malformatted id'
    })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    })
  }

  next(error)
}

module.exports = errorHandler
