const {User} = require('../models/User')

// router.get('/', userController.getUsers)
// router.get('/:id', userController.getUser)
const getUsers = async (req, res) => {
    let users = await User.getUsers();
    res.status(200).json(users);
}

const getUser = async (req, res) => {
    const id = req.params.id;
    let user = await User.getUser(id);
    res.status(200).json(user);
}

// const getExplore = async (req, res) => {
//     let allPosts = await User.getAllPosts();
//     let allBlogs = await User.getAllBlogs();
//     try{
//         if(req.query.format === 'json'){
//             res.status(200).json(allPosts)
//         } else {
//             res.render('explore', {allPosts, allBlogs, LinkTo: "/explore", title: "Welcome To MyWorld"})
//         }
//     } catch {
//         res.status(500)
//     }
// }

// const getProfile = async (req, res) => {
//     let posts = await User.getPosts();
//     let blogs = await User.getBlogs();
//     try{
//         if(req.query.format === 'json'){
//             res.status(200).json(posts)
//         } else {
//             res.render('profile', {posts, blogs, LinkTo: "/profile", title: "User's profile"})
//         }
//     } catch {
//         res.status(500)
//     }
// }

module.exports = {
    getUsers,
    getUser
    // getExplore,
    // getProfile
}