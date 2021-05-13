const mongoose = require('mongoose')
const logger = require('../utils/logger')

// eslint-disable-next-line no-unused-vars
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

// Connection to mongodb
mongoose
  .connect(connectionString, {
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
