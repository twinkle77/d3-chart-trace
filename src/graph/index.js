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
    /**
     * 插入画布
     */
    const svg = view.createSvg(this._target)
    this._svg = svg

    this._initGraph()
    this._bindEvent()
  }

  _initGraph () {
    const [minStartTime, maxEndTime] = this.options.timeRange
    /**
     * 初始化axis图
     */
    const axis = new Axis(this._svg)
    axis
      .tickSize(3)
      .domain([minStartTime, maxEndTime])
      .tickFormat((d) => `${d}ms`)
    this._axis = axis

    /**
     * 初始化bar图
     */
    const bar = new Bar(this._svg, {
      treeData: this.options.treeData,
      offset: {
        top: 20,
        left: 0,
      },
      timeRange: [minStartTime, maxEndTime],
    })
    this._bar = bar

    /**
     * 初始化刷子
     */
    const brush = new Brush(this._svg, {
      offset: {
        top: 20,
        left: 0,
      },
      brushEnd: this.options.brushEnd,
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