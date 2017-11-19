// const assert = require('assert');
const mock = require('egg-mock');

describe('test/app/middleware/robot.test.js', () => {
  let app;
  before(() => {
    // 创建当前应用的 app 实例
    app = mock.app();
    // 等待 app 启动成功，才能执行测试用例
    return app.ready(app.initCWApp.bind(app)); // app启动后初始化cwapp
  });
  afterEach(mock.restore);
  it('should block robot', () => app.httpRequest()
    .get('/')
    .set('User-Agent', 'Baiduspider')
    .expect(403));
  // ...
});