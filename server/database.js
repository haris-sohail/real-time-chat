const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    port: 5432
});

pool.query("CREATE DATABASE real_time_chat", (err, res) => {
    console.log(err, res);
});

module.exports = pool;