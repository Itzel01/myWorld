const db = require('../db/config')
const bcrypt = require('bcrypt')
const { response } = require('express')

class Auth {
    static login(details){
        const queryText = "SELECT * FROM users WHERE email = $1"
        return db.query(queryText, [details.email]).then(results => results.rows[0])
    }

    static register(details){
        bcrypt.hash(details.encypted_password, 10, (err, hash) => {
            if(err){
                res.send("whoops")
            } else {
                const queryText = "INSERT INTO users (user_name, email, encypted_password) VALUES ($1, $2, $3) RETURNING user_name, email"
                return db.query(queryText, [details.user_name, details.email, hash]).then(results => results.rows[0])
            }
        })
  
    }

}

module.exports = {Auth}