import { event } from 'd3-selection'
import d3 from '../d3'
import { getClass } from '../util/element'

export default class Brush {
  constructor (container, options = {}) {
    this._container = container

    this._offset = options.offset || { top: 0, left: 0 }

    const brushHandler = options.brush || function brush () {}
    this._brushHandler = function _brushHandler () {
      brushHandler(event.selection)
    }

    const brushEndHandler = options.brushEnd || function brushEnd () {}
    this._brushEndHandler = function _endHandler () {
      let domain = null
      if (event.selection && options.xScale) {
        domain = event.selection.map((i) => options.xScale.invert(i))
      }
      brushEndHandler(event.selection, domain)
    }

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

    this._bindEvent()
  }

  setBrushView ({ brushWidth, brushHeight }) {
    this._brushInstance
      .extent([[0, 0], [brushWidth, brushHeight]])
    return this
  }

  destory () {
    this._brushInstance.on('brush', null)
    this._brushInstance.on('end', null)
    d3
      .select(window)
      .on('resize.brush', null)
  }

  clearBrush () {
    this._brushInstance.clear(this._brushContainer)
  }

  render () {
    this._brushContainer.call(this._brushInstance)
  }

  _bindEvent () {
    d3
      .select(window)
      .on('resize.brush', () => {
        this.clearBrush()
      })
  }
}
