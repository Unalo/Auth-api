const db = require('../schemas/index');

module.exports = user_service => {

    const create_user = async (username, password, first_name, last_name) => {
        await db.none('insert into users (username, password, first_name, last_name) values($1, $2, $3, $4)', [username, password, first_name, last_name]);
    }

    const find_username = async user => {
        let user_data = await db.oneOrNone('SELECT username FROM USERS WHERE username = $1', [user]);
        return user_data ? true : false;
    }

    const find_user = async id => {
        let user = await db.oneOrNone('SELECT username FROM USERS WHERE id = $1', [id]);
        return user ? true : false
    }

    const find_id = async user => {
        let user_id = await db.one('SELECT id FROM USERS WHERE username = $1', [user]);
        return user_id.id
    }

    const find_password = async user => {
        let user_password = await db.one('SELECT password FROM USERS WHERE username = $1', [user]);
        return user_password.password
    }

    const update_user = async (id, token) => {
        let user_update = await db.none('UPDATE USERS SET refresh_token = $1 WHERE id = $2', [token, id])
    }

    const find_token = async user => await db.one('SELECT refresh_token FROM USERS WHERE usename = $1', [user])

    return {
        create_user,
        find_username,
        find_id,
        find_password,
        update_user,
        find_token,
        find_user
    }

}
