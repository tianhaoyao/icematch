'use strict'

const directions = ['up', 'down', 'left', 'right']
const virtuals = {}

directions.forEach((direction) => {
  virtuals[direction] = {
    touchstart (room) {
      const payload = {}

      payload[direction] = true
      room.send(payload)
    },
    touchend (room) {
      const payload = {}

      payload[direction] = false
      room.send(payload)
    }
  }
})

export default virtuals
