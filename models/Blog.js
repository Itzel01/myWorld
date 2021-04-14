const db = require('../db/config');

class Blog {
    static findBlog (id){
        const queryText = 'SELECT * FROM blogs WHERE id = $1;'
        return db.query(queryText, [id]).then(results => results.rows[0]);
    } 

    static newBlog(details){
        let {title, blog_content, user_id} = details
        console.log(title, blog_content, user_id)
        const queryText = `INSERT INTO blogs (title, blog_content, user_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *`
        return db.query(queryText, [title, blog_content, user_id]).then(results => results.rows[0])
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

    static updateBlog(id, info) {
        const queryText = 'UPDATE blogs SET title = $1, blog_content = $2, user_id = $3 WHERE id = $4 RETURNING *;'
        return db.query(queryText, [info.title, info.blog_content, info.user_id, id]).then(results => results.rows[0]);
    }
}

module.exports = {Blog}