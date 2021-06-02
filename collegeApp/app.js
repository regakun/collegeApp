require('dotenv').config()

const cors = require("cors")
const express = require('express')
const router = require('./routes/index')
const errHandler = require('./helpers/errHandler.js')
const { verifyToken } = require('./helpers/jwtHelper')
const port = process.env.PORT || 3000
const app = express()
const http = require('http').createServer(app)

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/', router)

// listening

app.use(errHandler)

http.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})