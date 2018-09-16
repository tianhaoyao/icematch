const { Room } = require('colyseus')
const { GameState } = require('../state/icematch')
const GameManager = require('../game-manager')
const { SCREEN_WIDTH, SCREEN_HEIGHT, SPRITE_HEIGHT, SPRITE_WIDTH } = require('../../config.js')
const questions = require('../question')

class IceRoom extends Room {
  onInit () {
    const state = new GameState()

    this.setState(state)
    this.gameManager = new GameManager(state)
    this.playerDirections = {}
    this.setSimulationInterval(() => this.update())
  }

  onJoin (client, options) {
    console.log(options.head)

    if (options.player) {
      if (!this.gameManager.running) {
        this.gameManager.runGame(questions)
      }

      this.state.addPlayer(client, options.head)
      this.playerDirections[client.sessionId] = {
        up: false,
        down: false,
        left: false,
        right: false
      }
      console.log(`Player ${client.sessionId} joined!`)
    }
  }

  onMessage (client, data) {
    if (this.state.getPlayer(client.sessionId)) {
      const direction = Object.keys(data)[0]
      this.updatePlayerDirection(client, direction, data[direction])

      console.log(`Message from ${client.sessionId}:`)
      console.log(data)
    }
  }

  update () {
    for (const sessionId in this.playerDirections) {
      const moveSet = this.playerDirections[sessionId]
      const player = this.state.getPlayer(sessionId)
      if (moveSet.up && player.y > 0) {
        this.state.moveUp(sessionId)
      }
      if (moveSet.down && player.y + 32 + (SPRITE_HEIGHT * 2) < SCREEN_HEIGHT) {
        this.state.moveDown(sessionId)
      }
      if (moveSet.left && player.x > 0) {
        this.state.moveLeft(sessionId)
      }
      if (moveSet.right && player.x + (SPRITE_WIDTH) < SCREEN_WIDTH) {
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
}

module.exports = IceRoom
