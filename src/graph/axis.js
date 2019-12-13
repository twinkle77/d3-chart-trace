import extend from 'extend'
import d3 from '../d3'
import { getClass } from '../util/element'
import config from '../config'
import { computedTimeRange } from '../util/tool'

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
  constructor (target, options = {}) {
    this._target = target

    this.options = extend(true, {}, config.graph.axis, options)

    this._posFn = POSITION[this.options.pos.toUpperCase()]

    this._scaleFn = d3.scaleLinear()

    this._init()
  }

  _init () {
    this._transformData()

    this._axisContainer = this._target
      .append('g')
      .classed(getClass('axis-container'), true)
      .attr('transform', () => `translate(${this.options.offset.left}, ${this.options.offset.top})`)
  }

  _transformData () {
    const allNodes = []
    this.options.treeData.forEach((root) => {
      root.eachBefore((node) => {
        allNodes.push(node)
      })
    })
    this._allNodes = allNodes
    this.domain(computedTimeRange(allNodes))
  }

  domain ([min, max]) {
    if (!arguments.length) return this._scaleFn.domain()
    this._scaleFn.domain([min, max])
    return this
  }

  range (widthRange) {
    if (!arguments.length) return this._scaleFn.range()
    this._scaleFn.range(widthRange)
    return this
  }

  ticks (number) {
    if (!arguments.length) return this.options.tickCount
    this.options.tickCount = number
    return this
  }

  tickSize (size) {
    if (!arguments.length) return this.options.tickSize
    this.options.tickSize = size
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
    if (!arguments.length) return this.options.tickPadding
    this.options.tickPadding = padding
    return this
  }

  tickFormat (formatFn) {
    if (!arguments.length) return this._format
    this._format = formatFn
    return this
  }

  setChartWidth (width) {
    this._chartWidth = width
    return this.range([0, width - this.options.offset.left - this.options.offset.right - 1])
  }

  getChartHeight () {
    return this.options.offset.top
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

  setOptions (data) {
    this.options.treeData = data
    this._transformData()
    this.render()
  }

  render () {
    const [min, max] = this._scaleFn.domain()

    const axis = this._posFn()
      .scale(this._scaleFn)
      // 不使用ticks而使用tickValues指定刻度
      .tickValues([...d3.range(min, max, (max - min) / this.options.tickCount), max].map((i) => parseInt(i, 10)))
      .tickSize(this.options.tickSize)
      .tickPadding(this.options.tickPadding)
      .tickFormat(this._format)

    this._axisContainer
      .call(axis)

    this._adjustLastTextPosition()
  }
}

export default Axis
