import extend from 'extend'
import view from '@/util/view'
import { getElementRect, getClass, insertAfter } from '@/util/element'
import { computedTimeRange, isFunction } from '@/util/tool'
import d3 from '@/d3'
import Axis from '@/graph/axis'
import config from '@/config'
import colorGenerator from '@/util/colorGenerator'
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
      leftCol
        .append('span')
        .classed('title', true)
        .text('Service & Operation')
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
    const rowEls = this._tableBody
      .selectAll(`.${getClass('table-row')}`)
      .data(this._allNodes)

    const { rowHeight, infoTemplate } = this.options.table
    const that = this

    // enter集合
    rowEls
      .enter()
      .append('div')
      .classed(getClass('table-row'), true)
      .attr('style', `height: ${rowHeight}px`)
      .call(this._createLeftColumns().bind(this))
      .call(this._createRightColumns().bind(this))
      .on('click.toggle', function toggleHandler () {
        const rawData = d3.select(this).datum().data
        if (this.isExpanded) {
          this.cardInstance.destory()
          d3.select(this).classed('trace-expanded', this.isExpanded = false)
        } else {
          this.cardInstance = new Card(rawData, {
            templateFunction: infoTemplate,
            event: that.options.event,
          })
          insertAfter(this.cardInstance.fragment, this)
          d3.select(this).classed('trace-expanded', this.isExpanded = true)
        }

        that.options.event.emit('GRAPH_RE_RENDER')
      })

    // exit集合
    rowEls
      .exit()
      .remove()

    this._renderRect(domain)
  }

  _createRightColumns () {
    const { rowHeight } = this.options.table
    return function call (selection) {
      selection
        .append('div')
        .classed(getClass('table-right-col'), true)
        .classed(getClass('table-col'), true)
        .append('svg')
        .attr('width', '100%')
        .attr('height', rowHeight)
        .append('rect')
    }
  }

  _createLeftColumns () {
    const { paddingLeft, tooltipTemplate } = this.options.table

    return function call (selection) {
      const spanEls = selection
        .append('div')
        .classed(getClass('table-left-col'), true)
        .classed(getClass('table-col'), true)
        .on('mouseenter', ({ data: rawData }) => {
          this.tooltip.html(tooltipTemplate(rawData))
          this.tooltip.show()
        })
        .on('mouseleave', () => {
          this.tooltip.hide()
        })
        .append('span')
        .attr('style', (node) => `padding-left: ${paddingLeft * node.depth}%`)
        .classed('span-wrapper', true)

      const temp = spanEls
        .append('span')
        .classed('service-name', true)

      temp
        .append('span')
        .classed('span-color', true)
        .style('border-color', (node) => colorGenerator.getHexColor(node.data.process.serviceName))

      temp
        .append('span')
        .text((node) => node.data.process.serviceName)

      spanEls
        .append('span')
        .classed('operation-name', true)
        .text((node) => `${node.data.operationName}`)

      return selection
    }
  }

  _renderRect (domain) {
    const rectTool = this._layupRect(domain)
    d3.selectAll(`.${getClass('table-right-col')} svg rect`).call(rectTool)
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
        .attr('style', (node) => `fill:${colorGenerator.getHexColor(node.data.process.serviceName)}`)
    }
  }

  _bindEvent () {
    d3
      .select(window)
      .on('resize.table', () => {
        this.render()
      })

    this.options.event.on('GRAPH_RE_RENDER', () => {
      this.renderHeaderAxis(this._headerAxis.domain())
    })
  }

  setOptions (data) {
    this._tableBody
      .selectAll(`.${getClass('table-row')}`)
      .remove()

    this._tableBody
      .selectAll(`.${getClass('card-wrapper')}`)
      .remove()

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
