import './assets/style.less'
import extend from 'extend'
import d from './data'
import view from './view/index'
import { query } from './util/element'
import { isFunction, nextTick, isArray } from './util/tool'
import Graph from './graph/index'
import Table from './table/index'
import d3 from './d3'
import { warn } from './util/debug'

class Trace {
  constructor (target = 'target', options = {}) {
    if (isArray(options.data) && options.data.length === 0) {
      return warn('数据格式不符合！')
    }

    this.options = extend(true, {}, options)

    this._init(target)
  }

  _init (target) {
    this._insertLayout(query(target))
    this._genData()
    this._initChart()
  }

  _genData () {
    const { data = [] } = this.options

    this._treeData = []
    data.forEach((rootData, index) => {
      this._treeData[index] = d3.hierarchy(rootData)
    })
  }

  _initChart () {
    const [minStartTime, maxEndTime] = this._computedTimeRange()

    this._table = new Table(this._tableWrapper, extend({
      treeData: this._treeData,
    }, this.options.table))

    this._graph = new Graph(this._graphWrapper, extend({
      treeData: this._treeData,
      brushEnd: this._brushEndHandler.bind(this),
      timeRange: [minStartTime, maxEndTime],
    }, this.options.graph))
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
    this._table && this._table.render(domain)

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

  // eslint-disable-next-line consistent-return
  setOptions (newData) {
    if (isArray(newData) && newData.length === 0) {
      return warn('数据格式不符合！')
    }

    this.options.data = extend(true, [], newData)

    this._genData()
    this._table.setOptions(this._treeData)
    this._graph.setOptions(this._treeData)
  }

  destory () {
    this._table && this._table.destory()
    this._graph && this._graph.destory()
  }

  render () {
    nextTick(() => {
      this._table.render()
      this._graph.render()
    })
  }
}

const instance = new Trace(document.body, {
  brushEnd () {},
  data: d,
})
instance.render()

const button = document.createElement('button')
button.innerHTML = 'tiggle'
document.body.appendChild(button)

const dataLength = d.length

button.addEventListener('click', () => {
  const data = d.slice(
    ...[Math.floor(Math.random() * dataLength), Math.floor(Math.random() * dataLength)].sort((a, b) => a - b),
  )
  console.log('newData:', data)
  instance.setOptions(data)
}, false)

export default Trace
