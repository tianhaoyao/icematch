const { LOBBY_TIME } = require('../config.js')
const uuidv4 = require('uuid/v4')

class GameManager {
  constructor (gameState) {
    this.gameState = gameState
    this.running = false
  }

  runGame (rounds) {
    let time = LOBBY_TIME
    console.log(rounds)

    this.running = true

    rounds.forEach((round) => {
      setTimeout(() => this.runRound(round), time * 1000)
      time += round.time
    })

    setTimeout(() => {
      this.gameState.end = true
      this.matchPlayers()
    }, time * 1000)
    // TODO: send matching payload
  }

  runRound (round) {
    this.gameState.question = round.question
    this.gameState.answer1 = round.answer1
    this.gameState.answer2 = round.answer2
    this.gameState.time = round.time
  }

  matchPlayers () {
    const players = this.gameState.players
    const keys = Object.keys(players)
    console.log(keys)
    for (let i = 0; i < keys.length; i += 2) {
      const uuid = uuidv4()
      if (players[keys[i]] && players[keys[i + 1]]) {
        players[keys[i]].match = { 'id': uuid, image: this.gameState.players[keys[i + 1]].image }
        players[keys[i + 1]].match = { 'id': uuid, image: this.gameState.players[keys[i]].image }
      }
    }
  }
}

module.exports = GameManager
