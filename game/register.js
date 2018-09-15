'use strict'

function register (gameServer) {
  const roomMap = {
    'icematch': './rooms/icematch'
  }

  for (const roomName in roomMap) {
    gameServer.register(roomName, require(roomMap[roomName]))
  }

  return gameServer
}

module.exports = register
