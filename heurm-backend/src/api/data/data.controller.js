exports.list = (ctx, next) => {
  ctx.body = ctx.request.method;
};

exports.create = (ctx, next) => {
  ctx.body = ctx.request.method;
};

exports.delete = (ctx, next) => {
  const { id } = ctx.params;

  ctx.body = id;
};

exports.replace = (ctx, next) => {
  ctx.body = 'replace';
};

exports.update = (ctx, next) => {
  ctx.body = 'update';
};
