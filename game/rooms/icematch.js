const { Room } = require('colyseus')
const GameState = require('../state/icematch')
const { SCREEN_WIDTH, SCREEN_HEIGHT } = require('../../config.js')

class IceRoom extends Room {
  onInit () {
    this.setState(new GameState())
    this.playerDirections = {}
  }

  onJoin (client, options) {
    if (options.player) {
      this.state.addPlayer(client)
      this.playerDirections[client.sessionId] = {
        up: false,
        down: false,
        left: false,
        right: false
      }
      console.log(`Player ${client.sessionId} joined!`)
  }

  onMessage (client, data) {
    const direction = Object.keys(data)[0]
    this.updatePlayerDirection(client, direction, data[direction])

    console.log(`Message from ${client.sessionId}:`)
    console.log(data)
  }

  update () {
    for (const sessionId in this.playerDirections) {
      const moveSet = this.playerDirections[sessionId]
      const player = this.state.getPlayer(sessionId)

      if (moveSet.up && player.y > 0) {
        this.state.moveUp(sessionId)
      }
      if (moveSet.down && player.y < SCREEN_HEIGHT) {
        this.state.moveDown(sessionId)
      }
      if (moveSet.left && player.x > 0) {
        this.state.moveLeft(sessionId)
      }
      if (moveSet.right && player.x < SCREEN_WIDTH) {
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
