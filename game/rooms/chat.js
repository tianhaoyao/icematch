const { Room } = require('colyseus')

class ChatRoom extends Room {
  onInit () {
    this.setState({
      matches: {}
    })
  }

  onMessage (client, data) {
    console.log(data)

    if (this.state.matches[data.matchId]) {
      this.state.matches[data.matchId].push(data)
    } else {
      this.state.matches[data.matchId] = [ data ]
    }
  }
}

module.exports = ChatRoom
