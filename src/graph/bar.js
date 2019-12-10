import extend from 'extend'
import d3 from '../d3'
import { getClass } from '../util/element'
import { warn } from '../util/debug'
import config from '../config'
import colorGenerator from '../util/colorGenerator'

export default class Bar {
  constructor (target, options = {}) {
    this._target = target

    if (!options.timeRange) {
      return warn('timeRange必传')
    }

    this.options = extend(true, {}, config.graph.bar, options)

    this._init()
  }

  _init () {
    this._initScale()
    this._insertContainer()
  }

  _initScale () {
    const {
      barHeight,
      margin,
      treeData = [],
    } = this.options

    this.descendants = []
    treeData.forEach((root) => {
      root.eachBefore((node) => {
        this.descendants.push(node)
      })
    })

    // 当条bar的高度
    const singleHeight = barHeight + margin * 2

    // 图的总高
    const chartHeight = singleHeight * this.descendants.length
    this.chartHeight = chartHeight

    this._yScale = d3.scaleLinear().domain([0, this.descendants.length - 1]).range([singleHeight, chartHeight])
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
    if (!this.chartWidth) {
      return warn('需先设置图宽度')
    }

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
      .attr('y1', (_, index) => this._yScale(index))
      .attr('x2', this.chartWidth)
      .attr('y2', (_, index) => this._yScale(index))

    lineEls
      .exit()
      .remove()

    return this
  }

  /**
   * 矩形绘制
   */
  _drawRects () {
    const { barHeight } = this.options

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
      .attr('y', (_, index) => this._yScale(index - 1 + 0.5) - barHeight / 2)
      .attr('width', (node) => this._xScale(node.data.endTime) - this._xScale(node.data.startTime))
      .attr('height', barHeight)
      .attr('style', (node) => `fill:${colorGenerator.getHexColor(node.data.id)}`)

    rectEls
      .exit()
      .remove()

    return this
  }

  /** 计算x轴的比例尺 */
  _computeXscale () {
    const [minStartTime, maxEndTime] = this.options.timeRange
    this._xScale = d3.scaleLinear().domain([minStartTime, maxEndTime]).range([0, this.chartWidth])
  }

  getChartHeight () {
    return this.chartHeight
  }

  setChartWidth (chartWidth) {
    this.chartWidth = chartWidth
    this._computeXscale()
    return this
  }

  render () {
    this
      ._drawLines()
      ._drawRects()
  }

  /*
  _drawText () {
    this.miniG.append('g')
      .selectAll('.ctext')
      .data(data)
      .enter()
      .append('text')
      .classed('ctext', true)
      .text((d) => d.label)
      .attr('x', -10)
      .attr('y', (d, index) => yScale(index + 1 + 0.5))
      .attr('dy', '0.5ex')
      .attr('text-anchor', 'start')
      .attr('style', 'font-size: 12px;')
      .each(function computeWidth (n) {
        n.textWidth = this.getComputedTextLength()
      })
  }
  */
}
