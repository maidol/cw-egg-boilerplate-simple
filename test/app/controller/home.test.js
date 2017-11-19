const {
  app,
  // mock,
  assert
} = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  before(() => app.ready(app.initCWApp.bind(app))); // app启动后初始化cwapp
  describe('GET /', () => {
    it('should status 200 and get the body', () =>
      // 对 app 发起 `GET /` 请求
      app.httpRequest()
      .get('/')
      .expect(200) // 期望返回 status 200
      .expect('cw-egg hello world')); // 期望 body 是 hello world
    it('should send multi requests', async() => {
      // 使用 generator function 方式写测试用例，可以在一个用例中串行发起多次请求
      await app.httpRequest()
        .get('/')
        .expect(200) // 期望返回 status 200
        .expect('cw-egg hello world'); // 期望 body 是 hello world
      // 再请求一次
      const result = await app.httpRequest()
        .get('/')
        .expect(200)
        .expect('cw-egg hello world');
      // 也可以这样验证
      assert(result.status === 200);
    });
  });
});