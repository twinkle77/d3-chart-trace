import extend from 'extend'
import d3 from '../d3'
import { getClass } from '../util/element'
import config from '../config'

/**
 * 坐标轴的朝向
 */
const POSITION = {
  TOP: d3.axisTop,
  RIGHT: d3.axisRight,
  BOTTOM: d3.axisBottom,
  LEFT: d3.axisLeft,
}

class Axis {
  constructor (container, options = {}) {
    this._target = container

    this.options = extend(true, {}, config.graph.axis, options)

    this._offset = this.options.offset

    this._posFn = POSITION[this.options.pos.toUpperCase()]

    this._tickCount = this.options.tickCount
    this._tickSize = this.options.tickSize
    this._tickPadding = this.options.tickPadding

    this._scaleFn = d3.scaleLinear()
    this.chartHeight = this._offset.left

    this._init()
  }

  _init () {
    this._axisContainer = this._target
      .append('g')
      .classed(getClass('axis-container'), true)
      .attr('transform', () => `translate(${this._offset.left}, ${this._offset.top})`)
  }

  domain ([min, max]) {
    if (!arguments.length) return this._scaleFn.domain()
    this._scaleFn.domain([min, max])
    return this
  }

  range (axisWidth) {
    if (!arguments.length) return this._scaleFn.range()
    this._scaleFn.range([0, axisWidth - this._offset.left - this._offset.right - 1])

    return this
  }

  ticks (number) {
    if (!arguments.length) return this._tickCount
    this._tickCount = number
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
    if (!arguments.length) return this._tickPadding
    this._tickPadding = padding
    return this
  }

  tickFormat (formatFn) {
    if (!arguments.length) return this._format
    this._format = formatFn
    return this
  }

  getChartHeight () {
    return this.chartHeight
  }

  /**
   * 调整刻度尺上最后一个text标签的位置，避免绘制到屏幕外
   */
  _adjustLastTextPosition () {
    this._axisContainer
      .selectAll('g.tick text')
      .attr('y', -2)
      .attr('x', 2)
      .each(function searchLastElement (node, index, selection) {
        if (selection.length - 1 === index) {
          /** 强行后退 */
          d3.select(this)
            .attr('x', -this.getComputedTextLength() - 2)
        }
      })
  }

  render () {
    const [min, max] = this._scaleFn.domain()

    const axis = this._posFn()
      .scale(this._scaleFn)
      // 不使用ticks而使用tickValues指定刻度
      .tickValues([...d3.range(min, max, (max - min) / this._tickCount), max].map((i) => parseInt(i, 10)))
      .tickSize(this._tickSize)
      .tickPadding(this._tickPadding)
      .tickFormat(this._format)

    this._axisContainer
      .call(axis)

    this._adjustLastTextPosition()
  }

  destory () {
    return this
  }
}

export default Axis
