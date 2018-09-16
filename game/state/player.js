const { SPRITE_WIDTH, SCREEN_WIDTH } = require('../../config.js')

class Player {
  constructor (x, y, image) {
    this.x = x
    this.y = y
    this.image = image
  }

  getZone () {
    if (this.x + (SPRITE_WIDTH / 2) < SCREEN_WIDTH / 2) {
      return true
    } else {
      return false
    }
  }
}

module.exports = Player
