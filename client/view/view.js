import * as PIXI from 'pixi.js'
import * as Resources from '../resources'
import {Player} from '../../game/state/player'
import {cosineInterp} from './interp'
import ZONES from '../../game/state/icematch'
import {SCREEN_WIDTH, SCREEN_HEIGHT, SPAWN_ZONE_LEFT_BOUND, SPAWN_ZONE_RIGHT_BOUND} from '../../config.js'

class View {
  constructor () {
    this.app = new PIXI.Application({ backgroundColor: 0x66ff99 })

    const graphics = new PIXI.Graphics();

    graphics.beginFill(0xff5050);
    graphics.moveTo(SCREEN_WIDTH/2,0);
    graphics.lineTo(SCREEN_WIDTH, 0);
    graphics.lineTo(SCREEN_WIDTH, SCREEN_HEIGHT);
    graphics.lineTo(SCREEN_WIDTH/2, SCREEN_HEIGHT);
    graphics.endFill();

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
    const sprite = PIXI.Sprite.fromImage(Resources.playerSprite)

    sprite.x = x
    sprite.y = y

    this.players[id] = new Player(x, y, 'file.png',  () => {
      if (x < SPAWN_ZONE_LEFT_BOUND) {
        return ZONES.YES
      } else {
        return ZONES.NO
      }})

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
}

module.exports = View
