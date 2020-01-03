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
    paddingLeft: 4,
    infoTemplate (data) {
      const {
        spanID, operationName, startTime, duration,
      } = data
      return `
        <ul>
          <li><span class="label">SpanID: </span><span>${spanID}</span></li>
          <li><span class="label">OperationName: </span><span>${operationName}</span></li>
          <li><span class="label">Start Time: </span><span>${startTime}ms</span></li>
          <li><span class="label">Duration: </span><span>${duration}ms</span></li>
        </ul>
      `
    },
  },
}
