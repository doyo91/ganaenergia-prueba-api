const mongoose = require('mongoose')
const logger = require('../utils/logger')

// eslint-disable-next-line no-unused-vars
const { MONGO_DB_URI, NODE_ENV } = process.env

// Connection to mongodb
mongoose
  .connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

// if there is an error, close the connection
process.on('uncaughtException', (error) => {
  console.log(error)
  mongoose.disconnect()
})
