const { Room } = require('colyseus')
const GameState = require('../state/icematch')

class IceRoom extends Room {
  onInit () {
    this.setState(
      new GameState()
    )
    this.playerMoveSet = {}
  }

  onJoin (client) {
    this.state.onJoin(client)

    this.playerMoveSet[client.sessionId] = {
      up: false,
      down: false,
      left: false,
      right: false
    }

    console.log(`Player ${client.sessionId} joined!`)
  }

  onMessage (client, data) {
    const direction = Object.keys(data)[0]
    this.state.updatePlayerMoveSet(client, direction, data[direction])

    console.log(`Message from ${client.sessionId}:`)
    console.log(data)
  }

  update () {
    for (const sessionId in this.playerMoveSet) {
      const moveSet = this.playerMoveSet[sessionId]
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

    delete this.playerMoveSet[client.sessionId]

    console.log(`Player ${client.sessionId} left!`)
  }

  updatePlayerMoveSet (client, move, bool) {
    this.playerMoveSet[client.sessionId][move] = bool
  }
}

module.exports = IceRoom
