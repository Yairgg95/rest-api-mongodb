const jwt = require("../lib/jwt");
const userControllers = require("../controllers/userControllers");

async function auth(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      const error = new Error("JWT is required");
      error.statusCode = 401;
      throw error;
    }
    const payload = jwt.verify(authorization);
    const user = await userControllers.getById(payload.id);
    req.user = user;
    next();
  } catch (error) {
    res.status(error.statusCode || 500);
    res.json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = auth;
