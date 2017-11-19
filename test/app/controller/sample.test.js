const assert = require('assert');
const mock = require('egg-mock');
// const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/sample.test.js', () => {
  let app;
  before(() => {
    app = mock.app();
    return app.ready(app.initCWApp.bind(app)); // app启动后初始化cwapp
  });
  before(() => {
    app.logger.info('before testing...');
  });
  beforeEach(() => {
    app.logger.info('beforeEach');
  });
  afterEach(() => {
    app.logger.info('afterEach');
  });
  afterEach(mock.restore);
  after(() => {
    app.logger.info('after testing...');
  });

  it('should get a ctx', () => {
    const ctx = app.mockContext();
    assert(ctx.method === 'GET');
    assert(ctx.url === '/');
  });

  it('should mock ctx.user', () => {
    const ctx = app.mockContext({
      user: {
        name: 'king'
      }
    });
    assert(ctx.user);
    assert(ctx.user.name === 'king');
  });

  // 使用返回 Promise 的方式
  it('should redirect promise', () => app.httpRequest()
    .get('/')
    .expect(200));
  // 使用 callback 的方式
  it('should redirect callback', (done) => {
    app.httpRequest()
      .get('/')
      .expect(200, done);
  });
  // 使用 generator
  it('should redirect generator', function* g() {
    yield app.httpRequest()
      .get('/')
      .expect(200);
  });
  // 使用 async
  it('should redirect async', async() => {
    await app.httpRequest()
      .get('/')
      // .expect(302);
      .expect(200);
  });
});