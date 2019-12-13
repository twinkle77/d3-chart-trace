import d3 from '../d3'

export function isFunction (fn) {
  return typeof fn === 'function'
}

export function nextTick (fn) {
  setTimeout(() => {
    fn && fn()
  }, 0)
}

export function computedTimeRange (treeData) {
  const descendants = []
  treeData.forEach((rootNode) => {
    descendants.push(...rootNode.descendants())
  })
  return [
    d3.min(descendants, (node) => node.data.startTime),
    d3.max(descendants, (node) => node.data.endTime),
  ]
}
