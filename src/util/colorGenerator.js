
const colors = ['#edc949', '#bab0ab', '#76b7b2', '#4e79a7', '#9c755f', '#59a14f', '#ff9da7', '#af7aa1', '#e15759', '#f28e2c']

function toRgb (str) {
  if (!str || str.length !== 7) {
    return [0, 0, 0]
  }
  const r = str.slice(1, 3)
  const g = str.slice(3, 5)
  const b = str.slice(5)
  return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)]
}

class ColorGenerator {
  static create () {
    return new ColorGenerator()
  }

  constructor () {
    this.hexColors = colors
    this.rgbColors = colors.map(toRgb)
    this.cache = new Map()
    this.curIndex = 0
  }

  _getColorIndex (id) {
    let index = this.cache.get(id)
    if (index == null) {
      index = this.curIndex
      this.cache.set(id, index)
      this.curIndex = (this.curIndex = this.curIndex + 1) % this.hexColors.length
    }
    return index
  }

  getRgbColor (id) {
    return this.rgbColors[this._getColorIndex(id)]
  }

  getHexColor (id) {
    return this.hexColors[this._getColorIndex(id)]
  }

  clear () {
    this.cache.clear()
    this.curIndex = 0
  }
}

export default ColorGenerator.create()
