const bcryptjs = require("bcryptjs");

const SALT_ROUNDS = 10;

function encrypt(text) {
  return bcryptjs.hash(text, SALT_ROUNDS);
}

function compare(plainText, hash) {
  return bcryptjs.compare(plainText, hash);
}


module.exports = { encrypt, compare };
