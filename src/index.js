import { select } from 'd3-selection'
import Axis from './axis/index'


const svg = select(document.body)
  .append('svg')
  .attr('width', '100%')

console.log(svg)

const axis = new Axis(svg)

axis
  .tickSize(0)
  .domain([1, 2])
  .range(1000)
  .render()


export default {
  Axis,
}
