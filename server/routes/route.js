const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const pool = require("../database");

const router = express.Router();

router.post("/register",
    [
        body("username").isLength({ min: 3 }),
        body("password").isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        // checking if user already exists in the database
        const userExists = await pool.query("SELECT * FROM accounts WHERE username = $1", [username]);
        if (userExists.rows.length > 0) {
            return res.status(409).
                json({ error: "Username already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const result = await pool.query(
                "INSERT INTO accounts (username, password) VALUES ($1, $2) RETURNING *",
                [username, hashedPassword]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            if (err.code === '23505') {
                res.status(409).json({ error: "Username already exists" });
            } else {
                res.status(500).json({ error: "Database error" });
            }
        }
    }
);

router.post("/login",
    [
        body("username").isLength({ min: 3 }),
        body("password").isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            const result = await pool.query("SELECT * FROM accounts WHERE username = $1", [username]);
            if (result.rows.length === 0) {
                return res.status(400).json({ error: "Invalid username or password" });
            }

            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).json({ error: "Invalid username or password" });
            }

            res.status(200).json({ message: "Login successful" });
        } catch (err) {
            res.status(500).json({ error: "Database error" });
        }
    }
);

module.exports = router;
