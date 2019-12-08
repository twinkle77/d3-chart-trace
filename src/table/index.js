import view from '../view/index'
import { getElementRect, getClass } from '../util/element'
import data from '../data'
import d3 from '../d3'

const ROW_HEIGHT = 30
const RECT_HEIGHT = 12

const copyData = JSON.parse(JSON.stringify(data))

for (let i = 0; i < copyData.length; i++) {
  copyData[i] = d3.hierarchy(copyData[i])
}

class Table {
  constructor (target, options = {}) {
    this._data = options.data || {}
    this._target = target
    const [minStartTime, maxEndTime] = options.timeRange || []
    this._maxEndTime = maxEndTime
    this._minStartTime = minStartTime
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
    const paddingLeft = 2
    const tableBody = view.createTableBody(this._target)

    const allNodes = []
    const allRows = []

    for (let i = 0; i < copyData.length; i++) {
      const rootNode = copyData[i]

      rootNode.eachBefore((node) => {
        const { leftCol, row } = view.createTableRow(tableBody)

        row.attr('style', `height: ${ROW_HEIGHT}px`)

        leftCol
          .attr('style', `padding-left: ${paddingLeft * node.depth}%`)

        view
          .createSpan(leftCol)
          .text(node.data.label)

        allNodes.push(node)
        allRows.push(row)
      })
    }

    this._tableBody = tableBody
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
      .attr('height', ROW_HEIGHT)
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
    const rowWidth = getElementRect(this._allRows[0].node()).width
    const xScale = d3
      .scaleLinear()
      .domain(domain || [this._minStartTime, this._maxEndTime]).range([0, rowWidth])

    return function draw (selection) {
      selection
        .attr('x', (node) => xScale(node.data.startTime))
        .attr('y', ROW_HEIGHT / 2 - RECT_HEIGHT / 2)
        .attr('width', (node) => (`${xScale(node.data.endTime) - xScale(node.data.startTime)}`))
        .attr('height', RECT_HEIGHT)
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
