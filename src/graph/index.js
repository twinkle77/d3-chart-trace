import extend from 'extend'
import { getElementRect } from '../util/element'
import view from '../view/index'
import Axis from './axis'
import Bar from './bar'
import Brush from './brush'
import d3 from '../d3'

class Graph {
  constructor (target, options = {}) {
    this._target = target

    this.options = options

    this._init(target)
  }

  _init () {
    this._insertSvg()
    this._initGraph()
    this._bindEvent()
  }

  _insertSvg () {
    const svg = view.createSvg(this._target)
    this._svg = svg
  }

  _initGraph () {
    this._axis = new Axis(this._svg, extend({
      treeData: this.options.treeData,
    }, this.options.axis))

    this._axis
      .tickSize(3)
      .tickFormat((d) => `${d}ms`)

    this._bar = new Bar(this._svg,
      extend({
        treeData: this.options.treeData,
      }, this.options.bar))

    this._brush = new Brush(this._svg, extend({
      brushEnd: this.options.brushEnd,
      xScale: this._axis.scale(),
    }, this.options.brush))
  }

  _bindEvent () {
    d3
      .select(window)
      .on('resize.graph', () => {
        this.render()
      })
  }

  setOptions (data) {
    this.options.treeData = data
    this._axis.setOptions(data)
    this._bar.setOptions(data)

    this._brush.clearBrush()
    this._brush
      .setBrushView({
        brushWidth: this._svg.width,
        brushHeight: this._bar.getChartHeight(),
      })

    this._svg
      .attr('height', this._bar.getChartHeight() + this._axis.getChartHeight())
  }

  render () {
    const svgWidth = getElementRect(this._target.node()).width

    this._axis
      .setChartWidth(svgWidth)
      .render()
    const axisHeight = this._axis.getChartHeight()

    this._bar
      .setChartWidth(svgWidth)
      .render()
    const barHeight = this._bar.getChartHeight()

    this._brush
      .setBrushView({
        brushWidth: svgWidth,
        brushHeight: barHeight,
      })
      .render()

    const svgHeight = axisHeight + barHeight
    this._svg
      .attr('width', this._svg.width = svgWidth)
      .attr('height', this._svg.height = svgHeight)
  }

  destory () {
    d3
      .select(window)
      .on('resize.graph', null)
  }
}

export default Graph
