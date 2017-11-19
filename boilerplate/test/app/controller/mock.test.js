const {
  app,
  // mock,
  // assert
} = require('egg-mock/bootstrap');

describe('test/app/controller/mock.test.js', () => {
  before(() => app.ready(app.initCWApp.bind(app))); // app启动后初始化cwapp
  describe('POST /mock/post', () => {
    it('should status 200 and get the request body, mock csrf token', () => {
      // 模拟 CSRF token，下文会详细说明
      app.mockCsrf();
      return app.httpRequest()
        .post('/mock/post')
        .type('json')
        .send({
          foo: 'bar',
        })
        .expect(200)
        .expect({
          foo: 'bar',
        });
    });
  });
});