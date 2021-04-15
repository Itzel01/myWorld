const db = require('../db/config');

class User {
    static getUsers () {
        const queryText = 'SELECT * FROM users;'
        return db.query(queryText).then(results => results.rows);
    }
    static getUser (id) {
        const queryText = 'SELECT * FROM users WHERE id = $1;'
        return db.query(queryText, [id]).then(results => results.rows[0]);
    }

    static getAllPosts () {
        const queryText = 'SELECT * FROM users join posts ON users.id = posts.user_id'
        return db.query(queryText).then(results => results.rows);
    }

    static getAllBlogs () {
        const queryText = 'SELECT * FROM users join blogs ON users.id = blogs.user_id'
        return db.query(queryText).then(results => results.rows);
    }

    // static getPosts () {
    //     const queryText = 'SELECT * FROM posts;'
    //     return db.query(queryText).then(results => results.rows);
    // }

    // static getBlogs () {
    //     const queryText = 'SELECT * FROM blogs;'
    //     return db.query(queryText).then(results => results.rows);
    // }
}

module.exports = {User}