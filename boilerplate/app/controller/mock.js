const { Controller } = require('egg');

module.exports = class MockController extends Controller {
	async post({
		request
	}) {
		const {
			body
		} = request;
		this.ctx.body = body;
	}
};
