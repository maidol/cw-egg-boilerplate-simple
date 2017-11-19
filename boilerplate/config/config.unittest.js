module.exports = app => ({
	robot: {
		enable: true,
		ua: [
			/sina/i,
			/Baiduspider/i
		]
	},
	bodyParser: {
		enable: true,
	},
	logger: {
		// dir: require('path').join(app.baseDir, 'my/logs')
		level: 'info',
		consoleLevel: 'info',
		// outputJSON: true
	},
	agentLogger: {
		bunyan: {
			// 级别分别是: TRACE DEBUG INFO WARN ERROR FATAL
			categorys: {
				console: {
					logLevel4console: 'info',
				}
			}
		}
	}
});