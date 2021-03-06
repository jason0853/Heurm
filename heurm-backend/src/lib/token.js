const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}

exports.generateToken = function(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: '7d'
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

exports.jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');

  if (!token) return next();

  try {
    const decoded = await decodeToken(token);

    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const { _id, profile } = decoded;
      const freshToken = await generateToken({ _id, profile });

      ctx.cookies.set('access_token', freshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      });
    }

    ctx.request.user = decoded;
  } catch (err) {
    ctx.request.user = null;
  }

  return next();
};
