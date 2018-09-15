'use strict'

import * as Colyseus from 'colyseus.js'
import TouchController from './controller'
import virtuals from './virtuals'

const client = new Colyseus.Client(`ws://${window.location.host}`)
<<<<<<< HEAD
const room = client.join('icematch', {player: true})
=======
const room = client.join('icematch')
>>>>>>> ff590d6931b32ec100cdcf510725e14ced2213ab

const controller = new TouchController(room, virtuals)
const touchMap = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right'
}

controller.register(touchMap)
