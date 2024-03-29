const authController = require('express').Router();
const { body, validationResult } = require('express-validator');
const { parseError } = require('../util/parser');

const {
  register,
  login,
  logout,
  getProfileInfo,
} = require('../services/userService');

authController.post(
  '/register',
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 3 })
    .withMessage('Password must be at least 3 characters long'),

  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      if (errors.length > 0) {
        throw errors;
      }
      if (req.body.password != req.body.repass) {
        throw new Error("Passwords don't match!");
      }

      const token = await register(
        req.body.tel,
        req.body.email,
        req.body.username,
        req.body.password
      );
      res.json(token);
    } catch (error) {
      const message = parseError(error);
      res.status(400).json({ message });
    }
  }
);

authController.post('/login', async (req, res) => {
  try {
    const token = await login(req.body.email, req.body.password);
    res.json(token);
  } catch (error) {
    const message = parseError(error);
    res.status(401).json({ message });
  }
});

// TODO make it work
authController.get('/profile', async (req, res) => {
  try {
    if (req.user) {
      const token = await getProfileInfo(req.body.user);
      res.json(token);
    } else {
      res.status(401).json({ message: 'Welcome for the first time!' });
    }
  } catch (error) {
    const message = parseError(error);
    res.status(401).json({ message });
  }
});

authController.get('/logout', async (req, res) => {
  const token = req.token;

  await logout(token);
  res.status(204).end();
});

module.exports = authController;
