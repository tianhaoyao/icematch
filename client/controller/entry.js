/* global FormData */

'use strict'

import * as axios from 'axios'
import * as Colyseus from 'colyseus.js'
import TouchController from './controller'
import virtuals from './virtuals'

const client = new Colyseus.Client(`ws://${window.location.host}`)
const room = client.join('icematch')
const $ = slt => document.querySelector(slt)

const controller = new TouchController(room, virtuals)
const touchMap = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right'
}

controller.register(touchMap)

$('#upload-btn').addEventListener('click', (e) => {
  e.preventDefault()

  const $input = $('#upload-input')
  const data = new FormData()

  data.append('picture', $input.files[0])

  axios.post('/api/upload', data)
    .then(res => console.log(res.data))
})
