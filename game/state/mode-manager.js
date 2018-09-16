const { LOBBY_TIME } = require('../../config.js')

class GameModeManager {
  constructor () {
    this.setLobby()
  }

  startLobbyTimer () {
    setTimeout(() => { this.setGame() }, LOBBY_TIME)
  }

  setLobby () {
    this.mode = 'lobby'
    console.log(`Game is in ${this.getMode()} mode.`)
  }

  setGame () {
    this.mode = 'game'
    console.log(`Game is in ${this.getMode()} mode.`)
  }

  setMatch () {
    this.mode = 'match'
  }

  getMode () {
    return this.mode
  }
}

module.exports = GameModeManager
