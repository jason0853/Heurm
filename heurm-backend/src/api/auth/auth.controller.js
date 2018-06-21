const Joi = require('joi');
const Account = require('models/account');

exports.localRegister = async ctx => {
  // 유효성 검사
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(6)
      .max(15)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  // 중복 계정 체크
  let existing = null;

  try {
    existing = await Account.findByEmailOrUsername(ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }

  if (existing) {
    ctx.status = 409;
    ctx.body = {
      message:
        existing.email === ctx.request.body.email
          ? '동일한 이메일 계정이 있습니다.'
          : '동일한 유저네임이 존재합니다.'
    };
    return;
  }

  // 계정 저장
  let account = null;

  try {
    account = await Account.localRegister(ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }

  // 토큰 발행
  let token = null;

  try {
    token = await account.generateToken();
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.cookies.set('access_token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  ctx.body = account.profile;
};
4;

exports.localLogin = async ctx => {
  const { email, password } = ctx.request.body;

  // 유효성 검사
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  });

  const result = Joi.validate({ email, password }, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  // 계정 이메일 체크
  let user = null;

  try {
    user = await Account.findByEmail(email);
  } catch (err) {
    ctx.throw(500, err);
  }

  if (!user) {
    ctx.status = 403;
    ctx.body = {
      message: '이메일 계정이 존재하지 않습니다.'
    };
    return;
  }

  // 패스워드 체크
  let pw = null;

  try {
    pw = await user.validatePassword(password);
  } catch (err) {
    ctx.throw(500, err);
  }

  if (!pw) {
    ctx.status = 403;
    ctx.body = {
      message: '패스워드가 틀렸습니다. 다시 한 번 입력해주세요.'
    };
    return;
  }

  // 토큰 발행
  let token = null;

  try {
    token = await user.generateToken();
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.cookies.set('access_token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  ctx.body = user.profile;
};

exports.exists = async ctx => {
  const { key, value } = ctx.params;

  // 계정 확인
  let account = null;

  try {
    account = await (key === 'email'
      ? Account.findByEmail(value)
      : Account.findByUsername(value));
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = {
    exists: account !== null
  };
};

exports.logout = async ctx => {
  ctx.cookies.set('access_token', null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
};

exports.check = ctx => {
  const { user } = ctx.request;

  if (!user) {
    ctx.status = 403;
    return;
  }

  ctx.body = user.profile;
};
