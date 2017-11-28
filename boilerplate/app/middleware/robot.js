module.exports = (options, app) => async function robot(ctx, next) {
  const source = ctx.get('user-agent');
  const match = options.ua.some(ua => ua.test(source));
  if (match) {
    ctx.status = 403;
    ctx.message = 'Go away, robot';
  } else {
    await next();
  }
};
