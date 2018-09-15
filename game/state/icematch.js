const Player = require('./player')
const { VELOCITY, YES_BOUND, NO_BOUND } = require('../../config.js')

class GameState {
  constructor () {
    this.players = {}
  }

  addPlayer (client) {
    const x = Math.random() * (NO_BOUND - YES_BOUND) + YES_BOUND
    this.players[client.sessionId] = new Player(x, 0, 'file.png')
    console.log(x)
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

  getPlayer (id) {
    return this.players[sessionId]
  }
}

module.exports = GameState
