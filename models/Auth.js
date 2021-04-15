const db = require('../db/config')
const bcrypt = require('bcrypt')
const { response } = require('express')

class Auth {
    static login(details){
        const queryText = "SELECT * FROM users WHERE email = $1"
        return db.query(queryText, [details.email]).then(results => results.rows[0])
    }

    static register(details){
        bcrypt.hash(details.encrypted_password, 10, (err, hash) => {
            if(err){
                res.send("whoops")
            } else {
                const queryText = "INSERT INTO users (first_name, last_name, user_name, email, encrypted_password) VALUES ($1, $2, $3, $4, $5) RETURNING user_name, email"
                return db.query(queryText, [details.first_name, details.last_name, details.user_name, details.email, hash]).then(results => results.rows[0])
            }
        })
  
    }
    static getPosts (id) {
        const queryText = 'SELECT * FROM posts WHERE posts.user_id = $1;'
        return db.query(queryText, [id]).then(results => results.rows);
    }
    
    static getBlogs (id) {
        const queryText = 'SELECT * FROM blogs WHERE blogs.user_id = $1;'
        return db.query(queryText, [id]).then(results => results.rows);
    }

}

module.exports = {Auth}