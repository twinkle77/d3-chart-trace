export default {
  requestId: 'bp0u642doht8co08k1ckhqt747mm1e6w',
  result: {
    traceID: '98b12c0ddcfeede1',
    spans: [
      {
        traceID: '98b12c0ddcfeede1',
        spanID: '98b12c0ddcfeede1',
        flags: 1,
        operationName: 'getServer',
        references: [],
        startTime: 1577088206749000,
        duration: 13405,
        tags: [
          {
            key: 'http.status_code',
            type: 'int64',
            value: '200',
            typ: 'int64',
          },
          {
            key: 'component',
            type: 'string',
            value: 'java-web-servlet',
            typ: 'string',
          },
          {
            key: 'span.kind',
            type: 'string',
            value: 'server',
            typ: 'string',
          },
          {
            key: 'sampler.type',
            type: 'string',
            value: 'probabilistic',
            typ: 'string',
          },
          {
            key: 'sampler.param',
            type: 'float64',
            value: '1',
            typ: 'float64',
          },
          {
            key: 'http.url',
            type: 'string',
            value: 'http://10.226.233.120:6666/request/server1',
            typ: 'string',
          },
          {
            key: 'http.method',
            type: 'string',
            value: 'POST',
            typ: 'string',
          },
        ],
        logs: [
          {
            timestamp: 1577088206749000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Bound request context to thread: org.apache.catalina.connector.RequestFacade@1799a52',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206749000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: "DispatcherServlet with name 'dispatcherServlet' processing POST request for [/request/server1]",
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.web.servlet.DispatcherServlet',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206749000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Looking up handler method for path /request/server1',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.boot.actuate.endpoint.web.servlet.WebMvcEndpointHandlerMapping',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206750000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Did not find handler method for [/request/server1]',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.boot.actuate.endpoint.web.servlet.WebMvcEndpointHandlerMapping',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206750000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Looking up handler method for path /request/server1',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.boot.actuate.endpoint.web.servlet.ControllerEndpointHandlerMapping',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206750000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Did not find handler method for [/request/server1]',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.boot.actuate.endpoint.web.servlet.ControllerEndpointHandlerMapping',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206750000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Looking up handler method for path /request/server1',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206750000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Returning handler method [public java.lang.String com.jdcloud.demo.client.controller.ClientController.getServer()]',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206750000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: "Returning cached instance of singleton bean 'clientController'",
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.beans.factory.support.DefaultListableBeanFactory',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206750000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: '[JDSF] request:<url-http://10.226.233.120:6666/request/server1,method-POST>',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'INFO',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'com.jdcloud.jdsf.auth.filter.JdsfAuthInterceptor',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206750000,
            fields: [
              {
                key: 'handler.class_simple_name',
                type: 'string',
                value: 'ClientController',
                typ: 'string',
              },
              {
                key: 'handler',
                type: 'string',
                value: 'public java.lang.String com.jdcloud.demo.client.controller.ClientController.getServer()',
                typ: 'string',
              },
              {
                key: 'event',
                type: 'string',
                value: 'preHandle',
                typ: 'string',
              },
              {
                key: 'handler.method_name',
                type: 'string',
                value: 'getServer',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206751000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Load balancer: remote service [jdsf-server-trace1], remote interface [/server/jdsf-server1], remote method is  [POST]',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'WARN',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'com.jdcloud.jdsf.core.api.feign.JdsfFeignLoadBalancerClient',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206751000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: "Returning cached instance of singleton bean 'ribbonClientConfig'",
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.beans.factory.support.DefaultListableBeanFactory',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206751000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Zone aware logic disabled or there is only one zone',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'com.netflix.loadbalancer.ZoneAwareLoadBalancer',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206751000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: "Returning cached instance of singleton bean 'metadata'",
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.beans.factory.support.DefaultListableBeanFactory',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206751000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'select route group isnull',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'WARN',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'com.jdcloud.jdsf.route.rule.JdsfRouteRibbonRule',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206756000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: " USE RoundRobin GET SERVER INFO IS {\"host\":\"10.0.0.59\",\"port\":8888,\"scheme\":null,\"id\":\"10.0.0.59:8888\",\"zone\":\"UNKNOWN\",\"readyToServe\":true,\"metaInfo\":{\"serverGroup\":null,\"serviceIdForDiscovery\":null,\"instanceId\":\"jdsf-server-trace1-4328deb6-e7db-4d8f-80dc-efbca953c762-8500\",\"appName\":\"jdsf-server-trace1\"},\"metadata\":{\"appVersion\":\"1577085116371\",\"jdsfNamespaceId\":\"namespace-1l1tk45o62134\",\"jdsfRegion\":\"cn-north-1\",\"appId\":\"app-hbexm4z3227yd1o\",\"groupId\":\"group-hbg59pzp74pz24j\",\"jdsfZone\":\"cn-north-1a\",\"clusterId\":\"rp-6v2379ij7if4\",\"profile\":\"default\",\"secure\":\"false\"},\"passingChecks\":true,\"healthService\":{\"node\":{\"id\":\"67316c31-746b-3435-6f36-323133343130\",\"node\":\"reg-1l1tk45o62134-1-0.jvessel-public-stag2.jdcloud.com\",\"address\":\"10.0.0.66\",\"datacenter\":\"autotest_chenkuo9\",\"taggedAddresses\":{\"lan\":\"10.0.0.66\",\"wan\":\"10.0.0.66\"},\"meta\":{\"consul-network-segment\":\"\"},\"createIndex\":10,\"modifyIndex\":11},\"service\":{\"id\":\"jdsf-server-trace1-4328deb6-e7db-4d8f-80dc-efbca953c762-8500\",\"service\":\"jdsf-server-trace1\",\"tags\":[\"appVersion=1577085116371\",\"jdsfNamespaceId=namespace-1l1tk45o62134\",\"jdsfRegion=cn-north-1\",\"appId=app-hbexm4z3227yd1o\",\"groupId=group-hbg59pzp74pz24j\",\"jdsfZone=cn-north-1a\",\"clusterId=rp-6v2379ij7if4\",\"profile=default\",\"secure=false\"],\"address\":\"10.0.0.59\",\"port\":8888,\"enableTagOverride\":false,\"createIndex\":1079316,\"modifyIndex\":1079316},\"checks\":[{\"node\":\"reg-1l1tk45o62134-1-0.jvessel-public-stag2.jdcloud.com\",\"checkId\":\"serfHealth\",\"name\":\"Serf Health Status\",\"status\":\"PASSING\",\"notes\":\"\",\"output\":\"Agent alive and reachable\",\"serviceId\":\"\",\"serviceName\":\"\",\"serviceTags\":[],\"createIndex\":10,\"modifyIndex\":10},{\"node\":\"reg-1l1tk45o62134-1-0.jvessel-public-stag2.jdcloud.com\",\"checkId\":\"service:jdsf-server-trace1-4328deb6-e7db-4d8f-80dc-efbca953c762-8500\",\"name\":\"Service 'jdsf-server-trace1' check\",\"status\":\"PASSING\",\"notes\":\"\",\"output\":\"HTTP GET http://10.0.0.59:8888/actuator/health: 200  Output: {\\\"status\\\":\\\"UP\\\"}\",\"serviceId\":\"jdsf-server-trace1-4328deb6-e7db-4d8f-80dc-efbca953c762-8500\",\"serviceName\":\"jdsf-server-trace1\",\"serviceTags\":[\"appVersion=1577085116371\",\"jdsfNamespaceId=namespace-1l1tk45o62134\",\"jdsfRegion=cn-north-1\",\"appId=app-hbexm4z3227yd1o\",\"groupId=group-hbg59pzp74pz24j\",\"jdsfZone=cn-north-1a\",\"clusterId=rp-6v2379ij7if4\",\"profile=default\",\"secure=false\"],\"createIndex\":1079316,\"modifyIndex\":1079321}]},\"hostPort\":\"10.0.0.59:8888\",\"alive\":true}",
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'WARN',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'com.jdcloud.jdsf.route.rule.JdsfRouteRibbonRule',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206756000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'jdsf-server-trace1 using LB returned Server: 10.0.0.59:8888 for request http:///server/jdsf-server1',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'com.netflix.loadbalancer.LoadBalancerContext',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206756000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: "Returning cached instance of singleton bean 'tracer'",
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.beans.factory.support.DefaultListableBeanFactory',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206761000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: "Returning cached instance of singleton bean 'messageConverters'",
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.beans.factory.support.DefaultListableBeanFactory',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206761000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Reading [java.lang.String] as "text/plain;charset=UTF-8" using [org.springframework.http.converter.StringHttpMessageConverter@7ca20101]',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.web.client.HttpMessageConverterExtractor',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206762000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Written [{"result":"jdsf-server1"}] as "text/plain" using [org.springframework.http.converter.StringHttpMessageConverter@7ca20101]',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206762000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: "Null ModelAndView returned to DispatcherServlet with name 'dispatcherServlet': assuming HandlerAdapter completed request handling",
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.web.servlet.DispatcherServlet',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206762000,
            fields: [
              {
                key: 'event',
                type: 'string',
                value: 'afterCompletion',
                typ: 'string',
              },
              {
                key: 'handler',
                type: 'string',
                value: 'public java.lang.String com.jdcloud.demo.client.controller.ClientController.getServer()',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206762000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Successfully completed request',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.web.servlet.DispatcherServlet',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206762000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Cleared thread-bound request context: org.apache.catalina.connector.RequestFacade@1799a52',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206763000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Span reported: 98b12c0ddcfeede1:98b12c0ddcfeede1:0:1 - getServer',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'INFO',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'io.jaegertracing.internal.reporters.LoggingReporter',
                typ: 'string',
              },
            ],
          },
        ],
        warnings: null,
      },
      {
        traceID: '98b12c0ddcfeede1',
        spanID: 'faee49533397389d',
        flags: 1,
        operationName: 'POST',
        references: [
          {
            refType: 'CHILD_OF',
            traceID: '98b12c0ddcfeede1',
            spanID: '98b12c0ddcfeede1',
          },
        ],
        startTime: 1577088206756000,
        duration: 4806,
        tags: [
          {
            key: 'http.status_code',
            type: 'int64',
            value: '200',
            typ: 'int64',
          },
          {
            key: 'http.url',
            type: 'string',
            value: 'http://10.0.0.59:8888/server/jdsf-server1',
            typ: 'string',
          },
          {
            key: 'component',
            type: 'string',
            value: 'feign',
            typ: 'string',
          },
          {
            key: 'span.kind',
            type: 'string',
            value: 'client',
            typ: 'string',
          },
          {
            key: 'http.method',
            type: 'string',
            value: 'POST',
            typ: 'string',
          },
        ],
        logs: [
          {
            timestamp: 1577088206756000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: "Returning cached instance of singleton bean 'tracer'",
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.beans.factory.support.DefaultListableBeanFactory',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088206761000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-6666-exec-4',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Span reported: 98b12c0ddcfeede1:faee49533397389d:98b12c0ddcfeede1:1 - POST',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'INFO',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'io.jaegertracing.internal.reporters.LoggingReporter',
                typ: 'string',
              },
            ],
          },
        ],
        warnings: null,
      },
      {
        traceID: '98b12c0ddcfeede1',
        spanID: 'cec408d6dc9b3c14',
        flags: 1,
        operationName: 'requestServer1',
        references: [
          {
            refType: 'CHILD_OF',
            traceID: '98b12c0ddcfeede1',
            spanID: 'faee49533397389d',
          },
        ],
        startTime: 1577088208871000,
        duration: 1647,
        tags: [
          {
            key: 'http.status_code',
            type: 'int64',
            value: '200',
            typ: 'int64',
          },
          {
            key: 'http.url',
            type: 'string',
            value: 'http://10.0.0.59:8888/server/jdsf-server1',
            typ: 'string',
          },
          {
            key: 'component',
            type: 'string',
            value: 'java-web-servlet',
            typ: 'string',
          },
          {
            key: 'span.kind',
            type: 'string',
            value: 'server',
            typ: 'string',
          },
          {
            key: 'http.method',
            type: 'string',
            value: 'POST',
            typ: 'string',
          },
        ],
        logs: [
          {
            timestamp: 1577088208871000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Bound request context to thread: org.apache.catalina.connector.RequestFacade@570934b4',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208871000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: "DispatcherServlet with name 'dispatcherServlet' processing POST request for [/server/jdsf-server1]",
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.web.servlet.DispatcherServlet',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208871000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Looking up handler method for path /server/jdsf-server1',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.boot.actuate.endpoint.web.servlet.WebMvcEndpointHandlerMapping',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208871000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Did not find handler method for [/server/jdsf-server1]',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.boot.actuate.endpoint.web.servlet.WebMvcEndpointHandlerMapping',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208871000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Looking up handler method for path /server/jdsf-server1',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.boot.actuate.endpoint.web.servlet.ControllerEndpointHandlerMapping',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208871000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Did not find handler method for [/server/jdsf-server1]',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.boot.actuate.endpoint.web.servlet.ControllerEndpointHandlerMapping',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208871000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Looking up handler method for path /server/jdsf-server1',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208872000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Returning handler method [public java.lang.String com.jdcloud.demo.server.controller.ServerController.requestServer1()]',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208872000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: "Returning cached instance of singleton bean 'serverController'",
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.beans.factory.support.DefaultListableBeanFactory',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208872000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: '[JDSF] request:<url-http://10.0.0.59:8888/server/jdsf-server1,method-POST>',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'INFO',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'com.jdcloud.jdsf.auth.filter.JdsfAuthInterceptor',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208872000,
            fields: [
              {
                key: 'handler.class_simple_name',
                type: 'string',
                value: 'ServerController',
                typ: 'string',
              },
              {
                key: 'handler',
                type: 'string',
                value: 'public java.lang.String com.jdcloud.demo.server.controller.ServerController.requestServer1()',
                typ: 'string',
              },
              {
                key: 'event',
                type: 'string',
                value: 'preHandle',
                typ: 'string',
              },
              {
                key: 'handler.method_name',
                type: 'string',
                value: 'requestServer1',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208872000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Written [{"result":"jdsf-server1"}] as "text/plain" using [org.springframework.http.converter.StringHttpMessageConverter@48e92c5c]',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208872000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: "Null ModelAndView returned to DispatcherServlet with name 'dispatcherServlet': assuming HandlerAdapter completed request handling",
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.web.servlet.DispatcherServlet',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208872000,
            fields: [
              {
                key: 'event',
                type: 'string',
                value: 'afterCompletion',
                typ: 'string',
              },
              {
                key: 'handler',
                type: 'string',
                value: 'public java.lang.String com.jdcloud.demo.server.controller.ServerController.requestServer1()',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208872000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Successfully completed request',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.web.servlet.DispatcherServlet',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208872000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Cleared thread-bound request context: org.apache.catalina.connector.RequestFacade@570934b4',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'DEBUG',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter',
                typ: 'string',
              },
            ],
          },
          {
            timestamp: 1577088208873000,
            fields: [
              {
                key: 'thread',
                type: 'string',
                value: 'http-nio-8888-exec-2',
                typ: 'string',
              },
              {
                key: 'message',
                type: 'string',
                value: 'Span reported: 98b12c0ddcfeede1:cec408d6dc9b3c14:faee49533397389d:1 - requestServer1',
                typ: 'string',
              },
              {
                key: 'level',
                type: 'string',
                value: 'INFO',
                typ: 'string',
              },
              {
                key: 'logger',
                type: 'string',
                value: 'io.jaegertracing.internal.reporters.LoggingReporter',
                typ: 'string',
              },
            ],
          },
        ],
        warnings: null,
      },
    ],
  },
  responseObj: {
    size: 0,
    timeout: 0,
    nonce: '16bb7c83-3766-4125-9f2a-2ef4d115771b',
  },
}
