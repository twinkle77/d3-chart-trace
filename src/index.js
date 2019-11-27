import { select, event } from 'd3-selection'
import { extent, max, min } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import { brushX } from 'd3-brush'
import d3 from '@/d3'
import data from './data'

import Axis from './graph/axis'
import Bar from './graph/bar'

import './assets/style.less'

import view from './view/index'

const target = document.body

const viewBox = [0, 0, 1000, 120]

const {
  mainWrapper,
  graphWrapper,
  traceWrapper,
} = view.createContainer(target)

mainWrapper
  .attr('style', 'width: 1200px; border: 1px solid blue; height: auto')

const svg = view
  .createSvg(graphWrapper)
  // .attr('viewBox', viewBox)

const axis = new Axis(svg)

axis
  .tickSize(0)
  .domain([1, 2])
  .range(1000)
  .render()


// const ext = extent(data, (d) => d.id)
// const minStartTime = min(data, (d) => d.startTime)
// const maxEndTime = max(data, (d) => d.endTime)

// const miniHeight = data.length * 12 + 50

// 线条数量
// const lineCount = data.length + 1
// const yScale = scaleLinear().domain([1, lineCount]).range([0, miniHeight])
// const xScale = scaleLinear().domain([minStartTime, maxEndTime]).range([0, 1000])

// console.log([minStartTime, maxEndTime])

const bar = new Bar(svg, {
  data,
  offset: {
    top: 25,
    left: 20,
  },
})

bar.render()

const miniG = svg
  .append('g')
  .attr('transform', `translate(${20}, ${20})`)
  // .attr('width', 1000)
  // .attr('height', miniHeight)
  // .attr('class', 'mini')

/**
 * 文字
 */
// miniG.append('g')
//   .selectAll('.ctext')
//   .data(data)
//   .enter()
//   .append('text')
//   .classed('ctext', true)
//   .text((d) => d.label)
//   .attr('x', -10)
//   .attr('y', (d, index) => yScale(index + 1 + 0.5))
//   .attr('dy', '0.5ex')
//   .attr('text-anchor', 'start')
//   .attr('style', 'font-size: 12px;')
//   .each(function computeWidth (n) {
//     n.textWidth = this.getComputedTextLength()
//   })

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

headerAxis
  .tickSize(0)
  .domain([1, 2])
  .range(1000)
  .render()

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
