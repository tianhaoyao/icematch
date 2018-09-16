import * as PIXI from 'pixi.js'
import {centerX} from 'pixi-center'
import * as Resources from '../resources'
import Player from '../../game/state/player'
import { cosineInterp } from './interp'
import ZONES from '../../game/state/icematch'
import { SCREEN_WIDTH, SCREEN_HEIGHT, SPAWN_ZONE_LEFT_BOUND } from '../../config.js'

class View {
  constructor () {
    this.app = new PIXI.Application({ backgroundColor: 0x99e6ff, width: SCREEN_WIDTH, height: SCREEN_HEIGHT })

    const graphics = new PIXI.Graphics()

    graphics.beginFill(0xffa17a)
    graphics.moveTo(SCREEN_WIDTH / 2, 0)
    graphics.lineTo(SCREEN_WIDTH, 0)
    graphics.lineTo(SCREEN_WIDTH, SCREEN_HEIGHT)
    graphics.lineTo(SCREEN_WIDTH / 2, SCREEN_HEIGHT)
    graphics.endFill()

    this.app.stage.addChild(graphics)

    this.players = {}
    this.sprites = {}

    this.question;
    this.answer1;
    this.answer2;

    document.getElementById('view').appendChild(this.app.view)
    this.renderLoop()
  }

  renderLoop () {
    this.app.ticker.add((delta) => {
      for (const id in this.players) {
        const lerpRate = 5

        const sprite = this.sprites[id]
        const player = this.players[id]

        sprite.x = cosineInterp(sprite.x, player.x, delta / lerpRate)
        sprite.y = cosineInterp(sprite.y, player.y, delta / lerpRate)
      }
    })
  }

  createPlayer (id, x, y, url) {
    const sprite = new PIXI.Container()
    const head = PIXI.Texture.from(url)
    const body = PIXI.Texture.fromImage(Resources.playerSprite)
    const headSprite = new PIXI.Sprite(head)
    const bodySprite = new PIXI.Sprite(body)

    headSprite.x = 0
    headSprite.y = 0
    sprite.addChild(headSprite)

    bodySprite.x = 0
    bodySprite.y = 32
    sprite.addChild(bodySprite)

    sprite.x = x
    sprite.y = y

    this.players[id] = new Player(x, y, '')
    this.sprites[id] = sprite

    this.app.stage.addChild(sprite)
  }

  removePlayer (id) {
    this.sprites[id].destroy()
    delete this.sprites[id]
    delete this.players[id]
  }

  updatePosition (id, dimension, value) {
    this.players[id][dimension] = value
  }

  setQuestion (question) {

    this.app.stage.removeChild(this.question)

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fill: 'black'
    })

    this.question = new PIXI.Text(question, style)
    this.question = SCREEN_WIDTH / 2
    this.question.y = 0

    this.app.stage.addChild(this.question)
  }

  setAnswer1 (answer) {
    this.app.stage.removeChild(this.answer1)

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fill: 'black'
    })

    this.answer1 = new PIXI.Text(answer, style)
    this.answer1 = SCREEN_WIDTH / 2
    this.answer1.y = 0

    this.app.stage.addChild(this.answer1)
  }

  setAnswer2 (answer) {
    this.app.stage.removeChild(this.answer2)

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fill: 'black'
    })

    this.answer2 = new PIXI.Text(answer, style)
    this.answer2 = SCREEN_WIDTH / 2
    this.answer2.y = 0

    this.app.stage.addChild(this.answer2)
  }

  setTime (time) {
    console.log(time)
  }
}

module.exports = View
