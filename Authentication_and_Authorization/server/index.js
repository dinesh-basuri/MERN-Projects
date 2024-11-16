require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')

app.use(cors())
app.use(express.json())
app.use('/api/v1/users',userRoutes)

module.exports = app