module.exports = app => class MockController extends app.Controller {
	async post({
		request
	}) {
		const {
			body
		} = request;
		this.ctx.body = body;
	}
};