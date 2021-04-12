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

module.exports = {
    getUsers,
    getUser
}