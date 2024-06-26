const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "real_time_chat",
    password: "postgres",
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


const createMessagesTblQry = `
    CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES accounts(user_id),
    username VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );`

pool.query(createMessagesTblQry, (err, res) => {
    console.log(err, res);
});



module.exports = pool;