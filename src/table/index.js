import view from '../view/index'
import { getElementRect, getClass } from '../util/element'
import d3 from '../d3'

const PADDING_LEFT = 2

class Table {
  constructor (target, options = {}) {
    this._treeData = options.treeData || []

    this._target = target

    this.options = options

    this._init()
  }

  _init () {
    this._renderTableHeader()
    this._renderTableBody()
    this._bindEvent()
  }

  render () {
    this._renderRect()
  }

  _renderTableHeader () {
    const tableHeader = view.createTableHeader(this._target)
    const { leftCol, rightCol } = view.createTableRow(tableHeader)
    leftCol.text('header-left-col')
    rightCol.text('header-right-col')
  }

  _renderTableBody () {
    this._tableBody = view.createTableBody(this._target)

    const allNodes = []
    const allRows = []

    this._treeData.forEach((root) => {
      root.eachBefore((node) => {
        const { leftCol, row } = view.createTableRow(this._tableBody)

        row.attr('style', `height: ${this.options.table.rowHeight}px`)

        leftCol
          .attr('style', `padding-left: ${this.options.table.paddingLeft * node.depth}%`)

        view
          .createSpan(leftCol)
          .text(node.data.label)

        allNodes.push(node)
        allRows.push(row)
      })
    })

    this._allRows = allRows
    this._allNodes = allNodes
  }

  /**
   * 首次绘制rect
   */
  _renderRect () {
    const rectTool = this._layupRect()

    const rectEls = this._tableBody
      .selectAll(`.${getClass('table-right-col')}`)
      .data(this._allNodes)
      .append('svg')
      .attr('width', '100%')
      .attr('height', this.options.table.rowHeight)
      .append('rect')
      .call(rectTool)

    rectEls
      .exit()
      .remove()
  }

  /**
   * d3 call函数，调整绘制rect的比例尺
   */
  _layupRect (domain) {
    const [minStartTime, maxEndTime] = this.options.timeRange

    const rowWidth = getElementRect(this._allRows[0].node()).width

    const xScale = d3
      .scaleLinear()
      .domain(domain || [minStartTime, maxEndTime]).range([0, rowWidth])

    const that = this

    return function draw (selection) {
      selection
        .attr('x', (node) => xScale(node.data.startTime))
        .attr('y', that.options.table.rowHeight / 2 - that.options.table.rectHeight / 2)
        .attr('width', (node) => (`${xScale(node.data.endTime) - xScale(node.data.startTime)}`))
        .attr('height', that.options.table.rectHeight)
    }
  }

  /**
   * 重置rect的位置跟宽度
   */
  resetRectWidth (domain) {
    const rectTool = this._layupRect(domain)

    this._tableBody
      .selectAll(`.${getClass('table-right-col')}`)
      .select('rect')
      .call(rectTool)
  }

  _bindEvent () {
    d3
      .select(window)
      .on('resize.table', () => {
        this.resetRectWidth()
      })
  }

  destory () {
    d3
      .select(window)
      .on('resize.table', null)
  }
}

export default Table
