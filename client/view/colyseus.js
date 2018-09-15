import * as Colyseus from 'colyseus.js'
import View from './view'

const view = new View()
const client = new Colyseus.Client('ws://localhost:8080')
const room = client.join('icematch', { player: false })

room.listen('players/:id', (change) => { updatePlayer(change) })
room.listen('players/:id/:attribute', (change)=>{updateAttribute()})

function updatePlayer (change) {
  if (change.operation === "add"){
    view.createPlayer(change.path.id, change.value.x, change.value.y)
  }
  if (change.operation === "remove"){
    view.removePlayer(change.path.id)
  }
}

function updateAttribute(change){
  console.log(change);
}
