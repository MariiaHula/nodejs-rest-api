const jwt = require("jsonwebtoken");

const { httpError } = require("../helpers");

const { envsConfig } = require("../configs");
const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  if (!authorization) {
    next(httpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(httpError(401, "Not authorized, no Bearer"));
  }

  try {
    const { id } = jwt.verify(token, envsConfig.secretKey);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(httpError(401, "Not authorized, invalid user"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(httpError((error.status = 401), (error.message = "Not authorized")));
  }
};

module.exports = authenticate;
