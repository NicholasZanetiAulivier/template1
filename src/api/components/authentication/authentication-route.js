const express = require('express');

const authController = require('./authentication-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/authentication', route);

  // POST login
  route.post('/login', authController.postLogin);
};
