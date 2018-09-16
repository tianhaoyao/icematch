const Player = require('./player')
const { VELOCITY, SPAWN_ZONE_LEFT_BOUND, SPAWN_ZONE_RIGHT_BOUND, SCREEN_HEIGHT, SCREEN_WIDTH, SPRITE_WIDTH } = require('../../config.js')

const ZONES = {
  YES: 0,
  NO: 1
}

class GameState {
  constructor () {
    this.players = {}
    this.scores = {}
  }

  addPlayer (client) {
    const x = Math.floor(Math.random() * (SPAWN_ZONE_RIGHT_BOUND - SPAWN_ZONE_LEFT_BOUND) + SPAWN_ZONE_LEFT_BOUND)
    const y = Math.floor(Math.random() * SCREEN_HEIGHT)
    this.players[client.sessionId] = new Player(x, y, 'file.png', () => {
      if (x < SPAWN_ZONE_LEFT_BOUND) {
        return ZONES.YES
      } else {
        return ZONES.NO
      }
    })
  }

  removePlayer (client) {
    delete this.players[client.sessionId]
  }

  moveUp (sessionId) {
    this.players[sessionId].y -= VELOCITY
  }

  moveDown (sessionId) {
    this.players[sessionId].y += VELOCITY
  }

  moveLeft (sessionId) {
    this.players[sessionId].x -= VELOCITY
  }

  moveRight (sessionId) {
    this.players[sessionId].x += VELOCITY
  }

  getPlayer (sessionId) {
    return this.players[sessionId]
  }

  updateZone (sessionId) {
    if (this.players[sessionId].x + (SPRITE_WIDTH/2) < SCREEN_WIDTH/2){
      this.scores[sessionId].add(true)
    } else {
     this.scores[sessionId].add(false)
    }

    console.log(this.players[sessionId].zone)
  }

  getScore (sessionId) {
    return this.scores[sessionId]
  }

  getScores () {
    return this.scores
  }

  resetScores (sessionId) {
    this.scores = {}
  }
}

module.exports = {
  GameState,
  ZONES
}
