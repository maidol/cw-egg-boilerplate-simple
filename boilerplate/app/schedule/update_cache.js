const debug = require('debug')('update_cache');

const {
  Subscription
} = require('egg');

module.exports = class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1m', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }
  // subscribe 是真正定时任务执行时被运行的函数，ctx是一个匿名的 Context 实例
  async subscribe() {
    const {
      ctx,
    } = this;
    // const res = yield this.ctx.curl('http://www.api.com/cache', {
    //   dataType: 'json',
    // });
    const res = await Promise.resolve({
      data: Date.now()
    });
    ctx.app.cache = res;
    // ctx.logger.debug('UpdateCache', app.cache);
    // this.logger.debug('UpdateCache', app.cache);
    // app.consoleLogger.debug('UpdateCache', app.cache);
    ctx.consoleLogger.debug('UpdateCache', ctx.app.cache);
    debug('UpdateCache', ctx.app.cache);
  }
};

// module.exports = {
//   schedule: {
//     interval: '1s', // 1 分钟间隔
//     type: 'all', // 指定所有的 worker 都需要执行
//   },
//   async task(ctx) {
//     // const res = await ctx.curl('http://www.api.com/cache', {
//     //   dataType: 'json',
//     // });
//     const res = await Promise.resolve({ data: Date.now() });
//     ctx.app.cache = res.data;
//     console.log(ctx.app.cache);
//   },
// };
