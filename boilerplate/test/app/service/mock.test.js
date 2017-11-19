const {
  app,
  // mock,
  assert
} = require('egg-mock/bootstrap');

describe('test/app/service/mock.test.js', () => {
  before(() => app.ready(app.initCWApp.bind(app))); // app启动后初始化cwapp
  describe('get()', () => {
    // 因为需要异步调用，所以使用 async function
    it('should get exists user', async() => {
      // 创建 ctx
      const ctx = app.mockContext();
      // 通过 ctx 访问到 service.user
      const user = await ctx.service.user.get('king');
      assert(user);
      assert(user.name === 'king');
    });
    it('should get null when user not exists', async() => {
      const ctx = app.mockContext();
      const user = await ctx.service.user.get('fengmk1');
      assert(!user);
    });
  });
});