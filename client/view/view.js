import * as PIXI from 'pixi.js'
import {centerX} from 'pixi-center'
import * as Resources from '../resources'
import Player from '../../game/state/player'
import { cosineInterp } from './interp'
import { SCREEN_WIDTH, SCREEN_HEIGHT, HEAD_HEIGHT } from '../../config.js'

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
    this.time;

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
    bodySprite.y = HEAD_HEIGHT
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
      align: 'center',
      fill: 'black',
      wordWrap: true,
      wordWrapWidth: 500
    })

    this.question = new PIXI.Text(question, style)
    if (question.length < 32) {
      this.question.x = (SCREEN_WIDTH / 2) - (250 - (question.length/2)*16)
    } else {
      this.question.x = (SCREEN_WIDTH / 2) - 250
    }
    this.question.y = 0

    this.app.stage.addChild(this.question)
  }

  setAnswer1 (answer) {
    this.app.stage.removeChild(this.answer1)

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      align: 'center',
      fill: 'black',
      wordWrap: true,
      wordWrapWidth: 200
    })

    this.answer1 = new PIXI.Text(answer, style)
    this.answer1.x = SCREEN_WIDTH / 4 - 100
    this.answer1.y = SCREEN_HEIGHT / 8

    this.app.stage.addChild(this.answer1)
  }

  setAnswer2 (answer) {

    this.app.stage.removeChild(this.answer2)

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      align: 'center',
      fill: 'black',
      wordWrap: true,
      wordWrapWidth: 200
    })

    this.answer2 = new PIXI.Text(answer, style)
    this.answer2.x = (SCREEN_WIDTH / 4) * 3 - 100
    this.answer2.y = SCREEN_HEIGHT / 8

    this.app.stage.addChild(this.answer2)
  }

  setTime (time) {
     this.app.stage.removeChild(this.time)

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      align: 'center',
      fill: 'black',
    })

    this.time = new PIXI.Text(time, style)
    this.time.x = SCREEN_WIDTH / 2 - 20
    this.time.y = SCREEN_HEIGHT / 6

    this.app.stage.addChild(this.time)

    console.log(time)
  }
}

module.exports = View
