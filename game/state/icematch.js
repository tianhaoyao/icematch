const Player = require('./player')
const { VELOCITY } = require('../../config.js')

class GameState {
  constructor () {
    this.players = {}
  }

  addPlayer (client) {
    this.players[client.sessionId] = new Player(0, 0, 'file.png')
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
