const {
  Types: { ObjectId }
} = require('mongoose');
const Joi = require('joi');
const Profile = require('models/profile');

exports.getAllData = async ctx => {
  let profile;

  try {
    profile = await Profile.find();
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = profile;
};

exports.getData = async ctx => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = { message: 'Id format is wrong' };
    return;
  }

  let profile;

  try {
    profile = await Profile.findById(id);
  } catch (e) {
    return ctx.throw(500, e);
  }

  if (!profile) {
    ctx.status = 404;
    ctx.body = "Can't find that data";
    return;
  }

  ctx.body = profile;
};

exports.create = async ctx => {
  const { person, skills } = ctx.request.body;

  const schema = Joi.object().keys({
    person: Joi.object().keys({
      name: Joi.string().required(),
      age: Joi.number().required()
    }),
    skills: Joi.array().items(Joi.string().required())
  });

  const result = Joi.validate({ person, skills }, schema);

  if (result.error) {
    ctx.status = 404;
    ctx.body = result.error;
    return;
  }

  const profile = new Profile({
    person,
    skills
  });

  try {
    await profile.save();
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = profile;
};

exports.delete = async ctx => {
  const { id } = ctx.params;

  // check id validation
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = {
      message: 'Id format is wrong!'
    };
    return;
  }

  // delete
  try {
    await Profile.findByIdAndRemove(id);
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = {
    message: 'Successfully deleted!'
  };
};

exports.replace = async ctx => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = { message: 'Id format is wrong' };
    return;
  }

  const { person, skills } = ctx.request.body;

  const schema = Joi.object().keys({
    person: Joi.object().keys({
      name: Joi.string().required(),
      age: Joi.number().required()
    }),
    skills: Joi.array().items(Joi.string().required())
  });

  const result = Joi.validate({ person, skills }, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  let profile;

  try {
    profile = await Profile.findByIdAndUpdate(
      id,
      { person, skills },
      {
        upsert: true,
        new: true
      }
    );
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = profile;
};

exports.update = async ctx => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = { message: 'ID format is wrong!' };
    return;
  }

  let profile;

  try {
    profile = await Profile.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    });
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = profile;
};
