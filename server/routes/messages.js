// messages.js

const express = require('express');
const router = express.Router();
const pool = require('../database');

//getting messages
router.get('/messages', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY timestamp ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Deleting a message by message_id
router.delete('/messages/:message_id', async (req, res) => {
  const messageId = req.params.message_id;

  try {
    const deleteQuery = "DELETE FROM messages WHERE message_id = $1";
    await pool.query(deleteQuery, [messageId]);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
