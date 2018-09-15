'use strict'

import * as Colyseus from 'colyseus.js'
import TouchController from './controller'
import virtuals from './virtuals'

const client = new Colyseus.Client(`ws://${window.location.host}`)
const room = client.join('icematch')

const controller = new TouchController(room, virtuals)
const touchMap = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right'
}

controller.register(touchMap)
