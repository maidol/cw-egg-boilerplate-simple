const path = require('path');

module.exports = app => ({
	listen: {
		port: 7001,
		hostname: '127.0.0.1',
		// path: '/var/run/egg.sock',
	},
	keys: '123456',
	view: {
		defaultViewEngine: 'nunjucks',
		mapping: {
			'.tpl': 'nunjucks'
		}
	},
	news: {
		pageSize: 5,
		serverUrl: 'https://hacker-news.firebaseio.com/v0'
	},
	middleware: [
		'robot',
		'errorHandler',
		'apiResponse',
		'compress'
	],
	meta: {
		enable: false,
	},
	siteFile: {
		enable: false,
	},
	notfound: {
		enable: false,
	},
	static: {
		enable: false,
	},
	bodyParser: {
		enable: true,
	},
	overrideMethod: {
		enable: false,
	},
	session: {
		enable: false,
	},
	i18n: {
		enable: false,
		defaultLocale: 'zh-CN',
		// 优先级从高到低
		// query: /?locale=en-US
		// cookie: locale=zh-TW
		// header: Accept-Language: zh-CN,zh;q=0.5
		queryField: 'locale',
		cookieField: 'locale',
		// Cookie 默认一年后过期， 如果设置为 Number，则单位为 ms
		cookieMaxAge: '1y',
	},
	securities: {
		enable: false, // 禁用所有默认安全中间件
	},
	security: {
		csrf: {
			enable: false,
		},
		xframe: {
			enable: false,
		},
		csp: {
			enable: false
		}
	},
	robot: {
		enable: false,
		name: 'robot',
		ua: [
			/Baiduspider/i
		]
	},
	// 只对 /api 前缀的 url 路径生效
	errorHandler: {
		enable: false,
		match: '/api',
	},
	apiResponse: {
		enable: true,
	},
	compress: {
		enable: false,
		// match: '', // 字符串/正则/函数
		// ignore: '', // 字符串/正则/函数
		threshold: 1
	},
	db: {
		eggsample: {
			host: 'xxxxxxxxxxxxxxx',
			user: 'xxxxxxxxxxxxxxx',
			password: 'xxxxxxxxxxxxxxx',
			database: 'xxxxxxxxxxxxxxx',
			timezone: '+08:00',
			connectionLimit: 10
		}
	},
	logger: {
		// encoding: 'utf8',
		dir: path.join(app.baseDir, 'logs/egg'),
		// appLogName: `cw-${app.name}-web.log`,
		// coreLogName: 'cw-egg-web.log',
		// agentLogName: 'cw-egg-agent.log',
		// errorLogName: 'cw-common-error.log',
		level: 'info',
		consoleLevel: 'info',
		// outputJSON: true
	},
	cwLogger: {
		logRoot: path.join(app.baseDir, 'logs'), // 日志根目录(需根据实际情况设置)
		logLevel: 'info', // file
		logLevel4console: 'error', // console
		bunyan: {
			// 级别分别是: TRACE DEBUG INFO WARN ERROR FATAL
			categorys: {
				console: {
					name: 'console',
					type: 'console',
					// logLevel4console: 'info',
					pretty: true
				},
				app: {
					name: 'app', // 模块/分类
					type: 'rotatingFile',
					// level: 'info',
					// logLevel4console: 'error',
					pretty: true,
					rotateConfig: {
						period: '1d', // The period at which to rotate.
						totalFiles: 15 // The maximum number of rotated files to keep. 0 to keep files regardless of how many there are.
					}
				},
				common: {
					name: 'common', // 模块/分类
					type: 'rotatingFile',
					pretty: true,
					rotateConfig: {
						period: '1d', // The period at which to rotate.
						totalFiles: 0 // The maximum number of rotated files to keep. 0 to keep files regardless of how many there are.
					}
				}
			}
		}
	},
	agentLogger: {
		logRoot: path.join(app.baseDir, 'logs'), // 日志根目录(需根据实际情况设置)
		logLevel: 'info', // file
		logLevel4console: 'error', // console
		bunyan: {
			// 级别分别是: TRACE DEBUG INFO WARN ERROR FATAL
			categorys: {
				console: {
					name: 'console',
					type: 'console',
					// logLevel4console: 'error',
					pretty: true
				},
				agent: {
					name: 'agent', // 模块/分类
					type: 'rotatingFile',
					rotateConfig: {
						period: '1d', // The period at which to rotate.
						totalFiles: 15 // The maximum number of rotated files to keep. 0 to keep files regardless of how many there are.
					}
				}
			}
		}
	},
});