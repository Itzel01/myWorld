const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.getLogin)

router.get('/register', authController.getRegister)

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/explore', authController.getExplore)

router.get('/profile', authController.getProfile)

module.exports = router