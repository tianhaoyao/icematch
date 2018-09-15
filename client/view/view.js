import * as PIXI from 'pixi.js'
import * as Resources from '../resources'
import Player from '../../game/state/player'

class View {
  constructor () {
    this.app = new PIXI.Application({ backgroundColor: 0xfff8d1 })
    this.players = {}
    this.sprites = {}

    document.body.appendChild(this.app.view)
    this.renderLoop()
  }

  renderLoop () {
    this.app.ticker.add(() => {
      for (const id in this.players) {
        const sprite = this.sprites[id]
        const player = this.players[id]

        sprite.x = player.x
        sprite.y = player.y
      }
    })
  }

  createPlayer (id, x, y) {
    const sprite = PIXI.Sprite.fromImage(Resources.playerSprite)

    sprite.x = x
    sprite.y = y

    this.players[id] = new Player(0, 0, 'file.png')
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
