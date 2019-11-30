/* eslint-disable class-methods-use-this */
import d3 from '@/d3'
import { getClass } from '../util/element'

/**
 * 功能：
 * 用于构造布局
 */
class View {
  /**
   * 创建基础容器
   * @param {Element} target
   */
  createContainer (target) {
    const mainWrapper = d3
      .select(target)
      .append('div')
      .classed(getClass('wrapper'), true)

    const graphWrapper = mainWrapper
      .append('div')
      .classed(getClass('graph'), true)

    const traceWrapper = mainWrapper
      .append('div')
      .classed(getClass('table'), true)

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
}

export default new View()
