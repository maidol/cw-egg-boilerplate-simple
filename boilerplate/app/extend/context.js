const _ = require('lodash');
const apiCode = require('../../lib/api_code_enum');

module.exports = {
	test1() {
		return 'test1';
	},
	test2() {
		return 'test2';
	},
	get cwLogger() {
		const app = this.app;
		return app.cwLogger;
	},
	get consoleLogger() {
		const app = this.app;
		return app.consoleLogger;
	},
	getLogger(name) {
		return this.app[name];
	},
	buildReturnObject(ret, errCode, msg, data) {
		const result = {
			ret: apiCode.retCodeEnum.success,
			errcode: apiCode.errCodeEnum.success,
			msg: 'success'
		};
		if (_.isNumber(ret)) {
			result.ret = ret;
		}
		if (_.isNumber(errCode)) {
			result.errcode = parseInt(errCode, 10);
		}
		result.msg = msg;
		if (msg === undefined) {
			result.msg = 'success';
		}
		if (!Object.is(data, undefined)) {
			result.data = data;
		}
		return result;
	},
	success(data) {
		this.body = this.buildReturnObject(apiCode.retCodeEnum.success, apiCode.errCodeEnum.success, 'success', data);
	},
	error(msg, errCode = apiCode.errCodeEnum.apiError, retCode = apiCode.retCodeEnum.serverError) {
		throw Object.assign(new Error(msg || '接口口内部异常'), {
			retCode,
			errCode: _.isNumber(errCode) ? errCode : apiCode.errCodeEnum.apiError
		});
	},
	validateError(err, errCode) {
		throw Object.assign(err, {
			errCode
		});
	}
};