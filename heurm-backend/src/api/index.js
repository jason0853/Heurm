const Router = require('koa-router');

const api = new Router();
const data = require('./data');
const test = require('./test');

api.use('/data', data.routes());
api.use('/test', test.routes());

module.exports = api;
