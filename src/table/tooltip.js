import { event } from 'd3-selection'
import offset from 'document-offset'
import { getClass } from '../util/element'
import d3 from '../d3'

let count = 0

export default class Tooltip {
  constructor () {
    this.$el = d3
      .select('body')
      .append('div')
      .attr('class', `${getClass('tooltip')} ${getClass(`tooltip${count}`)}`)

    this.dir = 'RIGHT'

    count += 1
  }

  show () {
    this.$el
      .transition()
      .duration(200)
      .style('opacity', 1)

    if (this.dir.toUpperCase() === 'RIGHT') {
      this.dirRight()
    }

    return this
  }

  hide () {
    this.$el
      // .transition()
      // .duration(500)
      .style('opacity', 0)
      .style('left', '-900px')

    return this
  }


  _getEventTargetRect () {
    const { target } = event

    return {
      ...offset(target),
      width: target.offsetWidth,
      height: target.offsetHeight,
    }
  }

  _getTooltipRect () {
    const tooltipEl = this.$el.node()
    return {
      width: tooltipEl.offsetWidth,
      height: tooltipEl.offsetHeight,
    }
  }

  dirRight () {
    this.$el.classed('left', true)

    const targetRect = this._getEventTargetRect()
    const tooltipRect = this._getTooltipRect()

    this.$el
      .style('left', `${targetRect.left + targetRect.width}px`)
      .style('top', `${targetRect.top + targetRect.height / 2 - tooltipRect.height / 2}px`)

    return this
  }

  html (html) {
    this.$el.html(html)
    return this
  }

  style (name, value) {
    if (arguments.length < 2 && typeof name === 'string') {
      return this.$el.style(name)
    }
    this.$el.style(name, value)
    return this
  }

  attr (name, value) {
    if (arguments.length < 2 && typeof name === 'string') {
      return this.$el.attr(name)
    }
    this.$el.attr(name, value)
    return this
  }

  offset (offsetObject) {
    if (!arguments.length) return this.offset
    this.offset = offsetObject
    return this
  }

  direction (dir) {
    if (!arguments.length) return this.dir
    this.dir = dir
    return this
  }

  destory () {
    this.$el.remove()
    this.$el = null
  }
}
