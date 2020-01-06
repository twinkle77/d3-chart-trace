<h1 align="center">Welcome to d3-trace 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/twinkle77/d3-trace#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/twinkle77/d3-trace/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/twinkle77/d3-trace/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/twinkle77/d3-trace" />
  </a>
</p>

> 用于描述请求调用关系的图

### 🏠 [Homepage](https://github.com/twinkle77/d3-trace#readme)

## Install

```sh
yarn add d3-trace
```

## Usage

```javascript
import Trace from 'd3-trace'
const instance = new Trace(document.body, {
  brushEnd () {},
  data,
})

// render
instance.render()

// destory
instance.destory()

// update
instance.setOptions(newData)
```

[Default configuration](https://github.com/twinkle77/d3-trace)

```javascript
{
  graph: {
    axis: {
      offset: {
        top: 20,
        left: 0,
        right: 0,
        bottom: 0,
      },
      tickPadding: 3,
      tickCount: 4,
      tickSize: 5,
      pos: 'TOP',
    },
    bar: {
      offset: {
        top: 20,
        left: 0,
      },
      barHeight: 5,
      margin: 4,
    },
    brush: {
      offset: {
        top: 20,
        left: 0,
      },
    },
  },
  table: {
    rowHeight: 30,
    rectHeight: 12,
    paddingLeft: 2,
    tooltipTemplate (data) {}
    infoTemplate (data) {}
  }
}
```

[Data structure](https://github.com/twinkle77/d3-trace/blob/master/examples/trace.js)

## Author

👤 **twinkle77**

* Github: [@twinkle77](https://github.com/twinkle77)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/twinkle77/d3-trace/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [twinkle77](https://github.com/twinkle77).<br />
This project is [ISC](https://github.com/twinkle77/d3-trace/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
