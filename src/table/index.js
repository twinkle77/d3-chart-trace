import extend from 'extend'
import view from '../view/index'
import { getElementRect, getClass, insertAfter } from '../util/element'
import { computedTimeRange, isFunction } from '../util/tool'
import d3 from '../d3'
import Axis from '../graph/axis'
import config from '../config'
import colorGenerator from '../util/colorGenerator'
import Card from './card'
import Tooltip from './tooltip'

class Table {
  constructor (target, options = {}) {
    this._target = target

    this.options = options

    this.options.table = extend(true, {}, config.table, options.table)

    this._init()
  }

  _init () {
    this._transformData()

    this._initTableHeader()
    this._initRightHeader()

    this._initTableBody()

    this._bindEvent()

    this.tooltip = new Tooltip()
  }

  _initTableHeader () {
    const { rowHeight } = this.options.table

    const tableHeader = view.createTableHeader(this._target)
    tableHeader
      .attr('style', `height: ${rowHeight}px`)
    const { leftCol, rightCol } = view.createTableRow(tableHeader)

    if (isFunction(this.options.renerTableHeader)) {
      this.options.renerTableHeader(leftCol)
    } else {
      leftCol.text('Service')
    }

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

    this.options.treeData.forEach((root) => {
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

    const { rowHeight } = this.options.table
    const that = this

    // enter集合
    rowEls
      .enter()
      .append('div')
      .classed(getClass('table-row'), true)
      .attr('style', `height: ${rowHeight}px`)
      .call(this._createColumns(domain).bind(this))
      .on('click.toggle', function toggleHandler () {
        const rawData = d3.select(this).datum().data
        if (this.isExpanded) {
          this.cardInstance.destory()
          d3.select(this).classed('trace-expanded', this.isExpanded = false)
        } else {
          this.cardInstance = new Card(rawData)
          insertAfter(this.cardInstance.fragment, this)
          d3.select(this).classed('trace-expanded', this.isExpanded = true)
        }
        /**
         * card的展开可能会导致滚动条的出现，需要触发graph图的重新计算
         */
        that.options.eventBus.emit('GRAPH_RENDER')
        that.options.eventBus.emit('TABLE_AXIS_RENDER')
      })

    // exit集合
    rowEls
      .exit()
      .remove()
  }

  _createColumns (domain) {
    const rectTool = this._layupRect(domain)
    const { rowHeight, paddingLeft } = this.options.table

    return function call (selection) {
      selection
        .append('div')
        .classed(getClass('table-left-col'), true)
        .classed(getClass('table-col'), true)
        .on('mouseenter', ({ data: rawData }) => {
          const {
            operationName, startTime, duration, spanID,
          } = rawData

          const html = `
            <p>spanID: ${spanID}</p>
            <p>operationName: ${operationName}</p>
            <p>startTime: ${startTime}ms</p>
            <p>duration: ${duration}ms</p>
          `

          this.tooltip.html(html)
          this.tooltip.show()
        })
        .on('mouseleave', () => {
          this.tooltip.hide()
        })
        .append('span')
        .attr('style', (node) => `padding-left: ${paddingLeft * node.depth}%`)
        .classed(getClass('text'), true)
        .text((node) => node.data.operationName)

      selection
        .append('div')
        .classed(getClass('table-right-col'), true)
        .classed(getClass('table-col'), true)
        .append('svg')
        .attr('width', '100%')
        .attr('height', rowHeight)
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
    const { rowHeight, rectHeight } = this.options.table

    const rowWidth = getElementRect(this._rightCol.node()).width

    const xScale = d3
      .scaleLinear()
      .domain(domain || [minStartTime, maxEndTime])
      .range([0, rowWidth])

    return function draw (selection) {
      selection
        .attr('x', (node) => xScale(node.data.startTime))
        .attr('y', rowHeight / 2 - rectHeight / 2)
        .attr('width', (node) => (`${xScale(node.data.endTime) - xScale(node.data.startTime)}`))
        .attr('height', rectHeight)
        .attr('style', (node) => `fill:${colorGenerator.getHexColor(node.data.spanID)}`)
    }
  }

  _bindEvent () {
    d3
      .select(window)
      .on('resize.table', () => {
        this.render()
      })

    this.options.eventBus.on('TABLE_AXIS_RENDER', () => {
      this.renderHeaderAxis(this._headerAxis.domain())
    })
  }

  setOptions (data) {
    this.options.treeData = data
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
