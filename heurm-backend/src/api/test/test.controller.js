exports.test = (ctx, next) => {
  ctx.body = 'TEST Controller';
};

exports.log = (ctx, next) => {
  const { method, path } = ctx.request;

  ctx.body = `${method} && ${path}`;
};
