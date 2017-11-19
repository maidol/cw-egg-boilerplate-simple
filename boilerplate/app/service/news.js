module.exports = (app) => {
	class NewsService extends app.Service {
		async list(page = 1) {
			this.logger.info('service list');
			const { ctx } = this;
			const {
				serverUrl,
				pageSize
			} = app.config.news;
			const {
				data: idList
			} = await ctx.curl(`${serverUrl}/topstorie.json`, {
				data: {
					orderBy: '"$key"',
					startAt: `"${pageSize * (page - 1)}"`,
					endAt: `"${(pageSize * page) - 1}"`
				},
				dataType: 'json'
			});
			const newsList = await Object.keys(idList).map((key) => {
				const url = `${serverUrl}/item/${idList[key]}.json`;
				return ctx.curl(url, {
					dataType: 'json'
				});
			});
			ctx.cwLogger.info(newsList);
		}
	}
	return NewsService;
};