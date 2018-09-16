import * as PIXI from 'pixi.js'
import * as Resources from '../resources'
import Player from '../../game/state/player'
import { cosineInterp } from './interp'
import ZONES from '../../game/state/icematch'
import { SCREEN_WIDTH, SCREEN_HEIGHT, SPAWN_ZONE_LEFT_BOUND } from '../../config.js'

class View {
  constructor () {
    this.app = new PIXI.Application({ backgroundColor: 0x66ff99 })

    const graphics = new PIXI.Graphics()

    graphics.beginFill(0xff5050)
    graphics.moveTo(SCREEN_WIDTH / 2, 0)
    graphics.lineTo(SCREEN_WIDTH, 0)
    graphics.lineTo(SCREEN_WIDTH, SCREEN_HEIGHT)
    graphics.lineTo(SCREEN_WIDTH / 2, SCREEN_HEIGHT)
    graphics.endFill()

    this.app.stage.addChild(graphics)

    this.players = {}
    this.sprites = {}

    document.body.appendChild(this.app.view)
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

  createPlayer (id, x, y) {
    const sprite = new PIXI.Container()
    const head = PIXI.Texture.fromImage('photo.png')
    const body = PIXI.Texture.fromImage(Resources.playerSprite)

    head.anchor.set(0.5)
    head.x = 0
    head.y = 0
    sprite.add(head)

    body.anchor.set(0.5)
    body.x = 0
    body.y = 32
    sprite.add(body)

    sprite.x = x
    sprite.y = y

    console.log('create sprite')
    s 
    this.players[id] = new Player(x, y, 'photo.png',  () => {
      if (x < SPAWN_ZONE_LEFT_BOUND) {
        return ZONES.YES
      } else {
        return ZONES.NO
      }
    })

    this.players[id] = new Player(x, y, 'photo.png')
    this.sprites[id] = sprite

    this.app.stage.addChild(sprite)
  }

  removePlayer (id) {
    this.sprites[id].destroy()
    delete this.sprites[id]
    delete this.players[id]
  }

  updatePosition (id, dimension, value) {
    console.log(id, dimension, value)
    this.players[id][dimension] = value
  }
}

module.exports = View
