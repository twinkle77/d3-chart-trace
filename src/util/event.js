export default class Event {
  constructor () {
    this._events = Object.create(null)
  }

  static create () {
    return new Event()
  }

  on (event, fn) {
    if (Array.isArray(event)) {
      for (let i = 0, len = event.length; i < len; i += 1) {
        this.on(event[i], fn)
      }
    } else {
      (this._events[event] || (this._events[event] = [])).push(fn)
    }
    return this
  }

  emit (...args) {
    const event = args[0]
    const cbs = this._events[event]

    if (cbs) {
      const argument = Array.from(args).slice(1)
      for (let i = 0, len = cbs.length; i < len; i += 1) {
        cbs[i].apply(null, argument)
      }
    }
    return this
  }

  once (event, fn) {
    function on (...args) {
      this.off(event, on)
      fn.apply(null, [...args])
    }
    this.on(event, on)
    return this
  }

  off (event, fn) {
    if (!arguments.length) {
      this._events = Object.create(null)
      return this
    }

    if (Array.isArray(event)) {
      for (let i = 0, len = event.length; i < len; i += 1) {
        this.off(event[i], fn)
      }
      return this
    }

    const cbs = this._events[event]
    if (!cbs) {
      return this
    }
    if (!fn) {
      this._events[event] = null
      return this
    }

    let i = cbs.length
    // eslint-disable-next-line no-plusplus
    while (i--) {
      const cb = cbs[i]
      if (cb === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return this
  }
}
