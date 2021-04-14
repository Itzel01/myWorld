const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


//middleware to find the post
router.use('/:id', postController.findPost)

//gets all posts
router.get('/', postController.getPosts)

//gets a specific post
router.get('/:id', postController.getPost)

//gets form for post
router.get('/:id/edit', postController.getEditForm)

//gets form to make new post
router.get('/new', postController.newPostForm)

//makes a new post
router.post('/', postController.newPost)

//will update a specific post
router.patch('/:id', postController.updatePost)

//can delete a specific post
router.delete ('/:id', postController.deletePost)


module.exports = router;