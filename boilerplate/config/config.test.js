module.exports = app => ({
	robot: {
		ua: [
			/sina/i,
			/Baiduspider/i
		]
	},
	cwLogger: {
		logLevel4console: 'info', // console
		bunyan: {
			// 级别分别是: TRACE DEBUG INFO WARN ERROR FATAL
			categorys: {
				console: {
					logLevel4console: 'debug',
					// pretty: true
				}
			}
		},
    enableLogstash4console: true, // 使用elk收集日志, 依赖enableBunyan
    currentLogstashInput: 'tcp', // tcp数据包(相比udp, 大小默认无限制)
    logstash: {
        type: '{{name}}' + (process.env.SITE_DOMAIN ? `-${process.env.SITE_DOMAIN}` : ''),
        udp: {
            host: '192.168.2.155',
            port: 64100,
          type: '{{name}}' + (process.env.SITE_DOMAIN ? `-${process.env.SITE_DOMAIN}` : '')
        },
        tcp: {
            host: '192.168.2.155',
            port: 64756,
          type: '{{name}}' + (process.env.SITE_DOMAIN ? `-${process.env.SITE_DOMAIN}` : '')
        }
    },
	},
	agentLogger: {
		logLevel4console: 'info', // console
		bunyan: {
			// 级别分别是: TRACE DEBUG INFO WARN ERROR FATAL
			categorys: {
				console: {
					logLevel4console: 'debug',
				}
			}
		},
    enableLogstash4console: true, // 使用elk收集日志, 依赖enableBunyan
    currentLogstashInput: 'tcp', // tcp数据包(相比udp, 大小默认无限制)
    logstash: {
        type: '{{name}}' + (process.env.SITE_DOMAIN ? `-${process.env.SITE_DOMAIN}` : ''),
        udp: {
            host: '192.168.2.155',
            port: 64100,
          type: '{{name}}' + (process.env.SITE_DOMAIN ? `-${process.env.SITE_DOMAIN}` : '')
        },
        tcp: {
            host: '192.168.2.155',
            port: 64756,
          type: '{{name}}' + (process.env.SITE_DOMAIN ? `-${process.env.SITE_DOMAIN}` : '')
        }
    },
	}
});