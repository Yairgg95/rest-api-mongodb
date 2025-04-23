const User = require("../models/userModel");
const jwt = require("../lib/jwt");
const { compare } = require("../lib/encrypt");

async function login(email, password) {
  const user = await User.findOne({ email: email });
  
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await compare(password, user.password);
  
  if (!isPasswordValid) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ id: user._id });
  return token;
}

module.exports = { login };
