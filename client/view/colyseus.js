import * as Colyseus from 'colyseus.js'
import View from './view'
import Redirect from '../force-http'

Redirect()

const view = new View()
const client = new Colyseus.Client(`ws://${window.location.host}`)
const room = client.join('icematch', { player: false })

room.listen('players/:id', (change) => { updatePlayer(change) })
room.listen('players/:id/:attribute', (change) => { updateAttribute(change) })
room.listen('question', (change) => { setQuestion(change) })
room.listen('answer1', (change) => { setAnswer1(change) })
room.listen('answer2', (change) => { setAnswer2(change) })
room.listen('time', (change) => { setTime(change) })

function updatePlayer (change) {
  if (change.operation === 'add') {
    view.createPlayer(change.path.id, change.value.x, change.value.y, change.value.image)
  }
  if (change.operation === 'remove') {
    view.removePlayer(change.path.id)
  }
}

function updateAttribute (change) {
  if (change.operation === 'replace') {
    view.updatePosition(change.path.id, change.path.attribute, change.value)
  }
}

function setQuestion (change) {
  view.setQuestion(change.value)
}

function setAnswer1 (change) {
  view.setAnswer1(change.value)
}

function setAnswer2 (change) {
  view.setAnswer2(change.value)
}

function setTime (change) {
  for (let t = change.value; t >= 0; t--) {
    setTimeout(() => { view.setTime(10 - t) }, 1000 * t)
  }
}
