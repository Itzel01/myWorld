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
}

module.exports = {User}