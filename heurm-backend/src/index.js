require('dotenv').config();

const Koa = require('Koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();
const api = require('api');

const port = process.env.PORT || 4000;

// connect to mongo db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Server is connected to DB'))
  .catch(e => console.error(e));

// set body parser
app.use(bodyParser());

// set route
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

// run server
app.listen(port, () => console.log(`Server is running on port ${port}`));
