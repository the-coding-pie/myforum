import jwt from "jsonwebtoken";

// authMiddleware which checks if there is a valid access token in each req
export const authMiddleware = async (req, res, next) => {
  const header = await req.headers["authorization"];
  const token = await header && header.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      success: false,
      data: {},
      message: "Invalid token",
      statusCode: 401,
    });
  }

  //   verify token, user -> {_id: 232, username: ""}
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(401).send({
        success: false,
        data: {},
        message: "Invalid access token",
        statusCode: 401,
      });
    }

    req.user = user;
    next();
  });
};

// semi protected middleware which attaches the user with the req if valid token exists, else just pass the normal req
export const semiAuthMiddlware = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  // if no token at all, just pass
  if (!token) {
    return next();
  }

  // he has token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    // that user has an accessToken, but may have expired
    if (err) {
      return res.status(401).send({
        success: false,
        data: {},
        message: "Invalid access token",
        statusCode: 401,
      });
    }

    req.user = user;
    next();
  });
};
