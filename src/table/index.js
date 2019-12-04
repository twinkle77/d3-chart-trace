import view from '../view/index'
import { getElementRect, getClass } from '../util/element'
import data from '../data'
import d3 from '../d3'

const copyData = JSON.parse(JSON.stringify(data))

for (let i = 0; i < copyData.length; i++) {
  copyData[i] = d3.hierarchy(copyData[i])
}

class Table {
  constructor (target, options = {}) {
    this._data = options.data || {}
    this._target = target
  }

  render () {
    this._renderTableHeader()
    this._renderTableBody()
  }

  _renderTableHeader () {
    const tableHeader = view.createTableHeader(this._target)
    const { leftCol, rightCol } = view.createTableRow(tableHeader)
    leftCol.text('header-left-col')
    rightCol.text('header-right-col')
  }

  _renderTableBody () {
    const paddingLeft = 15
    const tableBody = view.createTableBody(this._target)

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
}

export default Table
