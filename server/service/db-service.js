const mariadb = require('mariadb');
console.log("CONNECT DB"+process.env.DB_HOST);
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    //debug: true
})

pool.getConnection((err, connection) => {
    if(err) {
       console.error(err.code);
    }
    if(connection) connection.release();
})

module.exports = pool;