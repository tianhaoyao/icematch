const ZONES = {
  YES: 0,
  NO: 1
}

class Player {
  constructor (x, y, image, zone) {
    this.x = x
    this.y = y
    this.image = image
    this.zone = zone
  }
}

module.exports = {
  Player,
  ZONES
}
