import './assets/style.less'
import extend from 'extend'
import view from './view/index'
import { query } from './util/element'
import { isFunction, nextTick, isArray } from './util/tool'
import Graph from './graph/index'
import Table from './table/index'
import d3 from './d3'
import { warn } from './util/debug'
import traceData from './trace'
import EventBus from './eventBus'

const { spans } = traceData.result

let number = 0

function transformData (spansData) {
  // eslint-disable-next-line no-shadow
  let spans = spansData

  const count = Math.floor(Math.random() * 10)

  for (let i = 0; i < count; i += 1) {
    spans = spans.concat(spansData)
  }

  if (number % 3 === 0) {
    spans = spansData
  }

  spans = JSON.parse(JSON.stringify(spans))
  number += 1

  if (!spans.length) return []


  let rootNode = null
  let minStartTime = spans[0].startTime

  for (let i = 0; i < spans.length; i += 1) {
    const span = spans[i]
    span.children = []

    minStartTime = Math.min(span.startTime, minStartTime)

    // 父节点
    if (!rootNode && span.traceID === span.spanID) {
      rootNode = span
    }

    for (let j = 0; j < span.references.length; j += 1) {
      const { spanID } = span.references[j]
      const targetSpan = spans.find((item) => item.spanID === spanID)
      if (!targetSpan) {
        break
      }
      // if (!targetSpan.children) {
      //   targetSpan.children = []
      // }
      targetSpan.children.push(span)
    }
  }

  for (let i = 0; i < spans.length; i += 1) {
    const span = spans[i]
    span.startTime -= minStartTime
    span.startTime /= 1000
    span.endTime = span.startTime + span.duration
  }
  return [rootNode]
}

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

    this.eventBus = new EventBus()

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
      eventBus: this.eventBus,
      table: this.options.table,
    })

    this._graph = new Graph(this._graphWrapper, {
      treeData: this._treeData,
      brushEnd: this._brushEndHandler.bind(this),
      eventBus: this.eventBus,
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
    this.eventBus.off()
    this.eventBus = null
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
  data: transformData(spans),
})
instance.render()

const button = document.createElement('button')
button.innerHTML = 'Data driven'
document.body.appendChild(button)

button.addEventListener('click', () => {
  instance.setOptions(transformData(spans))
}, false)

export default Trace
