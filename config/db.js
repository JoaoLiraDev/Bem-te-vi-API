const mysql = require('mysql2');
const pool = mysql.createPool({
    user:"root",
    password: "Dev123456",
    host: "127.0.0.1",
    port: 3306,
    database: "bem_te_vi"
});

exports.pool = pool;