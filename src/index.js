import './assets/style.less'
import data from './data'
import d3 from './d3'

import view from './view/index'
import Axis from './graph/axis'
import Bar from './graph/bar'
import Brush from './graph/brush'

import { getElementRect, query, getClass } from './util/element'

const copyData = JSON.parse(JSON.stringify(data))

for (let i = 0; i < copyData.length; i++) {
  copyData[i] = d3.hierarchy(copyData[i])
}

class Trace {
  constructor (target = 'target', options = {}) {
    this._init(query(target))
  }

  _init (target) {
    this._insertLayout(target)
    this._initGraph()

    this._renderTableHeader()
    this._renderTableBody()

    this._renderView()
    this._bindEvent()
  }

  _renderTableHeader () {
    const tableHeader = view.createTableHeader(this._tableWrapper)
    const { leftCol, rightCol } = view.createTableRow(tableHeader)
    leftCol.text('header-left-col')
    rightCol.text('header-right-col')
  }

  _renderTableBody () {
    const paddingLeft = 15
    const tableBody = view.createTableBody(this._tableWrapper)

    const ROW_HEIGHT = 30

    const allNodes = []
    const allRows = []
    // return

    for (let i = 0; i < copyData.length; i++) {
      const rootNode = copyData[i]

      rootNode.eachBefore((node) => {
        const { leftCol, row } = view.createTableRow(tableBody)

        row.attr('style', `height: ${ROW_HEIGHT}px`)

        leftCol
          .attr('style', `padding-left: ${paddingLeft * node.depth}px`)

        view
          .createSpan(leftCol)
          .text(node.data.label)

        allNodes.push(node)
        allRows.push(row)
      })
    }
    const [minStartTime, maxEndTime] = [
      d3.min(data, (d) => d.startTime),
      d3.max(data, (d) => d.endTime),
    ]
    const rowWidth = getElementRect(allRows[0].node()).width
    // console.log('rowWidth', minStartTime, maxEndTime, rowWidth)
    const RECT_HEIGHT = 12
    const xScale = d3.scaleLinear().domain([minStartTime, maxEndTime]).range([0, rowWidth])
    const rectEls = tableBody
      .selectAll(`.${getClass('table-right-col')}`)
      .data(allNodes)
      .append('svg')
      .attr('width', '100%')
      .attr('height', ROW_HEIGHT)
      .append('rect')
      .attr('x', (node) => xScale(node.data.startTime))
      .attr('y', ROW_HEIGHT / 2 - RECT_HEIGHT / 2)
      .attr('width', (node) => xScale(node.data.endTime) - xScale(node.data.startTime))
      .attr('height', RECT_HEIGHT)

    rectEls
      .exit()
      .remove()
  }

  _insertLayout (target) {
    const {
      mainWrapper,
      graphWrapper,
      tableWrapper,
    } = view.createContainer(target)
    this._mainWrapper = mainWrapper
    this._graphWrapper = graphWrapper
    this._tableWrapper = tableWrapper

    /**
     * 插入画布
     */
    const svg = view.createSvg(graphWrapper)
    this._svg = svg
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
      data,
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
      data,
      offset: {
        top: 20,
        left: 0,
      },
    })
    this._brush = brush
  }

  _renderTable () {}

  _renderView () {
    /**
     * 以target节点的宽度做为svg的宽度
     */
    const SVG_WIDTH = getElementRect(this._mainWrapper.node()).width

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
        this._renderView()
      })
  }

  destory () {
    d3
      .select(window)
      .on('resize', null)
  }

  render () {

  }
}

const oDiv = document.createElement('div')
oDiv.setAttribute('class', 'target')
document.body.append(oDiv)

new Trace(oDiv)

/**  render header start */
// const headerWrapper = mainWrapper.append('div')
//   .classed('view-header', true)
/**  render header end */

// function renderRow (container) {
//   container
//     .classed('trace-row', true)

//   const leftCol = container
//     .append('div')
//     .classed('trace-left-col', true)
//     // .text('table-left')

//   const rightCol = container
//     .append('div')
//     .classed('trace-right-col', true)
//   return {
//     leftCol,
//     rightCol,
//   }
// }

// const { leftCol, rightCol } = renderRow(headerWrapper)

// const headerAxisWrapper = rightCol
//   .append('svg')
//   .attr('width', '100%')
//   .attr('height', '100%')

// const headerAxis = new Axis(headerAxisWrapper)

// headerAxis
//   .tickSize(0)
//   .domain([1, 2])
//   .range(1000)
//   .render()

/** render body start */

// function renderBody (spans) {
//   for (let i = 0; i < spans.length; i++) {
//     const { leftCol, rightCol } = renderRow(
//       mainWrapper.append('div'),
//     )

//     leftCol
//       .classed('left-col-span', true)

//     leftCol


//     const btnWrapper = leftCol
//       .append('div')

//     btnWrapper
//       .append('button')
//       .text('^')

//     btnWrapper
//       .append('a')
//       .text(spans[i].label)
//       .attr('style', `margin-left: ${spans[i].deep * 40}px `)

//     if (spans[i].children && spans[i].children.length) {
//       renderBody(spans[i].children)
//     }
//   }
// }

// renderBody(data)

export default Trace
