require('dotenv').config()
require('./config/mongo')

const express = require('express')
const cors = require('cors')

// Utils
const logger = require('./utils/logger')

const app = express()

// Routers
const loginRouter = require('./controllers/login')
const articlesRouter = require('./controllers/articles')
const usersRouter = require('./controllers/users')

// Middlewares
const unknownEndpoint = require('./middlewares/unknownEndpoint')
const handleErrors = require('./middlewares/handleErrors')

// Enable CORS
app.use(cors())
// Body parser
app.use(express.json())

// Routes
app.use('/api/login', loginRouter)
app.use('/api/articles', articlesRouter)
app.use('/api/users', usersRouter)

app.use(unknownEndpoint)
app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

module.exports = { app, server }
