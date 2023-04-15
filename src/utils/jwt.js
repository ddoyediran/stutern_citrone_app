const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

//const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const isTokenValid = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("User is not authorized")
        }
        req.user = {
          userId: decoded.userId,
          email: decoded.email,
        }
        next();
      });

      if (!token) {
        res.status(401);
        throw new Error("user is not authotized or token missing in the request");
      }
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message});

  }

}

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;
  // Creating a secure cookie access token
  res.cookie("token", token, {
    httpOnly: true,     //accessible only by web-server
    expires: new Date(Date.now() + oneDay),
    signed: true,
  });
  return token;
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
