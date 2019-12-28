import d3 from './d3'

let NAMESPACE_I = 0
export default class EventBus {
  constructor () {
    this.mountElement = d3.select(window)

    this.namespace = NAMESPACE_I
    NAMESPACE_I += 1
  }

  static create () {
    return new EventBus()
  }

  getEventName (event) {
    return `${event}-${this.namespace}`
  }

  on (event, fn) {
    this.mountElement.on(this.getEventName(event), fn)
  }

  emit (event, payload) {
    this.mountElement.dispatch(this.getEventName(event), payload)
  }

  off (event) {
    this.mountElement.on(this.getEventName(event), null)
  }
}
