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

const getEditForm = async (req, res) => {
    let blog = req.blog
    res.render('editBlogForm', {blog, LinkTo: "/profile", title: "Edit Blog"})
}

const newBlogForm = (req, res) => {
    res.render('blogForm', {LinkTo: "/blogs/new", title: "Create New Blog"})
}

const newBlog = async (req, res) => {
    try {
        let newBlog = await Blog.newBlog(req.body);
        if(req.query.format === 'json'){
            res.status(201).json(newBlog)
        } else {
            res.redirect('/profile')
        }
    } catch {
        res.status(404).json({msg: "Blog wasn't made successfully"})
    }
}

const updateBlog = async (req, res) => {
    const id = req.id;
    const updatedBlog = Object.assign(req.blog, req.body)
    try{
        const blog = await Blog.updateBlog(id, updatedBlog)
        if(req.query.format === 'json'){
            res.status(200).json(blog)
        } else {
            res.redirect(`/profile`);
        }
    }catch{
        res.status(500)
    }
}

const deleteBlog = async (req, res) => {
    const id = req.params.id
    await Blog.deleteBlog(id)
    if(req.query.format === 'json'){
        res.status(200).json({msg: "Blog was successfully deleted"})
    } else {
        res.redirect('/profile')
    }
}

module.exports = {
    findBlog,
    getBlogs,
    getBlog,
    getEditForm,
    newBlogForm,
    newBlog,
    updateBlog,
    deleteBlog
}