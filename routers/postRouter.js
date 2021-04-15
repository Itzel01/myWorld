const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

//gets form to make new post
router.get('/:id/new', postController.newPostForm)

//makes a new post
router.post('/:id', postController.newPost)

//middleware to find the post
router.use('/:id', postController.findPost)

//gets all posts
router.get('/', postController.getPosts)

//gets a specific post
router.get('/:id', postController.getPost)

//gets form for post
router.get('/:id/edit', postController.getEditForm)

//will update a specific post
router.patch('/:id', postController.updatePost)

//can delete a specific post
router.delete ('/:id', postController.deletePost)


module.exports = router;