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

  // 数据驱动改动点 4
  _initGraph () {
    const [minStartTime, maxEndTime] = this.options.timeRange

    this._axis = new Axis(this._svg, extend({
      treeData: this.options.treeData,
    }, this.options.axis))

    this._axis
      .tickSize(3)
      .tickFormat((d) => `${d}ms`)

    /**
     * 初始化bar图
     */
    this._bar = new Bar(this._svg,
      extend({
        treeData: this.options.treeData,
        timeRange: [minStartTime, maxEndTime],
      }, this.options.bar))

    /**
     * 初始化刷子
     */
    this._brush = new Brush(this._svg, extend({
      brushEnd: this.options.brushEnd,
      xScale: this._axis.scale(),
    }, this.options.brush))
  }

  setOptions (data) {
    this._treeData = data
    this._axis.setOptions(data)
  }

  render () {
    /**
     * 以target节点的宽度做为svg的宽度
     */
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

    /** axis图 和 graph图 渲染完成后再设置svg的长度 */
    const svgHeight = axisHeight + barHeight
    this._svg
      .attr('width', svgWidth)
      .attr('height', svgHeight)
  }

  _bindEvent () {
    d3
      .select(window)
      .on('resize.graph', () => {
        this.render()
      })
  }

  destory () {
    d3
      .select(window)
      .on('resize.graph', null)
  }
}

export default Graph
