import { select, event } from 'd3-selection'
import { extent, max, min } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import { brushX } from 'd3-brush'

import Axis from './axis/index'

const svg = select(document.body)
  .append('svg')
  .attr('width', '100%')
  // .attr('viewBox', [0, 0, 1000, 120])

const axis = new Axis(svg)

axis
  .tickSize(0)
  .domain([1, 2])
  .range(1000)
  .render()

const data = [
  {
    id: 1, startTime: 20, endTime: 30, label: 'haha',
  },
  {
    id: 2, startTime: 21, endTime: 33, label: 'haha1',
  },
  {
    id: 3, startTime: 22, endTime: 31, label: 'hah2',
  },
]

const ext = extent(data, (d) => d.id)
const minStartTime = min(data, (d) => d.startTime)
const maxEndTime = max(data, (d) => d.endTime)

const miniHeight = data.length * 12 + 50

// 线条数量
const lineCount = data.length + 1
const yScale = scaleLinear().domain([1, lineCount]).range([0, miniHeight])
const xScale = scaleLinear().domain([minStartTime, maxEndTime]).range([0, 1000])

console.log([minStartTime, maxEndTime])

const miniG = svg
  .append('g')
  .attr('transform', `translate(${20}, ${20})`)
  .attr('width', 1000)
  .attr('height', miniHeight)
  .attr('class', 'mini')

/**
 * 文字
 */
miniG.append('g')
  .selectAll('.ctext')
  .data(data)
  .enter()
  .append('text')
  .classed('ctext', true)
  .text((d) => d.label)
  .attr('x', -10)
  .attr('y', (d, index) => yScale(index + 1 + 0.5))
  .attr('dy', '0.5ex')
  .attr('text-anchor', 'start')
  .attr('style', 'font-size: 12px;')
  .each(function computeWidth (n) {
    n.textWidth = this.getComputedTextLength()
  })

const maxTextWidth = max(data, (d) => d.textWidth)

/**
 * 线条
 */
const lineWrapper = miniG.append('g')
  .attr('transform', `translate(${maxTextWidth}, 0)`)

lineWrapper
  .selectAll('.lines')
  .data(new Array(lineCount))
  .enter()
  .append('line')
  .classed('lines', true)
  .attr('x1', 0)
  .attr('y1', (d, index) => yScale(index + 1) + 0.5)
  .attr('x2', 1000)
  .attr('y2', (d, index) => yScale(index + 1) + 0.5)
  .attr('stroke', 'lightgray')

/**
 * 矩形绘制
 */
miniG.append('g')
  .attr('transform', `translate(${maxTextWidth}, 0)`)
  .selectAll('.crect')
  .data(data)
  .enter()
  .append('rect')
  .classed('crect', true)
  .attr('x', (d) => xScale(d.startTime))
  .attr('y', (d, index) => yScale(index + 1 + 0.5) + 0.5 - 12 / 2)
  .attr('width', (d) => xScale(d.endTime) - xScale(d.startTime))
  .attr('height', 12)

/**
 * 刷子
 */

function brushHandler () {
  console.log('brushHandler')
  console.log(event.selection)
  console.log(event.selection.map(xScale.invert))
}

const brushInstance = brushX()
  .extent([[0, 0], [1000, miniHeight]])
  // .on('brush', brushHandler)
  .on('end', brushHandler)

miniG.append('g')
  .attr('transform', `translate(${maxTextWidth}, 0)`)
  .attr('class', 'x brush')
  .attr('width', 1000)
  .call(brushInstance)
  .selectAll('rect')


export default {
  Axis,
}
