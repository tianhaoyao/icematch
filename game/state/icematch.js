const Player = require('./player')

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

  movePlayer (sessionId, dimension, change) {
    this.players[sessionId][dimension] += change
  }
}

module.exports = GameState
