const Account = require('models/account');
const Post = require('models/post');
const Joi = require('joi');
const redis = require('redis');
const publisher = redis.createClient();
const ObjectId = require('mongoose').Types.ObjectId;

exports.write = async ctx => {
  // 유저 검증
  const { user } = ctx.request;

  if (!user) {
    ctx.status = 403;
    ctx.body = {
      message: ' Not logged in'
    };
    return;
  }

  let account;

  try {
    account = await Account.findById(user._id);
  } catch (err) {
    ctx.throw(500, err);
  }

  if (!account) {
    ctx.status = 403;
    return;
  }

  const count = account.thoughtCount + 1;

  const schema = Joi.object().keys({
    content: Joi.string()
      .min(5)
      .max(1000)
      .required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { content } = ctx.request.body;

  let post;

  try {
    post = await Post.write({
      count,
      username: user.profile.username,
      content
    });

    await account.increaseThoughtCount();
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = post;

  publisher.publish(
    'posts',
    JSON.stringify({
      type: 'posts/RECEIVE_NEW_POST',
      payload: post
    })
  );
};

exports.list = async ctx => {
  const { cursor, username } = ctx.query;

  if (cursor && !ObjectId.isValid(cursor)) {
    ctx.status = 400;
    return;
  }

  let posts = null;

  try {
    posts = await Post.list({ cursor, username });
  } catch (err) {
    ctx.throw(500, err);
  }

  const next =
    posts.length === 20
      ? `/api/posts?${username ? `username=${username}&` : ''}cursor=${
        posts[19]._id
      }`
      : null;

  ctx.body = {
    next,
    data: posts
  };
};
