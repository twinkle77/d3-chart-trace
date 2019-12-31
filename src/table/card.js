import { addClass, getClass } from '../util/element'

export default class Card {
  constructor (data) {
    this.data = data
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
    const {
      spanID, operationName, startTime, duration,
    } = this.data

    const keyVal = [
      { key: 'SpanID', value: spanID },
      { key: 'OperationName', value: operationName },
      { key: 'Start Time', value: `${startTime}ms` },
      { key: 'Duration', value: `${duration}ms` },
    ]

    const hostEL = document.createElement('h2')
    hostEL.innerText = 'apigw-kong-internal.default.mesh.jdcloud.com:8000/*'
    hostEL.classList.add('host')
    oBody.appendChild(hostEL)

    const oUl = document.createElement('ul')
    addClass(oUl, getClass('info-list'))
    oBody.appendChild(oUl)

    keyVal.forEach(({ key, value }) => {
      const oLi = document.createElement('li')
      oLi.classList.add(key.toLowerCase().replace(/\s/, ''))
      oUl.appendChild(oLi)
      oLi.innerHTML = `
        <span class="label">${key}</span>: <span class="value">${value}</span>
      `
    })
  }

  destory () {
    this.data = null
    this.wrapper.parentNode.removeChild(this.wrapper)
  }
}
