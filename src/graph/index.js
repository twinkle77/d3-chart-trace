import { getElementRect } from '../util/element'
import view from '../view/index'
import Axis from './axis'
import Bar from './bar'
import Brush from './brush'
import d3 from '../d3'

class Graph {
  constructor (target, options = {}) {
    this._target = target
    this._data = options.data || {}
    this._options = options
    /**
     * 插入画布
     */
    const svg = view.createSvg(target)
    this._svg = svg

    this._init()
  }

  _init () {
    this._initGraph()
    this._bindEvent()
  }

  _initGraph () {
    /**
     * 初始化axis图
     */
    const axis = new Axis(this._svg)
    axis
      .tickSize(0)
      .domain([1, 2])
    this._axis = axis

    /**
     * 初始化bar图
     */
    const bar = new Bar(this._svg, {
      data: this._data,
      offset: {
        top: 20,
        left: 0,
      },
    })
    this._bar = bar

    /**
     * 初始化刷子
     */
    const brush = new Brush(this._svg, {
      data: this._data,
      offset: {
        top: 20,
        left: 0,
      },
      brushEnd: this._options.brushEnd,
      xScale: axis.scale(),
    })
    this._brush = brush
  }

  render () {
    /**
     * 以target节点的宽度做为svg的宽度
     */
    const SVG_WIDTH = getElementRect(this._target.node()).width

    this._axis
      .range(SVG_WIDTH)
      .render()
    const AXIS_HEIGHT = this._axis.getChartHeight()

    this._bar
      .setChartWidth(SVG_WIDTH)
      .render()
    const BAR_TOTOL_HEIGHT = this._bar.getChartHeight()

    this._brush
      .setBrushView({
        brushWidth: SVG_WIDTH,
        brushHeight: BAR_TOTOL_HEIGHT,
      })
      .render()

    /** axis图 和 graph图 渲染完成后再设置svg的长度 */
    this._svg
      .attr('width', SVG_WIDTH)
      .attr('height', AXIS_HEIGHT + BAR_TOTOL_HEIGHT)
  }

  _bindEvent () {
    d3
      .select(window)
      .on('resize', () => {
        this.render()
      })
  }

  destory () {
    d3
      .select(window)
      .on('resize', null)
  }
}

export default Graph
