const Router = require('koa-router');

const test = new Router();
const testCtrl = require('./test.controller');

test.get('/', testCtrl.test);
test.post('/', testCtrl.log);

module.exports = test;
