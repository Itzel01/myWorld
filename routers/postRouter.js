const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.use('/:id', postController.findPost)

router.get('/', postController.getPosts)
router.get('/:id', postController.getPost)

// get /blogs/edit
router.delete ('/:id', postController.deletePost)
router.post('/', postController.newPost)
// patch /blogs/:id
router.patch('/:id', postController.updatePost)

module.exports = router;