const Router = require('koa-router');
const redis = require('redis');

const subscriber = redis.createClient();

subscriber.subscribe('posts');

const ws = new Router();

let counter = 0;

ws.get('/ws', (ctx, next) => {
  const listener = (channel, message) => {
    ctx.websocket.send(message);
  };

  subscriber.on('message', listener);

  ctx.websocket.on('close', () => {
    subscriber.removeListener('message', listener);
  });
});

module.exports = ws;
