const express = require("express")
const cors = require("cors")
const app = express()

// Routers

// Middlewares

app.use(cors())
app.use(express.json())

// Routes
app.get("/", (req, res) => {
  res.send({
    name: "doyo91",
    message: "Hello world",
  })
})

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
