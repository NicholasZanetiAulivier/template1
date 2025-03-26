const authService = require('./authentication-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function postLogin(request, response) {
  const { email, password } = request.body;

  if (!email) {
    throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
  }
  if (!password) {
    throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password is required');
  }

  const emailExists = await authService.emailExists(email);
  if (!emailExists) {
    throw errorResponder(errorTypes.INVALID, 'No such user with email');
  }

  const validCredentials = await authService.validate(email, password);

  if (!validCredentials) {
    throw errorResponder(
      errorTypes.INVALID_PASSWORD,
      'Registered password does not match'
    );
  }

  return response.status(200).json(await authService.getUserByEmail(email));
}

module.exports = {
  postLogin,
};
