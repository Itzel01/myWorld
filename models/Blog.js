const db = require('../db/config');

class Blog {
    static findBlog (id){
        const queryText = 'SELECT * FROM blogs WHERE id = $1;'
        return db.query(queryText, [id]).then(results => results.rows[0]);
    } 
}

module.exports = {Blog}