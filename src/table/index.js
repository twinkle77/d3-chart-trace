import extend from 'extend'
import view from '../view/index'
import { getElementRect, getClass, insertAfter } from '../util/element'
import { computedTimeRange } from '../util/tool'
import d3 from '../d3'
import Axis from '../graph/axis'
import config from '../config'
import colorGenerator from '../util/colorGenerator'
import Card from './card.js'

class Table {
  constructor (target, options = {}) {
    this._target = target

    this.options = extend(true, {}, config.table, options)

    this._treeData = options.treeData || []

    this._init()
  }

  _init () {
    this._transformData()

    this._initTableHeader()
    this._initRightHeader()

    this._initTableBody()

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
      treeData: this.options.treeData,
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

  _transformData () {
    const allNodes = []

    this._treeData.forEach((root) => {
      root.eachBefore((node) => {
        allNodes.push(node)
      })
    })

    this._allNodes = allNodes

    this.options.timeRange = computedTimeRange(allNodes)
  }

  renderTableRow (domain) {
    this._tableBody
      .selectAll(`.${getClass('table-row')}`)
      .remove()

    this._tableBody
      .selectAll(`.${getClass('card-wrapper')}`)
      .remove()

    const rowEls = this._tableBody
      .selectAll(`.${getClass('table-row')}`)
      .data(this._allNodes)

    // enter集合
    rowEls
      .enter()
      .append('div')
      .classed(getClass('table-row'), true)
      .attr('style', `height: ${this.options.rowHeight}px`)
      .call(this._createColumns(domain).bind(this))
      .on('click.toggle', function toggleHandler () {
        if (this.isExpanded) {
          this.cardInstance.destory()
          d3.select(this).classed('trace-expanded', this.isExpanded = false)
        } else {
          this.cardInstance = new Card()
          insertAfter(this.cardInstance.fragment, this)
          d3.select(this).classed('trace-expanded', this.isExpanded = true)
        }
      })

    // exit集合
    rowEls
      .exit()
      .remove()
  }

  _createColumns (domain) {
    const rectTool = this._layupRect(domain)

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

  _bindEvent () {
    d3
      .select(window)
      .on('resize.table', () => {
        this.render()
      })
  }

  setOptions (data) {
    this._treeData = data
    this._transformData()
    this.render()
  }

  renderHeaderAxis (domain) {
    const [minStartTime, maxEndTime] = this.options.timeRange

    const svgWidth = getElementRect(this._rightCol.node()).width

    this._headerAxis
      .domain(domain ? domain.map((i) => parseInt(i, 10)) : [minStartTime, maxEndTime])
      .setChartWidth(svgWidth)
      .render()
  }

  render (domain) {
    this.renderTableRow(domain)
    this.renderHeaderAxis(domain)
  }

  destory () {
    d3
      .select(window)
      .on('resize.table', null)
  }
}

export default Table
