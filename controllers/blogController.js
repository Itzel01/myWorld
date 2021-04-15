const {Blog} = require('../models/Blog')
const {User} = require('../models/User')

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
    let user = await User.getUser(blog.user_id);
    res.render('editBlogForm', {user, blog, id: user.id, LinkTo: `/blogs/${blog.id}/edit`, title: "Edit Blog"})
}

const newBlogForm = async (req, res) => {
    let id = req.params.id
    let user = await User.getUser(id);
    res.render('blogForm', {user, id, LinkTo: `/blogs/${id}/new`, title: "Create New Blog"})
}

const newBlog = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        let newBlog = await Blog.newBlog(req.body, id);
        console.log(newBlog)
        if(req.query.format === 'json'){
            res.status(201).json(newBlog)
        } else {
            res.redirect(`/profile/${id}`)
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
            res.redirect(`/profile/${blog.user_id}`);
        }
    }catch{
        res.status(500)
    }
}

const deleteBlog = async (req, res) => {
   // debugger
    const user = req.blog.user_id 
    const id = req.id
    await Blog.deleteBlog(id)
    if(req.query.format === 'json'){
        res.status(200).json({msg: "Blog was successfully deleted"})
    } else {
        res.redirect(`/profile/${user}`)
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