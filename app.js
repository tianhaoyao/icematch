const express = require('express')
const path = require('path')
const api = require('./api')
const app = express()

app.use('/api', api)


app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './static/index.html'))
})

app.get('/controller', (req, res) => {
  res.sendFile(path.join(__dirname, './static/controller/index.html'))
})

app.get('/view', (req, res) => {
  res.sendFile(path.join(__dirname, './static/view/index.html'))
})

module.exports = app
