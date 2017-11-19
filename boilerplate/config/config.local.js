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
					src: true
				},
				app: {
					src: true
				}
			}
		}
	},
	agentLogger: {
		logLevel4console: 'info', // console
		bunyan: {
			// 级别分别是: TRACE DEBUG INFO WARN ERROR FATAL
			categorys: {
				console: {
					logLevel4console: 'debug',
					src: true
				},
				agent: {
					src: true
				}
			}
		}
	}
});