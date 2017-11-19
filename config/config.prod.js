module.exports = app => ({
	robot: {
		ua: [
			/sina/i,
			/Baiduspider/i
		]
	},
	logger: {
		disableConsoleAfterReady: true,
		outputJSON: false,
		level: 'error',
		consoleLevel: 'error',
		allowDebugAtProd: false,
	},
	cwLogger: {
		logLevel: 'error', // file
	},
	agentLogger: {
		logLevel: 'error', // file
	},
});