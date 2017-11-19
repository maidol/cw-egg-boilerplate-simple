module.exports = (options, app) => async(ctx, next) => {
	ctx.cwLogger.info('validate...');
	if (options.auth) {
		// 验证用户
	}
	// 验证请求参数request{ headers, query, body }
	for (const key in options.req) {
		if (options.req.hasOwnProperty(key)) {
			const schema = options.req[key];
			const {
				error,
				// value
			} = ctx.app.Joi.validate(ctx.request[key], schema);
			// ctx.cwLogger.info('value', value);
			if (error) {
				// let message = error.details[0].message;
				// // ctx.throw(422, message);
				// ctx.body = message;
				// return;
				ctx.validateError(error, app.apiCode.errCodeEnum.paramTypeError);
			}
		}
	}
	await next();
	// 验证返回数据respose.body{...}
	if (ctx.body instanceof Object && options.res) {
		const {
			error,
			// value
		} = ctx.app.Joi.validate(ctx.body, options.res);
		if (error) {
			// let message = error.details[0].message;
			// // ctx.throw(422, message);
			// ctx.body = message;
			// return;
			ctx.validateError(error, app.apiCode.errCodeEnum.responseParamTypeError);
		}
	}
};