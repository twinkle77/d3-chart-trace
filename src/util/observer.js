import { ResizeObserver as Polyfill } from '@juggle/resize-observer'

const ResizeObserver = window.ResizeObserver || Polyfill

export default class Observer {
  constructor (fn) {
    this.resizeObserver = new ResizeObserver(
      () => {
        fn && fn()
      },
    )
  }

  observe (target) {
    this.resizeObserver.observe(target)
  }

  disconnect () {
    this.resizeObserver.disconnect()
  }
}
