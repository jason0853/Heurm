const Router = require('koa-router');

const data = new Router();
const dataCtrl = require('./data.controller');

data.get('/', dataCtrl.list);
data.post('/', dataCtrl.create);
data.delete('/:id', dataCtrl.delete);
data.put('/', dataCtrl.replace);
data.patch('/', dataCtrl.update);

module.exports = data;
