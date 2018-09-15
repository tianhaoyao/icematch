import * as Colyseus from 'colyseus.js'
import View from './view'

const view = new View()
const client = new Colyseus.Client('ws://localhost:8080')
const room = client.join('icematch', { player: true })

room.listen('players/:id', (change) => { updatePlayer(change) })

function updatePlayer (change) {
  console.log(change);
}
