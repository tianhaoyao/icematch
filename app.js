const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path')
const app = express();


app.use('/api', myApiRouter)

app.use('/static', express.static(path.join(__dirname, 'static'))) 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './static/index.html'))
})

module.exports = app