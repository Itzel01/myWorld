const {Post} = require('../models/Post')

const findPost = (req, res, next) => {
    const id = req.params.id;
    Post.getPost(id)
    .then(post => {
        if(post){
            req.post = post;
            req.id = id;
            next()
        } else {
            res.status(404).json({msg: "Post doesn't exist"})
        } 
    }).catch(err => {
        res.status(500).send(err)
    })
}

const getPosts = async (req, res) => {
    let posts = await Post.getPosts();
    res.status(200).json(posts);
}

const getPost = async (req, res) => {
    const id = req.params.id;
    let post = await Post.getPost(id);
    res.status(200).json(post);
}

const getEditForm = async (req, res) => {
    let post = req.post
    //let id = req.params.id
    res.render('postEditForm', {post, LinkTo: "/profile", title: "Edit Post"})
}

const newPostForm = async (req, res) => {
   // debugger
    let id = req.params.id
    console.log(id)
    res.render('postForm', {id, LinkTo: `/posts/${id}/new`, title: "Create New Post"})
}

const newPost = async (req, res) => {
    const id = req.params.id
    try {
        let newPost = await Post.newPost(req.body, id)
        //debugger
        console.log(newPost)
        if(req.query.format === 'json'){
            res.status(201).json(newPost)
        } else {
            res.redirect(`/profile/${id}`)
        }
    } catch {
        res.status(404).json({msg: "Post wasn't made successfully"})
    }
}

const updatePost = async (req, res) => {
    const id = req.id;
    const updatedPost = Object.assign(req.post, req.body)
    try{
        const post = await Post.updatePost(id, updatedPost)
        if(req.query.format === 'json'){
            res.status(200).json(post)
        } else {
            res.redirect(`/profile`);
        }
    }catch{
        res.status(500)
    }
}

const deletePost = async (req, res) => {
    const id = req.id
    await Post.deletePost(id)
    if(req.query.format === 'json'){
        res.status(200).json({msg: "Post was successfully deleted"})
    } else {
        res.redirect('/profile')
    }
    
}

module.exports = {
    findPost,
    getPosts,
    getPost,
    getEditForm,
    newPostForm,
    newPost,
    updatePost,
    deletePost
}