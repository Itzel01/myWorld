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

const newBlog = async (req, res) => {
    try {
        let {title, blog_content, user_id} = req.body
        let newBlog = await Blog.newBlog(req.body)
        if(newBlog){
            res.status(201).json(newBlog)
    }
    }catch(err){
        res.status(404).json({msg: "Blog wasn't made successfully"})
    }
}

const deleteBlog = async (req, res) => {
    const id = req.params.id
    await Blog.deleteBlog(id)
    res.status(200).json({msg: "Blog was successfully deleted"})
}

module.exports = {
    findBlog,
    newBlog,
    deleteBlog
}

