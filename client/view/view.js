import * as PIXI from 'pixi.js'
import * as Resources from '../resources'
import Player from '../../game/state/player'
import {cosineInterp} from './interp'

class View {
  constructor () {
    this.app = new PIXI.Application({ backgroundColor: 0xfff8d1 })
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

        sprite.x = player.x
        sprite.y = player.y

        sprite.x = cosineInterp(sprite.x, player.x, delta / lerpRate)
        sprite.y = cosineInterp(sprite.y, player.y, delta / lerpRate)
      }
    })
  }

  createPlayer (id, x, y) {
    const sprite = PIXI.Sprite.fromImage(Resources.playerSprite)

    sprite.x = x
    sprite.y = y

    this.players[id] = new Player(x, y, 'file.png')
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
