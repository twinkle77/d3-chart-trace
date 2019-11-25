const PREFIX = 'd3-trace'

function getClass (className) {
  return `${PREFIX}-${className}`
}

export const AXIS_SVG = getClass('axis-svg')
