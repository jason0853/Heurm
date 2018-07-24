require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const websockify = require('koa-websocket');
const bodyParser = require('koa-bodyParser');
const mongoose = require('mongoose');
const { jwtMiddleware } = require('lib/token');

const app = websockify(new Koa());
const router = new Router();
const api = require('api');
const ws = require('./ws');

const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connecting to DB'))
  .catch(err => console.error(err));

app.use(bodyParser());
app.use(jwtMiddleware);
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());
app.ws.use(ws.routes()).use(ws.allowedMethods());

app.listen(port, () => console.log(`Server is running on port ${port}`));
