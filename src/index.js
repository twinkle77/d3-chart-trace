import './assets/style.less'
import extend from 'extend'
import d from './data'
import view from './view/index'
import { query } from './util/element'
import { isFunction } from './util/tool'
import Graph from './graph/index'
import Table from './table/index'
import d3 from './d3'

class Trace {
  constructor (target = 'target', options = {}) {
    this.options = extend(true, {}, options)

    this._init(target)
  }

  _init (target) {
    this._insertLayout(query(target))
    this._genData()
  }

  _genData () {
    const { data = [] } = this.options

    this._treeData = []
    data.forEach((rootData, index) => {
      this._treeData[index] = d3.hierarchy(rootData)
    })
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
  }

  /**
   * brush end 时触发
   * @param {Array} selection 刷子所选的范围
   * @param {Array} domain 刷子所选的比例尺范围
   */
  _brushEndHandler (selection, domain) {
    if (selection && domain && this._table) {
      // 重渲染rect
      this._table.resetRectWidth(domain, selection)
    } else {
      // 重置
      this._table.resetRectWidth()
    }

    isFunction(this.options.brushEnd) && this.options.brushEnd(selection, domain)
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

  render () {
    const [minStartTime, maxEndTime] = this._computedTimeRange()
    this._table = new Table(this._tableWrapper, {
      treeData: this._treeData,
      timeRange: [minStartTime, maxEndTime],
    })
    this._table.render()

    const graph = new Graph(this._graphWrapper, {
      data: this.options.data,
      treeData: this._treeData,
      brushEnd: this._brushEndHandler.bind(this),
      timeRange: [minStartTime, maxEndTime],
    })
    graph.render()
  }
}

const instance = new Trace(document.body, {
  brushEnd () {},
  data: d,
})
instance.render()

export default Trace
