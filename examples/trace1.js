const traceData1 = [
  {
    "traceID": "39ff805833f848b0",
    "spanID": "39ff805833f848b0",
    "flags": 1,
    "operationName": "getServerHappyDay",
    "references": [

    ],
    "startTime": 0,
    "duration": 6.626,
    "tags": [
      {
        "key": "http.status_code",
        "type": "int64",
        "value": "200",
        "typ": "int64"
      },
      {
        "key": "component",
        "type": "string",
        "value": "java-web-servlet",
        "typ": "string"
      },
      {
        "key": "span.kind",
        "type": "string",
        "value": "server",
        "typ": "string"
      },
      {
        "key": "sampler.type",
        "type": "string",
        "value": "probabilistic",
        "typ": "string"
      },
      {
        "key": "sampler.param",
        "type": "float64",
        "value": "1",
        "typ": "float64"
      },
      {
        "key": "http.url",
        "type": "string",
        "value": "http://127.0.0.1:6666/autotest/request/server1/getIp",
        "typ": "string"
      },
      {
        "key": "http.method",
        "type": "string",
        "value": "GET",
        "typ": "string"
      }
    ],
    "logs": [
      {
        "timestamp": 1582598213103000,
        "fields": [
          {
            "key": "handler.class_simple_name",
            "type": "string",
            "value": "AutoController",
            "typ": "string"
          },
          {
            "key": "handler",
            "type": "string",
            "value": "publicjava.lang.Stringcom.jdcloud.demo.client.controller.AutoController.getServerHappyDay(java.lang.String)",
            "typ": "string"
          },
          {
            "key": "event",
            "type": "string",
            "value": "preHandle",
            "typ": "string"
          },
          {
            "key": "handler.method_name",
            "type": "string",
            "value": "getServerHappyDay",
            "typ": "string"
          }
        ]
      },
      {
        "timestamp": 1582598213110000,
        "fields": [
          {
            "key": "event",
            "type": "string",
            "value": "afterCompletion",
            "typ": "string"
          },
          {
            "key": "handler",
            "type": "string",
            "value": "publicjava.lang.Stringcom.jdcloud.demo.client.controller.AutoController.getServerHappyDay(java.lang.String)",
            "typ": "string"
          }
        ]
      }
    ],
    "warnings": null,
    "process": {
      "serviceName": "jdsf-client",
      "tags": [
        {
          "key": "hostname",
          "type": "string",
          "value": "load2",
          "typ": "string"
        },
        {
          "key": "jaeger.version",
          "type": "string",
          "value": "Java-0.32.0",
          "typ": "string"
        },
        {
          "key": "ip",
          "type": "string",
          "value": "10.0.0.233",
          "typ": "string"
        }
      ]
    },
    "children": [
      {
        "traceID": "39ff805833f848b0",
        "spanID": "43cdf142f7ca8693",
        "flags": 1,
        "operationName": "GET",
        "references": [
          {
            "refType": "CHILD_OF",
            "traceID": "39ff805833f848b0",
            "spanID": "39ff805833f848b0"
          }
        ],
        "startTime": 2.015,
        "duration": 2.596,
        "tags": [
          {
            "key": "http.status_code",
            "type": "int64",
            "value": "200",
            "typ": "int64"
          },
          {
            "key": "http.url",
            "type": "string",
            "value": "http://10.0.0.62:8888/autotest/server/getIp",
            "typ": "string"
          },
          {
            "key": "component",
            "type": "string",
            "value": "feign",
            "typ": "string"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "client",
            "typ": "string"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET",
            "typ": "string"
          }
        ],
        "logs": [

        ],
        "warnings": null,
        "process": {
          "serviceName": "jdsf-client",
          "tags": [
            {
              "key": "hostname",
              "type": "string",
              "value": "load2",
              "typ": "string"
            },
            {
              "key": "jaeger.version",
              "type": "string",
              "value": "Java-0.32.0",
              "typ": "string"
            },
            {
              "key": "ip",
              "type": "string",
              "value": "10.0.0.233",
              "typ": "string"
            }
          ]
        },
        "children": [
          {
            "traceID": "39ff805833f848b0",
            "spanID": "fd15ab705db2d1bc",
            "flags": 1,
            "operationName": "getIp",
            "references": [
              {
                "refType": "CHILD_OF",
                "traceID": "39ff805833f848b0",
                "spanID": "43cdf142f7ca8693"
              }
            ],
            "startTime": 2.7505,
            "duration": 1.125,
            "tags": [
              {
                "key": "http.status_code",
                "type": "int64",
                "value": "200",
                "typ": "int64"
              },
              {
                "key": "http.url",
                "type": "string",
                "value": "http://10.0.0.62:8888/autotest/server/getIp",
                "typ": "string"
              },
              {
                "key": "component",
                "type": "string",
                "value": "java-web-servlet",
                "typ": "string"
              },
              {
                "key": "span.kind",
                "type": "string",
                "value": "server",
                "typ": "string"
              },
              {
                "key": "http.method",
                "type": "string",
                "value": "GET",
                "typ": "string"
              }
            ],
            "logs": [
              {
                "timestamp": 1582598213523000,
                "fields": [
                  {
                    "key": "handler.class_simple_name",
                    "type": "string",
                    "value": "AutoController",
                    "typ": "string"
                  },
                  {
                    "key": "handler",
                    "type": "string",
                    "value": "publicjava.lang.Stringcom.jdcloud.demo.server.controller.AutoController.getIp() throwsjava.lang.Exception",
                    "typ": "string"
                  },
                  {
                    "key": "event",
                    "type": "string",
                    "value": "preHandle",
                    "typ": "string"
                  },
                  {
                    "key": "handler.method_name",
                    "type": "string",
                    "value": "getIp",
                    "typ": "string"
                  }
                ]
              },
              {
                "timestamp": 1582598213524000,
                "fields": [
                  {
                    "key": "event",
                    "type": "string",
                    "value": "afterCompletion",
                    "typ": "string"
                  },
                  {
                    "key": "handler",
                    "type": "string",
                    "value": "publicjava.lang.Stringcom.jdcloud.demo.server.controller.AutoController.getIp() throwsjava.lang.Exception",
                    "typ": "string"
                  }
                ]
              }
            ],
            "warnings": null,
            "process": {
              "serviceName": "jdsf-server1",
              "tags": [
                {
                  "key": "jaeger.version",
                  "type": "string",
                  "value": "Java-0.32.0",
                  "typ": "string"
                }
              ]
            },
            "children": [

            ],
            "endTime": 3.8755
          }
        ],
        "endTime": 4.611000000000001
      }
    ],
    "endTime": 6.626
  }
]
