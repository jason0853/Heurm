const Router = require('koa-router');

const api = new Router();
const books = require('./books');
const profile = require('./profile');

api.use('/books', books.routes());
api.use('/profile', profile.routes());

module.exports = api;
