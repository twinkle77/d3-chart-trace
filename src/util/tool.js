import d3 from '@/d3'

export function isFunction (fn) {
  return typeof fn === 'function'
}

export function isArray (arr) {
  return arr && arr instanceof Array
}

export function nextTick (fn) {
  setTimeout(() => {
    fn && fn()
  }, 0)
}

export function computedTimeRange (descendants) {
  return [
    d3.min(descendants, (node) => node.data.startTime),
    d3.max(descendants, (node) => node.data.endTime),
  ]
}
