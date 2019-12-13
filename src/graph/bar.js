import extend from 'extend'
import d3 from '../d3'
import { getClass } from '../util/element'
import config from '../config'
import colorGenerator from '../util/colorGenerator'
import { computedTimeRange } from '../util/tool'

export default class Bar {
  constructor (target, options = {}) {
    this._target = target

    this.options = extend(true, {}, config.graph.bar, options)

    this._init()
  }

  _init () {
    this._insertContainer()
    this._transformData()
  }

  _transformData () {
    this.descendants = []
    this.options.treeData.forEach((root) => {
      root.eachBefore((node) => {
        this.descendants.push(node)
      })
    })
    this.options.timeRange = computedTimeRange(this.descendants)

    const {
      barHeight,
      margin,
    } = this.options
    // 当条的高度
    this.singleHeight = barHeight + margin * 2
    // 图的总高
    this.chartHeight = this.singleHeight * this.descendants.length

    return this
      ._computeYscale()
      ._computeXscale()
  }

  /** 计算y轴的比例尺 */
  _computeYscale () {
    this._yScale = d3.scaleLinear().domain([0, this.descendants.length]).range([0, this.chartHeight])
    return this
  }

  /** 计算x轴的比例尺 */
  _computeXscale () {
    const [minStartTime, maxEndTime] = this.options.timeRange
    this._xScale = d3.scaleLinear().domain([minStartTime, maxEndTime]).range([0, this.chartWidth])
    return this
  }

  _insertContainer () {
    const { offset } = this.options
    this._barContainer = this._target
      .append('g')
      .classed(getClass('bar-container'), true)
      .attr('transform', `translate(${offset.left}, ${offset.top})`)
  }

  /**
   * 线条绘制
   */
  _drawLines () {
    const lineClassName = getClass('bar-line')

    const lineEls = this._barContainer
      .selectAll(`.${lineClassName}`)
      .data(this.descendants)

    lineEls
      .enter()
      .append('line')
      .classed(lineClassName, true)
      .merge(lineEls)
      .attr('x1', 0)
      .attr('y1', (_, index) => this._yScale(index) + this.singleHeight)
      .attr('x2', this.chartWidth)
      .attr('y2', (_, index) => this._yScale(index) + this.singleHeight)

    lineEls
      .exit()
      .remove()

    return this
  }

  /**
   * 矩形绘制
   */
  _drawRects () {
    const { barHeight, margin } = this.options

    const rectClassName = getClass('bar-rect')

    const rectEls = this._barContainer
      .selectAll(`.${rectClassName}`)
      .data(this.descendants)

    rectEls
      .enter()
      .append('rect')
      .classed(rectClassName, true)
      .merge(rectEls)
      .attr('x', (node) => this._xScale(node.data.startTime))
      .attr('y', (_, index) => this._yScale(index) + margin)
      .attr('width', (node) => this._xScale(node.data.endTime) - this._xScale(node.data.startTime))
      .attr('height', barHeight)
      .attr('style', (node) => `fill:${colorGenerator.getHexColor(node.data.id)}`)

    rectEls
      .exit()
      .remove()

    return this
  }

  getChartHeight () {
    return this.chartHeight
  }

  setChartWidth (chartWidth) {
    this.chartWidth = chartWidth
    return this._computeXscale()
  }

  setOptions (data) {
    this.options.treeData = data
    this._transformData()
    this.render()
  }

  render () {
    this
      ._drawLines()
      ._drawRects()
  }
}
