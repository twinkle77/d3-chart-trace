import d3 from '../d3'
import { getClass } from '../util/element'

export default class Bar {
  constructor (svg, options) {
    this._svg = svg
    this._options = Object.assign(this.defaultOptions, options)
    this._init()
  }

  _init () {
    const {
      barHeight, margin, data = [], chartWidth,
    } = this._options

    const [minStartTime, maxEndTime] = this._getTimeRange()

    const chartHeight = (barHeight + margin * 2) * data.length

    const lineCount = data.length + 1

    this._xScale = d3.scaleLinear().domain([minStartTime, maxEndTime]).range([0, chartWidth])
    this._yScale = d3.scaleLinear().domain([0, lineCount]).range([0, chartHeight])


    const { offset } = this._options

    this._container = this._svg
      .append('g')
      .classed(getClass('bar-container'), true)
      .attr('transform', `translate(${offset.left}, ${offset.top})`)
  }

  /**
   * 线条绘制
   */
  _drawLines () {
    const { data, chartWidth } = this._options

    const lineClassName = getClass('bar-line')

    const lineEls = this._container
      .selectAll(`.${lineClassName}`)
      .data(data)

    lineEls
      .enter()
      .append('line')
      .classed(lineClassName, true)
      .attr('x1', 0)
      .attr('y1', (_, index) => this._yScale(index))
      .attr('x2', chartWidth)
      .attr('y2', (_, index) => this._yScale(index))
      .attr('stroke', 'lightgray')

    lineEls
      .exit()
      .remove()
  }

  /**
   * 矩形绘制
   */
  _drawRects () {

  }

  _draw () {
    this._drawLines()
    this._drawRects()
  }

  render () {
    this._draw()
  }

  _getTimeRange () {
    const { data } = this._options
    return [
      d3.min(data, (d) => d.startTime),
      d3.max(data, (d) => d.endTime),
    ]
  }

  get defaultOptions () {
    return {
      barHeight: 12,
      margin: 4,
      chartWidth: 1000,
      offset: {
        top: 20,
        left: 20,
      },
    }
  }
}
