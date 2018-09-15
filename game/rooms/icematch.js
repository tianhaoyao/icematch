const { Room } = require('colyseus')
const GameState = require('../state/icematch')

class IceRoom extends Room {
  onInit () {
    this.setState(new GameState())
    this.playerDirections = {}
  }

  onJoin (client) {
    this.state.onJoin(client)

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
    this.state.updatePlayerDirection(client, direction, data[direction])

    console.log(`Message from ${client.sessionId}:`)
    console.log(data)
  }

  update () {
    for (const sessionId in this.playerDirections) {
      const moveSet = this.playerDirections[sessionId]
      if (moveSet.up) {
        this.state.moveDirection(sessionId, 'y', 1)
      }
      if (moveSet.down) {
        this.state.moveDirection(sessionId, 'y', -1)
      }
      if (moveSet.left) {
        this.state.moveDirection(sessionId, 'x', -1)
      }
      if (moveSet.right) {
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
