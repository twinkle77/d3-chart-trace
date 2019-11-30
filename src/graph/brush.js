import d3 from '../d3'
import { getClass } from '../util/element'

export default class Brush {
  constructor (container, options = {}) {
    this._container = container

    this._offset = options.offset || { top: 0, left: 0 }

    this._brushHandler = options.brush || function brush () {}
    this._brushEndHandler = options.brushEnd || function brushEnd () {}

    this._init()
  }

  _init () {
    this._brushContainer = this._container
      .append('g')
      .classed(getClass('brush-container'), true)
      .attr('transform', `translate(${this._offset.left}, ${this._offset.top})`)

    this._brushInstance = d3.brushX()
      .on('brush', this._brushHandler)
      .on('end', this._brushEndHandler)
  }

  setBrushView ({ brushWidth, brushHeight }) {
    this._brushInstance
      .extent([[0, 0], [brushWidth, brushHeight]])
    return this
  }

  destory () {
    this._brushInstance.on('brush', null)
    this._brushInstance.on('end', null)
  }

  clearBrush () {
    this._brushInstance.clear(this._brushContainer)
  }

  render () {
    this._brushContainer.call(this._brushInstance)
    this.clearBrush()
  }
}
