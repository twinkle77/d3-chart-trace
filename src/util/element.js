
import { warn } from './debug'

/**
 * dom元素查找
 * @param {string | Element} el
 */
export function query (el) {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(`Cannot find element: ${el}`)
      const oDiv = document.createElement('div')
      oDiv.setAttribute('class', `d3-trace-${el}`)
      document.body.appendChild(oDiv)
      return oDiv
    }
    return selected
  }
  return el
}

/**
 * 获取元素相对于视口的位置、宽高
 * @param {Elment} el
 */
export function getElementRect (el) {
  const elRect = el.getBoundingClientRect()
  return {
    left: elRect.left,
    top: elRect.top,
    right: elRect.right,
    bottom: elRect.bottom,
    width: elRect.width || elRect.right - elRect.left,
    height: elRect.height || elRect.bottom - elRect.top,
  }
}

const PREFIX = 'd3-trace'
export function getClass (className) {
  return `${PREFIX}-${className}`
}

export function getViewportInfo () {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  }
}
