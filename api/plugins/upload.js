'use strict'

const { Router } = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const uuid = require('uuid/v1')

const router = Router()
const fileSize = 10 * 1024 * 1024

router.use(fileUpload({ limits: { fileSize } }))
router.post('/', upload)

async function upload (req, res) {
  if (!req.files) {
    return res.status(400).send('No files were uploaded')
  }

  const { picture } = req.files
  const fileuuid = uuid()
  const getUrl = filename => `http://${req.headers.host}/api/data/${filename}.jpg`

  if (picture.mimetype !== 'image/jpeg') {
    return res.status(400).send('Invalid file type')
  }

  try {
    const picturePath = path.join(__dirname, `../../data/${fileuuid}.jpg`)

    await picture.mv(picturePath)
  } catch (err) {
    console.error(err)

    return res.status(500).send(err)
  }

  res.status(200).json({
    url: getUrl(fileuuid)
  })
}

module.exports = router
