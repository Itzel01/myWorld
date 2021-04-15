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
    const allPosts = await User.getAllPosts();
    const allBlogs = await User.getAllBlogs();
    if(user){
        bcrypt.compare(password, user.encrypted_password, (err, results) => {
            if(results){
                req.session.user = user
                //res.redirect(`/explore/${user.id}/`)
                res.render('explore', {user, allPosts, allBlogs, LinkTo: "/explore", title: "Welcome To MyWorld"})
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
    let allPosts = await User.getAllPosts();
    let allBlogs = await User.getAllBlogs();
    debugger
    try{
        if(req.query.format === 'json'){
            res.status(200).json(allPosts)
        } else {
            // res.redirect(`/explore`)
            res.render('explore', {allPosts, allBlogs, LinkTo: "/explore", title: "Welcome To MyWorld"})
        }
    } catch {
        res.status(500)
    }
}

const getProfile = async (req, res) => {
    //console.log(req.session)
    let id = req.params.id
    let posts = await Auth.getPosts(id);
    let blogs = await Auth.getBlogs(id);
    try{
        if(req.query.format === 'json'){
            res.status(200).json(posts)
        } else {
            res.render('profile', {id, posts, blogs, LinkTo: '/profile', title: "User's profile", })
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