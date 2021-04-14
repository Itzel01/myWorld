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

const newPost = async (req, res) => {
    console.log(req.body)
    try {
        let newPost = await Post.newPost(req.body)
        console.log(newPost)
        if(newPost){
            res.status(201).json(newPost)
        }
    }
    catch {
        res.status(404).json({msg: "Post wasn't made successfully"})
    }
}

const updatePost = async (req, res) => {
    const id = req.id;
    const updatedPost = Object.assign(req.post, req.body)
    try{
        const postInfo = await Post.updatePost(id, updatedPost)
        console.log(postInfo)
        res.status(200).json(postInfo)
    }catch{
        res.status(500)
    }
}

const deletePost = async (req, res) => {
    const id = req.id
    await Post.deletePost(id)
    res.status(200).json({msg: "Post was successfully deleted"})
}

module.exports = {
    findPost,
    getPosts,
    getPost,
    newPost,
    updatePost,
    deletePost
}