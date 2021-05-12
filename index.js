require('dotenv').config()
require('./config/mongo')

const express = require('express')
const cors = require('cors')

// Utils
const logger = require('./utils/logger')

const app = express()

// Routers
const articlesRouter = require('./controllers/articles')
const usersRouter = require('./controllers/users')

// Middlewares
const unknownEndpoint = require('./middlewares/unknownEndpoint')
const handleErrors = require('./middlewares/handleErrors')

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/articles', articlesRouter)
app.use('/api/users', usersRouter)

app.use(unknownEndpoint)
app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

module.exports = { app, server }
