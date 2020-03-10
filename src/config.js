export default {
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
      barHeight: 6,
      margin: 6,
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
    paddingLeft: 4,
    tooltipTemplate (data) {
      const {
        spanID, operationName, startTime, duration, process,
      } = data
      return `
        <ul>
          <li><span class="label">SpanID: </span><span class="value">${spanID}</span></li>
          <li><span class="label">Service: </span><span class="value">${process.serviceName}</span></li>
          <li><span class="label">OperationName: </span><span class="value">${operationName}</span></li>
          <li><span class="label">Start Time: </span><span class="value">${startTime}ms</span></li>
          <li><span class="label">Duration: </span><span class="value">${duration}ms</span></li>
        </ul>
      `
    },
    infoTemplate (data) {
      const {
        spanID, startTime, duration, process,
      } = data
      return `
        <ul>
          <li><span class="label">SpanID: </span><span class="value">${spanID}</span></li>
          <li><span class="label">Service: </span><span class="value">${process.serviceName}</span></li>
          <li><span class="label">Start Time: </span><span class="value">${startTime}ms</span></li>
          <li><span class="label">Duration: </span><span class="value">${duration}ms</span></li>
        </ul>
      `
    },
  },
}
