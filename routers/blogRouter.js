const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.use('/:id', blogController.findBlog)
// get /blogs  
// get /blogs/:id
// get /blogs/edit
// delete /blogs/:id
// post /blogs
// patch /blogs/:id

module.exports = router;