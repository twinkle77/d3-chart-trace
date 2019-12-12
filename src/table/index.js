import extend from 'extend'
import view from '../view/index'
import { getElementRect, getClass } from '../util/element'
import d3 from '../d3'
import Axis from '../graph/axis'
import config from '../config'
import colorGenerator from '../util/colorGenerator'

class Table {
  constructor (target, options = {}) {
    this._target = target

    this.options = extend(true, {}, config.table, options)

    this._treeData = options.treeData || []

    this.options.timeRange = this._computedTimeRange()

    this._init()
  }

  _init () {
    this._initTableHeader()
    this._initRightHeader()

    this._initTableBody()

    this._genData()

    this._bindEvent()
  }

  _initTableHeader () {
    const tableHeader = view.createTableHeader(this._target)
    tableHeader
      .attr('style', `height: ${this.options.rowHeight}px`)
    const { leftCol, rightCol } = view.createTableRow(tableHeader)
    leftCol.text('header-left-col')

    this._rightCol = rightCol
  }

  _initRightHeader () {
    const svg = this._rightCol
      .append('svg')
      .classed(getClass('header-axis'), true)
      .attr('height', this.options.rowHeight)
      .attr('width', '100%')

    this._headerAxis = new Axis(svg, {
      offset: {
        top: 30,
      },
    })

    this._headerAxis
      .tickSize(3)
      .tickFormat((d) => `${d}ms`)
  }

  _initTableBody () {
    this._tableBody = view.createTableBody(this._target)
  }

  _genData () {
    const allNodes = []

    this._treeData.forEach((root) => {
      root.eachBefore((node) => {
        allNodes.push(node)
      })
    })

    this._allNodes = allNodes
  }

  renderTableRow () {
    const rowEls = this._tableBody
      .selectAll(`.${getClass('table-row')}`)
      .data(this._allNodes)

    // enter集合
    rowEls
      .enter()
      .append('div')
      .classed(getClass('table-row'), true)
      .attr('style', `height: ${this.options.rowHeight}px`)
      .call(this._createColumns().bind(this))

    // update集合
    const rectTool = this._layupRect()
    rowEls
      .selectAll(`.${getClass('table-right-col')}`)
      .selectAll('rect')
      .call(rectTool)

    // exit集合
    rowEls
      .exit()
      .transition()
      .remove()
  }

  _createColumns () {
    const rectTool = this._layupRect()

    return function call (selection) {
      selection
        .append('div')
        .classed(getClass('table-left-col'), true)
        .classed(getClass('table-col'), true)
        .attr('style', (node) => `padding-left: ${this.options.paddingLeft * node.depth}%`)
        .append('span')
        .classed(getClass('text'), true)
        .text((node) => node.data.label)

      selection
        .append('div')
        .classed(getClass('table-right-col'), true)
        .classed(getClass('table-col'), true)
        .append('svg')
        .attr('width', '100%')
        .attr('height', this.options.rowHeight)
        .append('rect')
        .call(rectTool)

      return selection
    }
  }

  /**
   * d3 call函数，调整绘制rect的比例尺
   */
  _layupRect (domain) {
    const [minStartTime, maxEndTime] = this.options.timeRange

    const rowWidth = getElementRect(this._rightCol.node()).width

    const xScale = d3
      .scaleLinear()
      .domain(domain || [minStartTime, maxEndTime])
      .range([0, rowWidth])

    const that = this

    return function draw (selection) {
      selection
        .attr('x', (node) => xScale(node.data.startTime))
        .attr('y', that.options.rowHeight / 2 - that.options.rectHeight / 2)
        .attr('width', (node) => (`${xScale(node.data.endTime) - xScale(node.data.startTime)}`))
        .attr('height', that.options.rectHeight)
        .attr('style', (node) => `fill:${colorGenerator.getHexColor(node.data.id)}`)
    }
  }

  _computedTimeRange () {
    const descendants = []
    this._treeData.forEach((rootNode) => {
      descendants.push(...rootNode.descendants())
    })
    return [
      d3.min(descendants, (node) => node.data.startTime),
      d3.max(descendants, (node) => node.data.endTime),
    ]
  }

  _bindEvent () {
    d3
      .select(window)
      .on('resize.table', () => {
        this.render()
      })
  }

  setOptions (data) {
    this._treeData = data
    this._genData()
    this.renderTableRow()
  }

  renderHeaderAxis (domain) {
    const [minStartTime, maxEndTime] = this.options.timeRange

    const SVG_WIDTH = getElementRect(this._rightCol.node()).width

    this._headerAxis
      .domain(domain ? domain.map((i) => parseInt(i, 10)) : [minStartTime, maxEndTime])
      .range(SVG_WIDTH)
      .render()
  }

  render (domain) {
    this.renderTableRow()
    this.renderHeaderAxis(domain)
  }

  destory () {
    d3
      .select(window)
      .on('resize.table', null)
  }
}

export default Table
