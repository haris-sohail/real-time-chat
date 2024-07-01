const { Pool } = require("pg");


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "real_time_chat",
    password: "postgres",
    port: 5432
});

const createAccTblQry = `
    CREATE TABLE IF NOT EXISTS accounts (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    );`


const createMessagesTblQry = `
    CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES accounts(user_id),
    sender_username VARCHAR(50) NOT NULL,
    receiver_username VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );`;

pool.query(createAccTblQry, (err, res) => {
    if (err) {
        console.error("Error creating accounts table:", err);
    } else {
        console.log("Accounts table created successfully");
    }
});

pool.query(createMessagesTblQry, (err, res) => {
    if (err) {
        console.error("Error creating messages table:", err);
    } else {
        console.log("Messages table created successfully");
    }
});

module.exports = pool;