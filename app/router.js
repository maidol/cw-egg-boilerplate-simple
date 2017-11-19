module.exports = (app) => {
	app.get('/', app.middlewares.validate({}, app), app.controller.home.index);
	app.get('/hello', app.controller.home.hello);
	app.get('/validate', app.middlewares.validate({
		// auth: false,
		req: {
			headers: app.Joi.object().unknown(),
			body: app.Joi.object().unknown(),
			query: {
				account: app.Joi.string().example('12345678901').description('邮箱/手机号码').required(),
				password: app.Joi.string().min(3).max(24).example('1234')
					.description('密码')
					.required(),
				// password: app.Joi.string().min(3).error(new Error('长度不能小于3'))
				// .max(24).error(new Error('长度不能大于24')).example('1234').description('密码')
				// .required().error(new Error('必填'))
			}
		},
		// res: {
		//   id: app.Joi.number().min(3).required()
		// }
	}, app), app.controller.home.index);
	app.get('/news', app.controller.news.list);
	app.post('/mock/post', app.controller.mock.post);
	app.get('/user/list', app.controller.user.list);
};