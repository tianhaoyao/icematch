'use strict'

const SCREEN_WIDTH = 1600
const SCREEN_HEIGHT = 800
const SPRITE_WIDTH = 64
const SPRITE_HEIGHT = 64
const HEAD_HEIGHT = 64
const VELOCITY = 2
const LOBBY_TIME = 5
const SPAWN_ZONE_LEFT_BOUND = SCREEN_WIDTH / 4
const SPAWN_ZONE_RIGHT_BOUND = (SCREEN_WIDTH / 4) * 3

module.exports = {
  HEAD_HEIGHT,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SPRITE_WIDTH,
  SPRITE_HEIGHT,
  VELOCITY,
  LOBBY_TIME,
  SPAWN_ZONE_LEFT_BOUND,
  SPAWN_ZONE_RIGHT_BOUND
}
