const { LOBBY_TIME } = require('../config.js')

class GameManager {
  constructor (gameState, questions) {
    this.gameState = gameState

    setTimeout(() => this.runGame(questions), LOBBY_TIME)
  }

  runGame (rounds) {
    let time = 0

    rounds.forEach((round) => {
      setTimeout(() => this.runRound(round), time * 1000)
      time += round.time
    })

    this.gameState.end = true
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
