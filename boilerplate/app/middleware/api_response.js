module.exports = (options, app) => async function apiResponse(ctx, next) {
  const {
    apiCode
  } = app;
  try {
    await next();
    if (ctx.response.status === 404 && ctx.body === undefined) {
      ctx.response.status = 404; // 手动设置
      ctx.body = ctx.buildReturnObject(
        apiCode.retCodeEnum.success,
        apiCode.errCodeEnum.notReturnData, '此接口不存在或无数据返回', null
      );
    }
  } catch (e) {
    ctx.cwLogger.error(e, 'current url -->>', ctx.url);

    // if (e === undefined || e === null) {
    //   e = new Error('未定义的错误')
    // }

    if (e.retCode === undefined) {
      e.retCode = apiCode.retCodeEnum.serverError;
    }
    if (e.errCode === undefined) {
      e.errCode = apiCode.errCodeEnum.autoSnapError;
    }

    ctx.body = ctx.buildReturnObject(e.retCode, e.errCode, e.message || '系统繁忙...');
  }
};
