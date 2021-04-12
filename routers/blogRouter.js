const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.use('/:id', blogController.findBlog)

router.get('/', blogController.getBlogs)
router.get('/:id', blogController.getBlog)

// get /blogs/edit
router.delete ('/:id', blogController.deleteBlog)
router.post('/', blogController.newBlog)
// patch /blogs/:id

module.exports = router;