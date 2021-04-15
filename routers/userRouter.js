const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// get /users
// get /users/:id

router.get('/', userController.getUsers)

router.get('/:id', userController.getUser)

// router.get('/explore', userController.getExplore)

// router.get('/profile', userController.getProfile)

module.exports = router;