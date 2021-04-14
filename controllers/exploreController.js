const {Explore} = require('../models/Explore')
const {Blog} = require('../models/Blog')
const {Post} = require('../models/Post')


const getExplorePageBlogs = async (req, res) => {
    let blogs = await Blog.getBlogs();
    res.status(200);
    res.render('explore', {blogs})
}

const getExplorePagePosts = async (req, res) => {
    let posts = await Post.getPosts();
    res.status(200);
    res.render('explore', {posts})
}

module.exports = {
    getExplorePageBlogs,
    getExplorePagePosts
}