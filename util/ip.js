'use strict'

const os = require('os')

function localIp () {
  const networks = os.networkInterfaces()
  let address

  Object.keys(networks).forEach((netname) => {
    networks[netname].forEach((network) => {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      if (network.family === 'IPv4' && network.internal === false) {
        address = network.address
      }
    })
  })

  return address
}

module.exports = localIp
