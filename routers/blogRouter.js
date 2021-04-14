const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

//gets form to make new post
router.get('/new', blogController.newBlogForm)

//middleware to find the blog
router.use('/:id', blogController.findBlog)

//gets all blogs
router.get('/', blogController.getBlogs)

//gets a specific blog
router.get('/:id', blogController.getBlog)

//gets form for blog
router.get('/:id/edit', blogController.getEditForm)

//makes a new blog
router.post('/', blogController.newBlog)

//will update a specific blog
router.patch('/:id', blogController.updateBlog)

//can delete a specific blog
router.delete ('/:id', blogController.deleteBlog)

module.exports = router;