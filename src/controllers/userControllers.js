const User = require("../models/userModel");
const { encrypt } = require("../lib/encrypt");

async function create(userData) {
  const emailFound = await User.findOne({ email: userData.email });
  if (emailFound) {
    const error = new Error("Email already exist");
    error.statusCode = 409;
    throw error;
  }

  userData.password = await encrypt(userData.password);
  const newUser = await User.create(userData);
  return newUser;
}

async function getAll() {
  const users = await User.find();
  if (users.length == 0) {
    const error = new Error("Theres no users on the database");
    error.statusCode = 404;
    throw error;
  }
  return users;
}

async function getById(id) {
  const user = await User.findById(id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
}

async function updateById(id, newData) {
  if (newData.password) {
    newData.password = await encrypt(newData.password);
  }
  const updatedUser = await User.findByIdAndUpdate(id, newData, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return updatedUser;
}

async function deleteByID(id) {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return deletedUser;
}


module.exports = { create, getAll, getById, updateById, deleteByID };
