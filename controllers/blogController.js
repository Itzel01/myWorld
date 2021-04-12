const {Blog} = require('../models/Blog')

const findBlog = (req, res, next) => {
    const id = req.params.id;
    Blog.getBlog(id)
    .then(blog => {
        if(blog){
            req.blog = blog;
            req.id = id;
            next()
        } else {
            res.status(404).json({msg: "Blog doesn't exist"})
        } 
    }).catch(err => {
        res.status(500).send(err)
    })
}

module.exports = {findBlog}

