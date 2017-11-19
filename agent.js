const mysql = require('promise-mysql2');
const Joi = require('joi');
const apiCode = require('./lib/api_code_enum');

/**
 * 分配workerId
 * @param {Array} alivePids
 * @param {Object} workers
 * @param {Array} workerIds
 */
const allocateWorkerId = (alivePids, workers, workerIds) => {
	const r = {};
	const sendTo = {};

	const alivePKs = alivePids.map(p => `w_${p}`);
	Object.keys(workers).forEach((k) => {
		if (alivePKs.indexOf(k) < 0) {
			const wid = workers[k];
			workerIds.push(wid);
		} else {
			r[k] = workers[k];
		}
	});

	alivePids.forEach((p) => {
		if (Object.keys(workers).indexOf(`w_${p}`) < 0) {
			const wid = workerIds.pop();
			r[`w_${p}`] = wid;
			sendTo[`w_${p}`] = wid;
		} else {
			r[`w_${p}`] = workers[`w_${p}`];
		}
	});

	return {
		workers: r,
		sendTo
	};
};

module.exports = (agent) => {
	agent.logger.info('agent running..', agent.config.env, agent.baseDir, agent.name);

	agent.mysql = mysql;
	agent.Joi = Joi;
	agent.apiCode = apiCode;

	agent.workerIds = []; // 可被分配的wid
	agent.workerPids = []; // alive pids
	agent.workers = {}; // 占位
	agent.eggReady = false; // 整个egg服务启动完成的标志

	agent.initCWAgent();

	agent.beforeStart(async() => {

	});

	// 在这里写你的初始化逻辑
	// 也可以通过 messenger 对象发送消息给 App Worker
	// 但需要等待 所有App Worker 启动成功后才能发送，不然很可能丢失
	agent.messenger.on('egg-ready', (data) => {
		agent.eggReady = true;
		// 分配workerId
		let index = 1;
		agent.workerPids.forEach((pid) => {
			agent.workers[`w_${pid}`] = index;
			agent.messenger.sendTo(pid, 'allocation-workid', index);
			index++;
		});
		agent.logger.info('hi, agent, all egg app_worker are ready', agent.workerPids, agent.workers);
	});

	agent.messenger.on('egg-pids', (data) => {
		if (agent.eggReady) {
			// appworker start/exit
			// 更新 alive workers, workerPids列表
			agent.logger.info('hi, agent, update alive egg-pids', data, agent.workers);

			const {
				workers,
				sendTo
			} = allocateWorkerId(data, agent.workers, agent.workerIds);
			for (const key in sendTo) {
				if (sendTo.hasOwnProperty(key)) {
					const wid = sendTo[key];
					agent.messenger.sendTo(key.replace('w_', ''), 'allocation-workid', wid);
				}
			}

			agent.workerPids = data;
			agent.workers = workers;

			agent.logger.info('appworker start/exit, update agent.workers result', agent.workers);
		}
	});

	agent.messenger.on('app-readyfor-workerid', (data) => {
		if (!agent.eggReady) {
			agent.workerPids.push(data.pid);
			agent.logger.info('hi, agent, on app-readyfor-workerid', data);
		}
	});
};