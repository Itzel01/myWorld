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

const getBlogs = async (req, res) => {
    let blogs = await Blog.getBlogs();
    res.status(200).json(blogs);
}

const getBlog = async (req, res) => {
    const id = req.params.id;
    let blog = await Blog.getBlog(id);
    res.status(200).json(blog);
}

const newBlog = async (req, res) => {
    try {
        let newBlog = await Blog.newBlog(req.body);
        if(newBlog){
            res.status(201).json(newBlog)
        }
    } catch {
        res.status(404).json({msg: "Blog wasn't made successfully"})
    }
}

const updateBlog = async (req, res) => {
    const id = req.id;
   // console.log(id)
    const updatedBlog = Object.assign(req.blog, req.body)
    console.log(updatedBlog)
    try{
        const blogInfo = await Blog.updateBlog(id, updatedBlog)
        console.log(blogInfo)
        res.status(200).json(blogInfo)
    }catch{
        res.status(500)
    }
}

const deleteBlog = async (req, res) => {
    const id = req.params.id
    await Blog.deleteBlog(id)
    res.status(200).json({msg: "Blog was successfully deleted"})
}

module.exports = {
    findBlog,
    getBlogs,
    getBlog,
    newBlog,
    updateBlog,
    deleteBlog
}