const Player = require('./player')
const { VELOCITY, YES_BOUND, NO_BOUND } = require('../../config.js')

class GameState {
  constructor () {
    this.players = {}
  }

  addPlayer (client) {
    const x = Math.floor(Math.random() * (NO_BOUND - YES_BOUND) + YES_BOUND)
    const y = Math.floor(Math.random() * 600)
    this.players[client.sessionId] = new Player(x, y, 'file.png')
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
}

module.exports = GameState
