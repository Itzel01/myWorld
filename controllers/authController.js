const {Auth} = require('../models/Auth')
const bcrypt = require('bcrypt')

const login = async(req, res) => {
    const {email, password} = req.body
    const user = await Auth.login(req.body)
    if(user){
        bcrypt.compare(password, user.encypted_password, (err, results) => {
            if(results){
                req.session.user = user
                res.redirect('/posts')
            } else {
                res.send("Whoops, one of your credentials wasn't right")
            }
        })
    } else {
        res.send("Whoops, one of your credentials wasn't right")
    }
}
const register = async (req, res) => {
    let {user_name, email, encypted_password} = req.body
    let user = await Auth.register(req.body)
    res.redirect('/login')
}

module.exports = {
    login,
    register
}