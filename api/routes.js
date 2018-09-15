'use strict'

const plugins = require('./plugins')
const { Router } = require('express')

const router = Router()

router.use('/upload', plugins.upload)

module.exports = router
