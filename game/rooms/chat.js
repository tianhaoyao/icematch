const { Room } = require('colyseus')

class ChatRoom extends Room {
  onInit () {
    this.matches = {}
  }

  onMessage (client, data) {
    this.matches[data.matchId] = data.message
  }
}
