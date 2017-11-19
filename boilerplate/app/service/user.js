module.exports = app => class User extends app.Service {
	async get(name) {
		if (name === 'king') return Promise.resolve({
			name: 'king'
		});
		return Promise.resolve(null);
	}
	async list() {
		// let conn;
		// let {
		//   ctx
		// } = this;
		try {
			const pool = app.dbpool('eggsample');
			const [rows, fields] = await pool.query('select * from user');
			const [insertResult, updateResult] = await app.beginTransaction('eggsample', async(tran) => {
				const [insertResult] = await tran.query('insert into user set ?;', {
					name: 'king1'
				});
				const sql = tran.format('update user set ? where ?;', [{
					name: 'king3'
				}, {
					id: 13
				}]);
				const [updateResult] = await tran.query(sql);
				return [insertResult, updateResult];
			});
			return [rows, fields, insertResult, updateResult];
		} catch (error) {
			throw error;
		}
	}
};