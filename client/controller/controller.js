'use strict'

function rotate (json) {
  let rotated = {}

  for (const outer in json) {
    for (const inner in json[outer]) {
      if (!rotated[inner]) {
        rotated[inner] = {}
      }
      rotated[inner][outer] = json[outer][inner]
    }
  }

  return rotated
}

class TouchController {
  constructor (model, virtuals) {
    this._model = model
    this._virtuals = virtuals
    this._handlers = {}
  }

  register (touchMap) {
    const virtualsByEvent = rotate(this._virtuals)

    for (const eventName in virtualsByEvent) {
      const handler = (e) => {
        const fns = virtualsByEvent[eventName]

        if (fns[e.target.id]) {
          fns[e.target.id](this._model, e)
        }
      }

      document.body.removeEventListener(eventName, this._handlers[eventName])
      document.body.addEventListener(eventName, handler)
      this._handlers[eventName] = handler
    }
  }

  bind () {
    for (const eventName in this._virtuals) {
      document.body.addEventListener(eventName, this._handlers[eventName])
    }
  }

  unbind () {
    for (const eventName in this._virtuals) {
      document.body.removeEventListener(eventName, this._handlers[eventName])
    }
  }
}

export default TouchController
