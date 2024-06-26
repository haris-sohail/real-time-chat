const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "real_time_chat",
    password: "anumdatabase",
    port: 5432
});

const createTblQry = `
    CREATE TABLE IF NOT EXISTS accounts (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    );`

pool.query(createTblQry, (err, res) => {
    console.log(err, res);
});

module.exports = pool;