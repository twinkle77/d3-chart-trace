import d3 from '@/d3'

/**
 * 功能：
 * 用于渲染页面的布局
 */
class View {
  constructor (className = 'd3-trace') {
    this._className = className
  }

  /**
   * 创建基础容器
   * @param {Element} target
   */
  createContainer (target) {
    const mainWrapper = d3
      .select(target)
      .append('div')
      .classed(this._getClass('wrapper'), true)

    const graphWrapper = mainWrapper
      .append('div')
      .classed(this._getClass('graph'), true)

    const traceWrapper = mainWrapper
      .append('div')
      .classed(this._getClass('table'), true)

    return {
      mainWrapper,
      graphWrapper,
      traceWrapper,
    }
  }

  createSvg (target) {
    return target
      .append('svg')
      .attr('width', '100%')
      // .attr('height', '120px')
  }

  createTableHeader () {

  }

  createTableBody () {

  }

  createTableRow () {

  }

  createTableCol () {

  }

  _getClass (className) {
    return `${this._className}-${className}`
  }
}

export default new View()
