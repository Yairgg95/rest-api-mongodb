const User = require("../models/userModel");
const jwt = require("../lib/jwt");
const { compare } = require("../lib/encrypt");

async function login(email, password) {
  const user = await User.findOne({ email: email });
  console.log(user)
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isPasswordValid = await compare(password, user.password);
  console.log(isPasswordValid)
  if (!isPasswordValid) {
    const error = new Error("Invalid data");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ id: user._id });
  return token;
}

module.exports = { login };
