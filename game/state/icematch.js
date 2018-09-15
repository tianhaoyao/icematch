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

  moveDirection (sessionId, plane, change) {
    this.players[sessionId][plane] += change
  }
}

module.exports = GameState
