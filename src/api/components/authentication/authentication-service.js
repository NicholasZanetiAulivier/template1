const authRepository = require('./authentication-repository');
const { passwordMatched } = require('../../../utils/password');

async function emailExists(email) {
  const user = await authRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function validate(email, password) {
  const user = await authRepository.getUserByEmail(email);
  return passwordMatched(password, user.password);
}

async function getUserByEmail(email) {
  const user = await authRepository.getUserByEmail(email);
  return user;
}

module.exports = {
  emailExists,
  validate,
  getUserByEmail,
};
