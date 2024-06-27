// messages.js

const express = require('express');
const router = express.Router();
const pool = require('../database');

// Getting messages
router.get('/messages', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY timestamp ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get messages by receiver_username
router.get('/messages/:receiver_username', async (req, res) => {
  const receiverUsername = req.params.receiver_username;

  try {
    const result = await pool.query("SELECT * FROM messages WHERE receiver_username = $1 ORDER BY timestamp ASC", [receiverUsername]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get messages by sender_username
router.get('/messages/sent/:sender_username', async (req, res) => {
  const senderUsername = req.params.sender_username;

  try {
    const result = await pool.query("SELECT * FROM messages WHERE sender_username = $1 ORDER BY timestamp ASC", [senderUsername]);
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

// Sending a new message
router.post('/messages', async (req, res) => {
  const { sender_username, receiver_username, message } = req.body;

  try {
    const senderResult = await pool.query("SELECT user_id FROM accounts WHERE username = $1", [sender_username]);
    const receiverResult = await pool.query("SELECT user_id FROM accounts WHERE username = $1", [receiver_username]);

    const senderId = senderResult.rows[0].user_id;
    const receiverId = receiverResult.rows[0].user_id;

    await pool.query("INSERT INTO messages (sender_id, sender_username, receiver_username, message) VALUES ($1, $2, $3, $4)", [senderId, sender_username, receiver_username, message]);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
