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

    const tableWrapper = mainWrapper
      .append('div')
      .classed(getClass('table'), true)

    return {
      mainWrapper,
      graphWrapper,
      tableWrapper,
    }
  }

  createSvg (target) {
    return target
      .append('svg')
      .attr('width', '100%')
  }

  createTableHeader (target) {
    return target
      .append('div')
      .classed(getClass('table-header'), true)
  }

  createTableBody (target) {
    return target
      .append('div')
      .classed(getClass('table-body'), true)
  }

  createTableRow (target) {
    const rowEl = target
      .append('div')
      .classed(getClass('table-row'), true)
    const leftCol = rowEl
      .append('div')
      .classed(getClass('table-left-col'), true)
      .classed(getClass('table-col'), true)
    const rightCol = rowEl
      .append('div')
      .classed(getClass('table-right-col table-col'), true)
      .classed(getClass('table-col'), true)
    return {
      leftCol,
      rightCol,
      row: rowEl,
    }
  }

  // createSpan (target) {
  //   return target
  //     .append('span')
  //     .classed(getClass('text'), true)
  // }
}

export default new View()
