import d3 from '../d3'

export default class Bar {
  constructor (svg, options) {
    this._svg = svg
    this._options = Object.assign(this.options, options)
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
    this._yScale = d3.scaleLinear().domain([1, lineCount]).range([0, chartHeight])
  }

  render () {
    const { offset } = this.options

    this._svg
      .append('g')
      .attr('transform', `translate(${offset.left}, ${offset.top})`)
  }

  _getTimeRange () {
    const { data } = this._options
    return [
      d3.min(data, (d) => d.startTime),
      d3.max(data, (d) => d.endTime),
    ]
  }

  get options () {
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
