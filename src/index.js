import { select } from 'd3-selection'
import Axis from './axis/index'


const svg = select(document.body)
  .append('svg')
  .attr('width', '100%')

const axis = new Axis(svg)

axis
  .tickSize(0)
  .domain([1, 2])
  .range(1000)
  .position('top')
  .render()

const data = [
  { id: 1, startTime: 20, endTime: 30 },
  { id: 2, startTime: 20, endTime: 30 },
  { id: 3, startTime: 20, endTime: 30 },
]

const miniHeight = data.length * 12 + 50

const miniG = svg
  .append('g')
  .attr('transform', `translate(${20}, ${20})`)
  .attr('width', 1000)
  .attr('height', miniHeight)
  .attr('class', 'mini')
  // http://bl.ocks.org/bunkat/1962173


export default {
  Axis,
}
