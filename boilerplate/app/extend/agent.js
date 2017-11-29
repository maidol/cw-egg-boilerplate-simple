const Cwlogger = require('cw-logger2');

const DBPOOL = Symbol('Agent#dbpool');
module.exports = {
	proxy(k, v) {

	},
	dbpool(dbname) {
		this[DBPOOL] = this[DBPOOL] || {};
		if (!this[DBPOOL][dbname]) {
			this[DBPOOL][dbname] = this.mysql.createPool(this.config.db[dbname]);
		}
		return this[DBPOOL][dbname];
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
	initCWAgent() {
		const lconfig = this.config.agentLogger;
		if (this.config.env === 'unittest') {
			// 由agent负责初始化所有logger
			for (const key in this.config.cwLogger.bunyan.categorys) {
				if (this.config.cwLogger.bunyan.categorys.hasOwnProperty(key)) {
					lconfig.bunyan.categorys[key] = this.config.cwLogger.bunyan.categorys[key];
				}
			}
		}
		const cs = lconfig.bunyan.categorys;
		lconfig.bunyan.categorys = Object.keys(cs).map(k => cs[k]);
		const log = new Cwlogger(lconfig);
		this.cwLog = log;

		lconfig.bunyan.categorys.forEach((c) => {
			const name = `${c.name}Logger`;
			this[name] = log.getLogger(c.name);
		});

		this.cwLogger = log.agent;

		this.logger.info('init cw-agent ...');

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
