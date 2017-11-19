module.exports = app => class UserController extends app.Controller {
	async list(ctx) {
		// ctx.cwLogger.info('user list');
		ctx.body = await ctx.service.user.list();
	}
};