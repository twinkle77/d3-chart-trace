import data from './data'

import Axis from './graph/axis'
import Bar from './graph/bar'

import './assets/style.less'

import view from './view/index'

import { getElementRect } from './util/element'

const target = document.body

const {
  mainWrapper,
  graphWrapper,
} = view.createContainer(target)

/**
 * 插入画布
 */
const svg = view
  .createSvg(graphWrapper)

/**
 * 初始化axis图
 */
const axis = new Axis(svg)

axis
  .tickSize(0)
  .domain([1, 2])
  .range(1000)

/**
 * 初始化bar图
 */
const bar = new Bar(svg, {
  data,
  offset: {
    top: 20,
    left: 0,
  },
})

function setup () {
  /**
   * 以target节点的宽度做为svg的宽度
   */
  const SVG_WIDTH = getElementRect(mainWrapper.node()).width

  axis
    .render()
  const AXIS_HEIGHT = 20

  bar.render({
    chartWidth: SVG_WIDTH,
  })
  const BAR_TOTOL_HEIGHT = bar.chartHeight

  /** axis图 和 graph图 渲染完成后再设置svg的长度 */
  svg
    .attr('width', SVG_WIDTH)
    .attr('height', AXIS_HEIGHT + BAR_TOTOL_HEIGHT)
}

setup()

window.addEventListener('resize', () => {
  setup()
})

// const miniG = svg
//   .append('g')
//   .attr('transform', `translate(${20}, ${20})`)
// .attr('width', 1000)
// .attr('height', miniHeight)
// .attr('class', 'mini')


// const maxTextWidth = max(data, (d) => d.textWidth)

/**
 * 线条
 */
// const lineWrapper = miniG.append('g')
//   .attr('transform', `translate(${maxTextWidth}, 0)`)

// lineWrapper
//   .selectAll('.lines')
//   .data(new Array(lineCount))
//   .enter()
//   .append('line')
//   .classed('lines', true)
//   .attr('x1', 0)
//   .attr('y1', (d, index) => yScale(index + 1) + 0.5)
//   .attr('x2', 1000)
//   .attr('y2', (d, index) => yScale(index + 1) + 0.5)
//   .attr('stroke', 'lightgray')

/**
 * 矩形绘制
 */
// miniG.append('g')
//   .attr('transform', `translate(${maxTextWidth}, 0)`)
//   .selectAll('.crect')
//   .data(data)
//   .enter()
//   .append('rect')
//   .classed('crect', true)
//   .attr('x', (d) => xScale(d.startTime))
//   .attr('y', (d, index) => yScale(index + 1 + 0.5) + 0.5 - 12 / 2)
//   .attr('width', (d) => xScale(d.endTime) - xScale(d.startTime))
//   .attr('height', 12)

/**
 * 刷子
 */

// function brushHandler () {
//   console.log('brushHandler')
//   console.log(event.selection)
//   console.log(event.selection.map(xScale.invert))
// }

// const brushInstance = brushX()
//   .extent([[0, 0], [1000, miniHeight]])
//   // .on('brush', brushHandler)
//   .on('end', brushHandler)

// miniG.append('g')
//   .attr('transform', `translate(${maxTextWidth}, 0)`)
//   .attr('class', 'x brush')
//   .attr('width', 1000)
//   .call(brushInstance)
//   .selectAll('rect')

/**  render header start */
const headerWrapper = mainWrapper.append('div')
  .classed('view-header', true)
/**  render header end */

function renderRow (container) {
  container
    .classed('trace-row', true)

  const leftCol = container
    .append('div')
    .classed('trace-left-col', true)
    // .text('table-left')

  const rightCol = container
    .append('div')
    .classed('trace-right-col', true)
  return {
    leftCol,
    rightCol,
  }
}

// const { leftCol, rightCol } = renderRow(headerWrapper)

// const headerAxisWrapper = rightCol
//   .append('svg')
//   .attr('width', '100%')
//   .attr('height', '100%')

// const headerAxis = new Axis(headerAxisWrapper)

// headerAxis
//   .tickSize(0)
//   .domain([1, 2])
//   .range(1000)
//   .render()

/** render body start */

function renderBody (spans) {
  for (let i = 0; i < spans.length; i++) {
    const { leftCol, rightCol } = renderRow(
      mainWrapper.append('div'),
    )

    leftCol
      .classed('left-col-span', true)

    leftCol


    const btnWrapper = leftCol
      .append('div')

    btnWrapper
      .append('button')
      .text('^')

    btnWrapper
      .append('a')
      .text(spans[i].label)
      .attr('style', `margin-left: ${spans[i].deep * 40}px `)

    if (spans[i].children && spans[i].children.length) {
      renderBody(spans[i].children)
    }
  }
}

// renderBody(data)

export default {
  Axis,
}
