const db = require('../db/config');

class Blog {
    static findBlog (id){
        const queryText = 'SELECT * FROM blogs WHERE id = $1;'
        return db.query(queryText, [id]).then(results => results.rows[0]);
    } 

    static newBlog(details){
        const queryText = `INSERT INTO blogs (title, blog_content, user_id) VALUES ($1, $2, $3) RETURNING *`
        return db.query(queryText, [details.title, details.blog_content, details.user_id]).then(results => results.rows[0])
    }

    static deleteBlog(id){
        const queryText = 'DELETE FROM blogs WHERE id = $1'
        db.query(queryText, [id])
    }

    static getBlogs () {
        const queryText = 'SELECT * FROM blogs;'
        return db.query(queryText).then(results => results.rows);
    }
    
    static getBlog (id) {
        const queryText = 'SELECT * FROM blogs WHERE id = $1;'
        return db.query(queryText, [id]).then(results => results.rows[0]);
    }
}

module.exports = {Blog}