const Cwlogger = require('cw-logger2');

const CACHE = Symbol('Application#cache');
module.exports = {
	get cache() {
		// this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
		if (!this[CACHE]) {
			// 实际情况肯定更复杂
			this[CACHE] = {
				name: 'cache'
			};
		}
		return this[CACHE];
	},
	set cache(value) {
		this[CACHE] = value;
	},
	dbpool(dbname) {
		this._dbpool = this._dbpool || {};
		if (!this._dbpool[dbname]) {
			this._dbpool[dbname] = this.mysql.createPool(this.config.db[dbname]);
		}
		return this._dbpool[dbname];
	},
	dbconn(dbname) {
		return this.dbpool(dbname).getConnection();
	},
	beginTransaction(dbname, promisecallback) {
		let conn;
		return this.dbconn(dbname)
			.then((connection) => {
				conn = connection;
				return conn.beginTransaction();
			})
			.then(() => promisecallback(conn))
			.then(res => conn.commit().then(() => {
				conn.release();
				return res;
			}))
			.catch(err => conn.rollback().then(() => {
				conn.release();
				throw err;
			}));
	},
	initCWApp() {
		const lconfig = this.config.cwLogger;
		const cs = lconfig.bunyan.categorys;
		lconfig.bunyan.categorys = Object.keys(cs).map(k => cs[k]);
		const log = new Cwlogger(lconfig);
		this.cwLog = log;

		this.config.cwLogger.bunyan.categorys.forEach((c) => {
			const name = `${c.name}Logger`;
			this[name] = log.getLogger(c.name);
		});

		this.cwLogger = log.app;

		this.logger.info('init cw-app ...');

		this.on('error', (err, ctx) => {
			this.cwLogger.error(err, 'app-on-error事件');
		});

		process.on('unhandledRejection', (err) => {
			this.cwLogger.error(err, 'process-on-unhandledRejection事件');
		});

		process.on('uncaughtException', (err) => {
			this.cwLogger.error(err, 'process-on-uncaughtException事件');
		});
	}
};
