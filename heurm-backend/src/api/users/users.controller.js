const Account = require('models/account');

exports.getProfile = async ctx => {
  const { username } = ctx.params;

  let account;

  try {
    account = await Account.findByUsername(username);
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = {
    profile: account.profile,
    thoughtCount: account.thoughtCount
  };
};

exports.getThumbnail = async ctx => {
  const { username } = ctx.params;

  let account;
  try {
    account = await Account.findByUsername(username);
  } catch (err) {
    ctx.throw(500, err);
  }

  if (!account) {
    ctx.status = 404;
    ctx.body = '없습니다.';
    return;
  }

  ctx.redirect(account.profile.thumbnail);
};
