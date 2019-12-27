import d3 from './d3'

export default class EventBus {
  constructor (mountElement, namespace) {
    this.mountElement = d3.select(mountElement)
    this.namespace = namespace
  }

  static create () {
    return new EventBus()
  }

  getEventName (event) {
    return `${event}.${this.namespace}`
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
