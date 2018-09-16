const { LOBBY_TIME } = require('../config.js')

class GameManager {
  constructor (gameState) {
    this.gameState = gameState
    this.running = false
  }

  runGame (rounds) {
    let time = LOBBY_TIME

    this.running = true

    rounds.forEach((round) => {
      setTimeout(() => this.runRound(round), time * 1000)
      time += round.time
    })

    setTimeout(() => {
      this.gameState.end = true
    }, time)
    // TODO: send matching payload
  }

  runRound (round) {
    this.gameState.question = round.question
    this.gameState.answer1 = round.answer1
    this.gameState.answer2 = round.answer2
    this.gameState.time = round.time
  }
}

module.exports = GameManager
