'use strict'

const { Router } = require('express')
const fileUpload = require('express-fileupload')
const simpleThumbnail = require('simple-thumbnail')
const ffmpegStatic = require('ffmpeg-static')
const path = require('path')
const uuid = require('uuid/v1')
const sharp = require('sharp')
const { HEAD_HEIGHT } = require('../../config')

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
  const thumbuuid = uuid()
  const getUrl = filename => `http://${req.headers.host}/static/images/${filename}.jpg`

  if (picture.mimetype !== 'image/jpeg') {
    return res.status(400).send('Invalid file type')
  }

  try {
    const picturePath = path.join(__dirname, `../../static/images/${fileuuid}.jpg`)
    const thumbPath = path.join(__dirname, `../../static/images/${thumbuuid}.jpg`)

    await sharp(picture.data).rotate(-90).toFile(picturePath)

    await simpleThumbnail(picturePath, thumbPath, `?x${HEAD_HEIGHT}`, {
      path: ffmpegStatic.path
    })
  } catch (err) {
    console.error(err)

    return res.status(500).send(err)
  }

  res.status(200).json({
    url: getUrl(thumbuuid)
  })
}

module.exports = router
