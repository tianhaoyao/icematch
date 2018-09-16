/* global FormData */

'use strict'

import * as axios from 'axios'
import * as Colyseus from 'colyseus.js'
import TouchController from './controller'
import virtuals from './virtuals'
import Redirect from '../force-http'

Redirect()

const $ = slt => document.querySelector(slt)
const $input = $('#upload-input')
const $btn = $('#upload-btn')
const $controller = $('#controller')
const $landing = $('#landing')

$btn.addEventListener('click', (e) => {
  e.preventDefault()

  $input.click()
})

$input.addEventListener('change', () => {
  const data = new FormData()

  data.append('picture', $input.files[0])

  axios.post('/api/upload', data)
    .then((res) => {
      console.log(res.data)

      $landing.style.display = 'none'
      $controller.style.display = 'initial'
    })
    .then(() => {
      const client = new Colyseus.Client(`ws://${window.location.host}`)
      const room = client.join('icematch', { player: true })

      const controller = new TouchController(room, virtuals)
      const touchMap = {
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right'
      }

      controller.register(touchMap)
    })
})
