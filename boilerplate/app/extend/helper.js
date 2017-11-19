module.exports = {
	formatTime(time) {
		return 'formatTime';
	},
	get test() {
		return 'test logger';
	},
	promiseCallback(functionName, params) {
		const targs = Array.prototype.slice.call(params, 0);
		return new Promise(((resolve, reject) => {
			targs.push((err, ...args) => {
				if (err) {
					return reject(err);
				}

				return resolve.apply(this, [args]);
			});

			this[functionName](...targs);
		}));
	}
};