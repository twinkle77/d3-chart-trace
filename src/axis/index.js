import {
  axisTop,
  axisRight,
  axisBottom,
  axisLeft,
} from 'd3-axis'

import { select } from 'd3-selection'
import { format } from 'd3-format'
import { scaleLinear } from 'd3-scale'

import { query, getElementRect } from '@/util/element'
import { AXIS_SVG } from '@/util/constant'
/**
 * 坐标轴的朝向
 */
const POSITION = {
  TOP: axisTop,
  RIGHT: axisRight,
  BOTTOM: axisBottom,
  LEFT: axisLeft,
}

class Axis {
  constructor (selection) {
    this._selection = selection
    this._initConfig()
    this._init()
  }

  _initConfig () {
    this._margin = {
      top: 20,
      left: 20,
      right: 20,
    }

    const axisWidth = 1000

    this._scaleFn = scaleLinear()

    this._posFn = POSITION.TOP

    this._ticksNumber = 5
    this._tickSize = 5
    this._tickPaddding = 3
    this._formatFn = format('.0%')
  }

  _init () {
    // this._selection
    //   .attr('class', AXIS_SVG)
    //   .attr('width', '100%')
    //   .attr('height', '100%')
  }

  domain (min, max) {
    if (!arguments.length) return this._scaleFn.domain()
    this._scaleFn.domain(arguments.length > 1 ? [min, max] : min)
    return this
  }

  range (axisWidth) {
    if (!arguments.length) return this._scaleFn.range()

    this._scaleFn.range([0, axisWidth - this._margin.left - this._margin.right])

    return this
  }

  ticks (number) {
    if (!arguments.length) return this._ticksNumber
    this._ticksNumber = number
    return this
  }

  tickSize (size) {
    if (!arguments.length) return this._tickSize
    this._tickSize = size
    return this
  }

  position (pos) {
    if (!arguments.length) return this._posFn
    this._posFn = POSITION[pos.toUpperCase()]
    return this
  }

  scale (fn) {
    if (!arguments.length) return this._scaleFn
    this._scaleFn = fn
    return this
  }

  tickPadding (padding) {
    if (!arguments.length) return this._tickPaddding
    this._tickPaddding = padding
    return this
  }

  tickFormat (formatFn) {
    if (!arguments.length) return this._formatFn
    this._formatFn = formatFn
    return this
  }

  render () {
    const axis = this._posFn()
      .scale(this._scaleFn)
      .ticks(this._ticksNumber)
      .tickSize(this._tickSize)
      .tickPadding(this._tickPaddding)
      .tickFormat(format('.0%'))

    this._selection
      .append('g')
      .attr('transform', 'translate(0,0.5)')
      .attr('transform', () => `translate(${this._margin.left}, ${this._margin.top})`)
      .call(axis)
      // .selectAll('text')
      // .attr('dx', 0)
      // .attr('dy', 0)
  }

  destory () {
    return this
  }
}

export default Axis
