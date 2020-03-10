import './assets/style.less'
import extend from 'extend'
import view from './util/view'
import { query } from './util/element'
import { isFunction, nextTick, isArray } from './util/tool'
import Graph from './graph/index'
import Table from './table/index'
import d3 from './d3'
import { warn } from './util/debug'
import Event from './util/event'
import Observer from './util/observer'

class Trace {
  constructor (target = 'target', options = {}) {
    if (!options.data || (isArray(options.data) && options.data.length === 0)) {
      return warn('数据格式不符合！')
    }

    this.options = extend(true, {}, options)

    this._init(target)
  }

  _init (target) {
    this._insertLayout(query(target))

    this.event = new Event()

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
    this._table = new Table(this._tableWrapper, {
      treeData: this._treeData,
      event: this.event,
      table: this.options.table,
    })

    this._graph = new Graph(this._graphWrapper, {
      treeData: this._treeData,
      brushEnd: this._brushEndHandler.bind(this),
      event: this.event,
      ...this.options.graph,
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

  _observeMainWrapper (target) {
    this.observer = new Observer(() => {
      this.event.emit('RE_RENDER')
    })
    this.observer.observe(target)
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

  // eslint-disable-next-line consistent-return
  setOptions (newData) {
    if (!newData || (isArray(newData) && newData.length === 0)) {
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
    this.observer && this.observer.disconnect()
    this.event.off()
    this.event = null
  }

  render () {
    nextTick(() => {
      this._table && this._table.render()
      this._graph && this._graph.render()
      this._observeMainWrapper(this._mainWrapper.node())
    })
  }
}

export default Trace
