import './assets/style.less'
import data from './data'
import view from './view/index'
import { query } from './util/element'
import Graph from './graph/index'
import Table from './table/index'

class Trace {
  constructor (target = 'target') {
    this._init(target)
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

  render () {
    const table = new Table(this._tableWrapper, {
      data,
    })
    table.render()

    const graph = new Graph(this._graphWrapper, {
      data,
    })
    graph.render()
  }
}

const instance = new Trace(document.body)
instance.render()

export default Trace
