const Router = require('koa-router');
const api = new Router();
const auth = require('./auth');
const books = require('./books');
const posts = require('./posts');

api.use('/auth', auth.routes());
api.use('/books', books.routes());
api.use('/posts', posts.routes());

module.exports = api;
