export default class Collapse {
  constructor (target, options) {
    this.target = target
    this.options = options
    this._init()

    this.visible = false
    this.iconFontClass = ['icon-arrowsfuben', 'icon-arrow2fuben']
  }

  _init () {
    this._insertTemplate()

    this.headerElement = this.target.querySelector('.collapse-header')
    this.iconElement = this.target.querySelector('.iconfont')
    this.bodyElement = this.target.querySelector('.collapse-body')

    if (!this.options.template) {
      this.options.customBodyFunc && this.options.customBodyFunc(this.bodyElement)
    }

    this._bindEvent()
  }

  _insertTemplate () {
    const { title, template } = this.options
    this.target.innerHTML = `
      <div class="collapse">
        <div class="collapse-header">
          <i class="iconfont icon-arrow2fuben"></i>
          <span class="title">${title}</span>
        </div>
        <div class="collapse-body" style="display: none;">
          ${template || ''}
        </div>
      </div>
    `
  }

  _bindEvent () {
    this.headerElement.addEventListener('click', () => {
      this.toggleHandler()
    }, false)
  }

  toggleHandler () {
    this.visible = !this.visible
    this.bodyElement.style.display = this.visible ? 'block' : 'none'
    this.iconFontClass = this.iconFontClass.reverse()
    this.iconElement.classList.replace(...this.iconFontClass)
  }

  destory () {
    this.data = null
    this.headerElement.removeEventListener('click', this.toggleHandler, false)
  }
}
