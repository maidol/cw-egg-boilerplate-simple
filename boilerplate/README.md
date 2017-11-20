## cw egg-sample
------
[基于egg框架](https://eggjs.org/zh-cn/)

## 启动
------

```bash
git clone https://github.com/maidol/egg-sample.git
cd egg-sample
npm i # 安装依赖
npm run dev # 开发环境
npm run test # 单元测试
npm run cov # 代码覆盖率
npm run start # 生产环境
npm run lint # 检查语法
```

## 开发工具
------
- 安装vscode

- 安装格式化插件 Beautify

- 安装语法检查插件 ESLint

- tab配置制表符大小为2, 并将缩进转换为tab制表符
```javascript
// 在用户设置默认
{ "editor.tabSize": 2 }
```

- 换行, linux 默认 LF, windows 默认 CRLF, 在windows下也设置为LF, 与linux兼容
```javascript
// 在用户设置默认
// 默认行尾字符。使用 \n 表示 LF，\r\n 表示 CRLF。
{ "files.eol": "\n"}
```

## 调试
------
vscode开发环境下, 按f5

## 一些代码规范风格 [es6](http://es6.ruanyifeng.com/#docs/style)
------
- 使用tab缩进, 设置制表符大小为2

- 块级作用域

使用let取代var

优先使用const常量定义, 所有函数都应该设置为常量

- 字符串

静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号

- 解构赋值

- 数组  

使用扩展运算符(...)拷贝数组

```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}
// good
const itemsCopy = [...items];
```

- 函数  

尽量用箭头函数代替, 简洁且绑定了this, 箭头函数取代Function.prototype.bind, 不再用 self/_this/that

```javascript
const obj = {
  t1: function(){
    const d1 = function(){
      console.log('d1', this);
    }
    const d2 = () => {
      console.log('d2', this);
    }
    d1();  // this 不是 obj
    d2();  // this = obj
  }
}
obj.t1();
```

使用默认值语法设置函数参数的默认值

```javascript
// bad
function handleThings(opts) {
  opts = opts || {};
}
// good
function handleThings(opts = {}) {
  // ...
}
```

- Class

总是用 Class，取代需要 prototype 的操作

- import/export, 目前此框架未支持此语法特性

- 安装格式化工具 js-beautify for VS Code

- [ESLint](https://eslint.org/)

一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码

[airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)

```bash
npm install --save-dev eslint
npm install --save-dev eslint-config-airbnb-base eslint-plugin-import
```

新建一个.eslintrc文件，配置[ESLint](https://eslint.org/)

```javascript
{
  "extends": "standard",
  "rules": {
    "semi": [ 2, "always"],
    "semi-spacing": 1,
    "space-before-function-paren": 0,
    "no-trailing-spaces": 1,
    "eol-last": 0,
    "indent": [2, "tab"],
    "comma-dangle": 0,
    "curly": 0,
    "spaced-comment": 1,
    "no-tabs": 0,
    "generator-star-spacing": 0
  }
}
```

```bash
# 检查指定文件
eslint index.js
```

## git版本分支
------

- 项目目前暂未按严格的git工作流, 只分dev和master分支, dev开发, master发布

## git提交代码
------

- 添加必要的提交描述(功能, bug相关)

- 先拉取, 检查语法, 再推送
```bash
# 检查语法
npm run lint
```

## 框架相关简介
整体基于egg, 此基础上集成常用的组件
------

## 环境变量 NODE_ENV 
------
- NODE_ENV

- EGG_SERVER_ENV

## 组件
------

- 日志组件[cw-logger](https://github.com/maidol/cw-logger)

- 数据库[mysql](https://github.com/mysqljs/mysql)  
mysql组件添加了promise的封装层, 调用 const [result, fields] = await pool.query(...) 方法返回的数据类型为数组

- 数据校验[joi](https://github.com/hapijs/joi)

## egg对象
------
- Application(Koa的全局应用对象)  
{ logger, coreLogger, config, Controller, Service, middleware, middlewares }

- 配置Config  
{ appMiddleware, coreMiddleware }

- Context  
{ app, logger, coreLogger, service, request, response, helper }

- Controller  
{ ctx, app, config, logger }

- Service  
{ ctx, app, config, logger, service }

- Logger  
- - [cw日志对象](https://github.com/maidol/cw-logger), 应用日志统一记录在app.log文件  
{ agent{ cwLogger, consoleLogger }, app{ cwLogger, consoleLogger }, context{ cwLogger, consoleLogger } }

- - egg日志对象, egg框架内置, 应用开发一般不会用到  
{ agent{ logger, coreLogger }, app{ logger, coreLogger }, context{ logger, coreLogger }}

- [mysql数据库](https://github.com/mysqljs/mysql)

连接池

```javascript
const pool = app.dbpool('eggsample');
const [rows, fields] = await pool.query('select * from user');
```

数据库事务

```javascript
const [insertResult, updateResult] = await app.beginTransaction('eggsample', async(tran) => {
  let [insertResult] = await tran.query('insert into user set ?;', {
    name: 'king1'
  });
  const sql = tran.format('update user set ? where ?;', [{
    name: 'king3'
  }, {
    id: 13
  }]);
  let [updateResult] = await tran.query(sql);
  return [insertResult, updateResult];
});
```

- 参数校验

[app.Joi](https://github.com/hapijs/joi), 参数校验统一放在路由层

```javascript
app.get('/validate', app.middlewares.validate({
  // auth: false,
  req: {
    headers: app.Joi.object().unknown(),
    body: app.Joi.object().unknown(),
    query: {
      account: app.Joi.string().example('12345678901').description('邮箱/手机号码').required(),
      password: app.Joi.string().min(3).max(24).example('1234').description('密码').required()
    }
  },
  // res: {
  //   id: app.Joi.number().min(3).required()
  // }
}, app), app.controller.home.index);
```


## 中间件级别
------
- 框架级别, app.config.coreMiddleware
- 插件级别
- 应用级别, 通过配置文件
- 路由级别  
注意：框架和插件加载的中间件会在应用层配置的中间件之前，框架默认中间件不能被应用层中间件覆盖，如果应用层有自定义同名中间件，在启动时会报错

## 单元测试
------
```bash
npm run test
```

- 测试用例执行时，应用是以 env: unittest 启动的，读取的配置也是 config.default.js 和 config.unittest.js 合并的结果
- 运行 npm run test 时会自动执行 test 目录下的以 .test.js 结尾的文件（默认 glob 匹配规则 test/**/*.test.js
- 在编写用例时往往想单独执行正在编写的用例，可以通过以下方式指定特定用例文件
```bash
TESTS=test/x.test.js npm test
```

- 指定 reporter
```bash
TEST_REPORTER=dot npm test
```

- 指定用例超时时间, 默认30s
```bash
TEST_TIMEOUT=5000 npm test
```

- 通过 argv 方式传参; egg-bin test 除了环境变量方式，也支持直接传参，支持 mocha 的所有参数，参见: [mocha usage](https://mochajs.org/#usage)
```bash
$ # npm 传递参数需额外加一个 `--`，参见 https://docs.npmjs.com/cli/run-script
$ npm test -- --help
$
$ # 等同于 `TESTS=test/**/test.js npm test`，受限于 bash，最好加上双引号
$ npm test "test/**/test.js"
$
$ # 等同于 `TEST_REPORTER=dot npm test`
$ npm test -- --reporter=dot
$
$ # 支持 mocha 的参数，如 grep / require 等
$ npm test -- -t 30000 --grep="should GET"
```

- 执行顺序。每个用例(describe)会按 before -> beforeEach -> it -> afterEach -> after 的顺序执行，而且可以定义多个

##  代码覆盖率
------
- egg-bin 已经内置了 [nyc](https://github.com/istanbuljs/nyc) 来支持单元测试自动生成代码覆盖率报告
```bash
npm run cov
```

- 环境配置
```txt
和 test 命令一样，cov 命令执行时，应用也是以 env: unittest 启动的，读取的配置也是 config.default.js 和 config.unittest.js 合并的结果
```
