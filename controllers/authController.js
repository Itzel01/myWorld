const {Auth} = require('../models/Auth');
const {User} = require('../models/User')
const bcrypt = require('bcrypt')

const getLogin = async (req, res) => {
    res.render('login')
}

const getRegister = async (req, res) => {
    res.render('register')
}

const login = async(req, res) => {
    const {email, password} = req.body
    const user = await Auth.login(req.body)
    // const allPosts = await User.getAllPosts();
    // const allBlogs = await User.getAllBlogs();
    if(user){
        bcrypt.compare(password, user.encrypted_password, (err, results) => {
            if(results){
                req.session.user = user
                res.redirect(`/explore`)
            } else {
                res.status(401)
                res.send("Whoops, one of your credentials wasn't right")
            }
        })
    } else {
        res.send("Whoops, one of your credentials wasn't right")
    }
}
const register = async (req, res) => {
    let {first_name, last_name, user_name, email, encrypted_password} = req.body
    let user = await Auth.register(req.body)
    res.redirect('/login')
}


const getExplore = async (req, res) => {
    const allPosts = await User.getAllPosts();
    const allBlogs = await User.getAllBlogs();
    let id = req.session.user.id
        //debugger
    try{
        if(req.query.format === 'json'){
            res.status(200).json(allPosts)
        } else {
            res.render('explore', {id, allPosts, allBlogs, LinkTo: "/explore", title: "Welcome To MyWorld"})
        }
    } catch {
        res.status(500)
    }
}

const getProfile = async (req, res) => {
    debugger
    //console.log(req.session.user.id)
    let id = req.params.id
    let posts = await Auth.getPosts(id);
    let blogs = await Auth.getBlogs(id);
    try{
        if(req.query.format === 'json'){
            res.status(200).json(posts)
        } else {
            res.render('profile', {id: posts.user_id, posts, blogs, LinkTo: '/profile', title: "User's profile", })
        }
    } catch {
        res.status(500)
    }
}

module.exports = {
    getLogin,
    getRegister,
    login,
    register,
    getExplore,
    getProfile
}