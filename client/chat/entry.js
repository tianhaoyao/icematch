'use strict'

import * as Colyseus from 'colyseus'
import uuid from 'uuid/v1'

const client = new Colyseus.Client(`ws://${window.location.host}`)
const room = client.join('chat')

const $ = slt => document.querySelector(slt)
const matchId = new URL(window.location).searchParams.get('matchId')
const stamp = uuid()

$('#send').addEventListener('click', (e) => {
  e.preventDefault()

  const message = $('#input').value

  const payload = {
    owner: stamp,
    matchId,
    message
  }

  room.send(payload)
})

room.listen(':matchId/:index', (change) => {
  if (change.value.matchId === matchId) {
    postMessage(change.value)
  }
})

function postMessage (value) {
  const $li = document.createElement('li')
  const $out = $('output')
  $li.innerHTML = value.message

  if (value.sender === stamp) {
    $li.classList.add('me')
  } else {
    $li.classList.add('you')
  }

  $out.appendChild($li)
}
