const { Controller } = require('egg');

module.exports = class UserController extends Controller {
	async list(ctx) {
		// ctx.cwLogger.info('user list');
		ctx.body = await ctx.service.user.list();
	}
};
