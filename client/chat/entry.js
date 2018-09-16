'use strict'

import * as Colyseus from 'colyseus.js'
import uuid from 'uuid/v1'

const client = new Colyseus.Client(`ws://${window.location.host}`)
const room = client.join('chat')

const $ = slt => document.querySelector(slt)
const matchId = new URL(window.location).searchParams.get('matchId')
const stamp = uuid()

$('#send').addEventListener('click', (e) => {
  e.preventDefault()

  const $input = $('#input')
  const message = $input.value

  $input.value = ''

  const payload = {
    owner: stamp,
    matchId,
    message
  }

  room.send(payload)
})

room.listen('matches/:matchId/:index', (change) => {
  if (change.value.matchId === matchId) {
    postMessage(change.value)
  }
})

function postMessage (value) {
  const $li = document.createElement('li')
  const $out = $('#output')
  $li.innerHTML = value.message

  if (value.owner === stamp) {
    $li.classList.add('me')
  } else {
    $li.classList.add('you')
  }

  $out.appendChild($li)
}
