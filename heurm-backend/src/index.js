const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const api = require('./api');

router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(8888, () => {
  console.log('Server is running on port 8888');
});
