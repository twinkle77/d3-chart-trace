import d3 from '../d3'
import { getClass } from '../util/element'

/**
 * 坐标轴的朝向
 */
const POSITION = {
  TOP: d3.axisTop,
  RIGHT: d3.axisRight,
  BOTTOM: d3.axisBottom,
  LEFT: d3.axisLeft,
}

/**
 * 功能：
 * 1. 支持渲染各种方向的坐标轴
 * 2. 支持只渲染数值
 * 3. 支持重渲染
 */
class Axis {
  constructor (container, options = {}) {
    this._container = container

    this._offset = options.offset || {
      top: 20, left: 0, right: 0, bottom: 0,
    }

    this._scaleFn = d3.scaleLinear()

    this._posFn = POSITION.TOP

    this._ticksCount = 5
    this._tickSize = 5
    this._tickPaddding = 3

    this._format = d3.format(options.format || '.1f')

    this._axisContainer = this._container
      .append('g')
      .classed(getClass('axis-container'), true)
      .attr('transform', () => `translate(${this._offset.left}, ${this._offset.top})`)

    this.chartHeight = this._offset.left
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
    if (!arguments.length) return this._ticksCount
    this._ticksCount = number
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
    const axis = this._posFn()
      .scale(this._scaleFn)
      // 不使用ticks而使用tickValues指定刻度
      .tickValues([...this._scaleFn.ticks(this._ticksCount), this._scaleFn.domain()[1]])
      .tickSize(this._tickSize)
      .tickPadding(this._tickPaddding)
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
