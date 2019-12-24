import { addClass, getClass } from '../util/element'

export default class Card {
  constructor () {
    this.createFragment()
  }

  destory () {
    this.wrapper.parentNode.removeChild(this.wrapper)
  }

  createFragment () {
    const browsers = ['Firefox', 'Chrome', 'Opera',
      'Safari', 'Internet Explorer']

    const oFragment = document.createDocumentFragment()

    const oWrapper = document.createElement('div')
    addClass(oWrapper, getClass('card-wrapper'))

    // card-header
    const oHeader = document.createElement('div')
    addClass(oHeader, getClass('card-header'))
    oWrapper.appendChild(oHeader)

    // oHeader.innerText = ''

    // card-body
    const oBody = document.createElement('div')
    addClass(oBody, getClass('card-body'))
    oWrapper.appendChild(oBody)

    const oUl = document.createElement('ul')
    oBody.appendChild(oUl)

    browsers.forEach((text) => {
      const oLi = document.createElement('li')
      oUl.appendChild(oLi)
      oLi.innerText = text
    })

    oFragment.append(oWrapper)

    this.wrapper = oWrapper
    this.fragment = oFragment
  }
}
