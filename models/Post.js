const db = require('../db/config');

class Post {
    static findPost (id){
        const queryText = 'SELECT * FROM posts WHERE id = $1;'
        return db.query(queryText, [id]).then(results => results.rows[0]);
    } 

    static newPost(postInfo, id){
        let {mood, post_content} = postInfo
        let strippedString = mood.replace(/(<([^>]+)>)/gi, "");
        debugger
        const queryText = `INSERT INTO posts (mood, post_content, user_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *`
        return db.query(queryText, [strippedString, post_content, id]).then(results => results.rows[0])
    }

    static deletePost(id){
        const queryText = 'DELETE FROM posts WHERE id = $1'
        db.query(queryText, [id])
    }

    static getPosts () {
        const queryText = 'SELECT * FROM posts;'
        return db.query(queryText).then(results => results.rows);
    }
    
    static getPost (id) {
        const queryText = 'SELECT * FROM posts WHERE id = $1;'
        return db.query(queryText, [id]).then(results => results.rows[0]);
    }

    static updatePost(id, info) {
        const {mood, post_content, user_id} = info
        let strippedString = mood.replace(/(<([^>]+)>)/gi, "");
        const queryText = 'UPDATE posts SET mood = $1, post_content = $2, user_id = $3 WHERE id = $4 RETURNING *;'
        return db.query(queryText, [strippedString, post_content, user_id, id]).then(results => results.rows[0]);
    }
}

module.exports = {Post}