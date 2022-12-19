const pool = require('./db-service');


class PermService {
    async getDoors(user_id) {
        const rows = await pool.query('SELECT doors.local_door_id ,doors.name  FROM list LEFT JOIN doors on list.door_id=doors.door_id WHERE user_id = ?', [user_id]);
        //console.log(rows)
        delete rows.meta;

        return { rows }
    }
    async getLogs() {
        const rows = await pool.query('SELECT * FROM logs ', []);
     //   console.log(rows)
        delete rows.meta;

        return { rows }
    }
W
}

module.exports = new PermService();