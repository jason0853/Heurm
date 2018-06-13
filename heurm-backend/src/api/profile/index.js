const Router = require('koa-router');

const profile = new Router();
const profileCtrl = require('./profile.controller');

profile.get('/', profileCtrl.getAllData);
profile.get('/:id', profileCtrl.getData);
profile.post('/', profileCtrl.create);
profile.delete('/:id', profileCtrl.delete);
profile.put('/:id', profileCtrl.replace);
profile.patch('/:id', profileCtrl.update);

module.exports = profile;
