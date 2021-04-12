const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.use('/:id', blogController.findBlog)
// get /blogs  
// get /blogs/:id
// get /blogs/edit
router.delete ('/:id', blogController.deleteBlog)
router.post('/', blogController.newBlog)
// patch /blogs/:id

module.exports = router;