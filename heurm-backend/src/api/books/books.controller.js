const Joi = require('joi');
const {
  Types: { ObjectId }
} = require('mongoose');
const Book = require('models/book');

exports.create = async ctx => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    authors: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string()
          .email()
          .required()
      })
    ),
    publishedDate: Joi.date().required(),
    price: Joi.number().required(),
    tags: Joi.array().items(Joi.string().required())
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  let book;

  try {
    book = await Book.create(ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = book;
};

exports.list = async ctx => {
  let book;

  try {
    book = await Book.list();
    // .sort({ _id: -1 })
    // .limit(1);
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = book;
};

exports.get = async ctx => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = 'Id format is wrong';
    return;
  }

  let book = null;

  try {
    book = await Book.get(id);
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = book;
};

exports.remove = async ctx => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = 'Id format is wrong';
    return;
  }

  try {
    await Book.remove(id);
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.status = 204;
};

exports.replace = async ctx => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = 'Id format is wrong';
    return;
  }

  const schema = Joi.object().keys({
    title: Joi.string().required(),
    authors: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string()
          .email()
          .required()
      })
    ),
    publishedDate: Joi.date().required(),
    price: Joi.number().required(),
    tags: Joi.array().items(Joi.string().required())
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  let book = null;

  try {
    book = await Book.replace(id, ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = book;
};

exports.update = async ctx => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = 'Id format is wrong';
    return;
  }

  let book = null;

  try {
    book = await Book.update(id, ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = book;
};
