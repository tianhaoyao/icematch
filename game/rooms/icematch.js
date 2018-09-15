const { Room } = require('colyseus')
const GameState = require('../state/icematch')
const { SCREEN_WIDTH, SCREEN_HEIGHT } = require('../../client/config.js')

class IceRoom extends Room {
  onInit () {
    this.setState(new GameState())
    this.playerDirections = {}
  }

  onJoin (client) {
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
      const player = this.state.players[sessionId]

      if (moveSet.up && player.y > 0) {
        this.state.moveDirection(sessionId, 'y', -1)
      }
      if (moveSet.down && player.y < SCREEN_HEIGHT) {
        this.state.moveDirection(sessionId, 'y', 1)
      }
      if (moveSet.left && player.x > 0) {
        this.state.moveDirection(sessionId, 'x', -1)
      }
      if (moveSet.right && player.x < SCREEN_WIDTH) {
        this.state.moveDirection(sessionId, 'x', 1)
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
