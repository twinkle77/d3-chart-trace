import './assets/style.less'
import data from './data'
import view from './view/index'
import { query } from './util/element'
import { isFunction } from './util/tool'
import Graph from './graph/index'
import Table from './table/index'
import d3 from './d3'

class Trace {
  constructor (target = 'target', options = {}) {
    this._init(target)
    this._options = options
  }

  _init (target) {
    this._insertLayout(query(target))
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

  _brushEndHandler (selection, domain) {
    if (selection && domain && this._table) {
      this._table.resetRectWidth(domain, selection)
    }
    console.log(selection, domain)

    isFunction(this._options.brushEnd) && this._options.brushEnd(selection, domain)
  }

  _computedTimeRange () {
    return [
      d3.min(data, (d) => d.startTime),
      d3.max(data, (d) => d.endTime),
    ]
  }

  render () {
    const [minStartTime, maxEndTime] = this._computedTimeRange()
    this._table = new Table(this._tableWrapper, {
      data,
      timeRange: [minStartTime, maxEndTime],
    })
    this._table.render()

    const graph = new Graph(this._graphWrapper, {
      data,
      brushEnd: this._brushEndHandler.bind(this),
      timeRange: [minStartTime, maxEndTime],
    })
    graph.render()
  }
}

const instance = new Trace(document.body, {
  brushEnd () {},
})
instance.render()

export default Trace
