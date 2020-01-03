import { addClass, getClass } from '../util/element'

export default class Card {
  constructor (data, templateFunction) {
    this.data = data
    this.templateFunction = templateFunction
    this.createFragment()
  }

  createFragment () {
    const oFragment = document.createDocumentFragment()

    const oWrapper = document.createElement('div')
    addClass(oWrapper, getClass('card-wrapper'))

    // card-header
    const oHeader = document.createElement('div')
    addClass(oHeader, getClass('card-header'))
    oWrapper.appendChild(oHeader)
    // card-body
    const oBody = document.createElement('div')
    addClass(oBody, getClass('card-body'))
    oWrapper.appendChild(oBody)

    this._renderBaseInfo(oBody)

    oFragment.append(oWrapper)

    this.wrapper = oWrapper
    this.fragment = oFragment
  }

  _renderBaseInfo (oBody) {
    const hostEL = document.createElement('h2')
    hostEL.innerText = this.data.operationName
    hostEL.classList.add('host')
    oBody.appendChild(hostEL)

    const oDiv = document.createElement('div')

    oDiv.innerHTML = this.templateFunction(this.data)
    addClass(oDiv, getClass('info-list'))
    oBody.appendChild(oDiv)
  }

  destory () {
    this.data = null
    this.wrapper.parentNode.removeChild(this.wrapper)
  }
}
