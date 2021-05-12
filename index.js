require('dotenv').config()
require('./config/mongo')

const express = require('express')
const cors = require('cors')

// Utils
const logger = require('./utils/logger')

const app = express()

// Routers
const articlesRouter = require('./controllers/articles')

// Middlewares
const unknownEndpoint = require('./middlewares/unknownEndpoint')

app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send({
    name: 'doyo91',
    message: 'Hello world'
  })
})
app.use('/api/articles', articlesRouter)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

app.use(unknownEndpoint)

module.exports = { app, server }
