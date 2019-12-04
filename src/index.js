import './assets/style.less'
import data from './data'
import view from './view/index'
import { query } from './util/element'
import { isFunction } from './util/tool'
import Graph from './graph/index'
import Table from './table/index'

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
    isFunction(this._options.brushEnd) && this._options.brushEnd(selection, domain)
  }

  render () {
    const table = new Table(this._tableWrapper, {
      data,
    })
    table.render()

    const graph = new Graph(this._graphWrapper, {
      data,
      brushEnd: this._brushEndHandler.bind(this),
    })
    graph.render()
  }
}

const instance = new Trace(document.body, {
  brushEnd (selection, domain) {
    console.log(selection, domain)
  },
})
instance.render()

export default Trace
