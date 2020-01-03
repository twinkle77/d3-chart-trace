import { addClass, getClass } from '../util/element'
import Collapse from './collapse'

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

    this._renderCollapse(oBody)

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

  _renderCollapse (oBody) {
    const collapseContainer = document.createElement('div')

    collapseContainer.classList.add(getClass('collapse'))
    oBody.appendChild(collapseContainer)

    const tagsCol = document.createElement('div')
    tagsCol.classList.add('collapse-tags')
    this.tagsColInstance = new Collapse(tagsCol, {
      title: 'Tags',
      template: this._getTagsTemplate(),
    })

    const processCol = document.createElement('div')
    processCol.classList.add('collapse-process')
    this.processColInsance = new Collapse(processCol, {
      title: 'Process',
      template: this._getProcessTemplate(),
    })

    const logsCol = document.createElement('div')
    logsCol.classList.add('collapse-logs')
    this.logColInstance = new Collapse(logsCol, {
      title: 'Logs',
    });

    [tagsCol, processCol, logsCol].forEach((el) => {
      el.classList.add('collapse-item')
      collapseContainer.appendChild(el)
    })
  }

  _getTagsTemplate () {
    const { tags } = this.data
    if (!tags || tags.length === 0) return false
    return `
      <table>
        <tbody>
          ${tags.map(({ key, value }) => `<tr><td class="label-td">${key}</td><td class="value-td">${value}</td></tr>`).join('')}
        </tbody>
      </table>
    `
  }

  _getProcessTemplate () {
    const { process } = this.data
    if (!process) return false
    const { tags } = process
    if (!tags || tags.length === 0) return false
    return `
      <table>
        <tbody>
          ${tags.map(({ key, value }) => `<tr><td class="label-td">${key}</td><td class="value-td">${value}</td></tr>`).join('')}
        </tbody>
      </table>
    `
  }

  destory () {
    this.data = null
    this.wrapper.parentNode.removeChild(this.wrapper)
    this.tagsColInstance.destory()
    this.processColInsance.destory()
    this.logColInstance.destory()
  }
}
