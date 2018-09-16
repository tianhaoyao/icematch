const { Room } = require('colyseus')
const GameState = require('../state/icematch')
const { SCREEN_WIDTH, SCREEN_HEIGHT, SPRITE_HEIGHT, SPRITE_WIDTH } = require('../../config.js')

class IceRoom extends Room {
  onInit () {
    this.setState(new GameState())
    this.playerDirections = {}
    this.setSimulationInterval(() => this.update())
    this.lobbyTimerStarted = false
  }

  onJoin (client, options) {
    if (options.player) {
      if (this.state.mode.getMode() === 'lobby') {
        this.startLobby()
        this.state.addPlayer(client)
        this.playerDirections[client.sessionId] = {
          up: false,
          down: false,
          left: false,
          right: false
        }
        console.log(`Player ${client.sessionId} joined!`)
      } else {
        console.log(`Player ${client.sessionId} cannot join! Game in progress.`)
      }
    }
  }

  onMessage (client, data) {
    const direction = Object.keys(data)[0]
    this.updatePlayerDirection(client, direction, data[direction])
  }

  update () {
    for (const sessionId in this.playerDirections) {
      const moveSet = this.playerDirections[sessionId]
      const player = this.state.getPlayer(sessionId)
      if (moveSet.up && player.y > 0) {
        this.state.moveUp(sessionId)
      }
      if (moveSet.down && player.y + SPRITE_HEIGHT < SCREEN_HEIGHT) {
        this.state.moveDown(sessionId)
      }
      if (moveSet.left && player.x > 0) {
        this.state.moveLeft(sessionId)
      }
      if (moveSet.right && player.x + SPRITE_WIDTH < SCREEN_WIDTH) {
        this.state.moveRight(sessionId)
      }
    }
  }

  onLeave (client) {
    this.state.removePlayer(client)

    delete this.playerDirections[client.sessionId]

    console.log(`Player ${client.sessionId} left!`)
  }

  updatePlayerDirection (client, direction, bool) {
    this.playerDirections[client.sessionId][direction] = bool
  }

  startLobby () {
    if (!this.lobbyTimerStarted) {
      this.state.mode.startLobbyTimer()
      this.lobbyTimerStarted = true
    }
  }
}

module.exports = IceRoom
