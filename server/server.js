const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const routes = require("./routes/route");
const cors = require("cors");
const pool = require("./database");  
const messagesRoute = require("./routes/messages");

const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/", routes);
app.use("/api", messagesRoute);
const server = http.createServer(app);
const io = socketIo(server);

const users = {};

io.on('connection', socket => {
    socket.on('new-user', name => {
      users[socket.id] = name;
      socket.broadcast.emit('user-connected', name);
    });
  
    socket.on('send-chat-message', async data => {
      const { sender_username, receiver_username, message } = data;
      try {
        const senderResult = await pool.query("SELECT user_id FROM accounts WHERE username = $1", [sender_username]);
        const receiverResult = await pool.query("SELECT user_id FROM accounts WHERE username = $1", [receiver_username]);
  
        const senderId = senderResult.rows[0].user_id;
        const receiverId = receiverResult.rows[0].user_id;
  
        await pool.query("INSERT INTO messages (sender_id, sender_username, receiver_username, message) VALUES ($1, $2, $3, $4)", [senderId, sender_username, receiver_username, message]);
  
        socket.broadcast.emit('chat-message', { message, sender_username, receiver_username });
      } catch (err) {
        console.error(err);
      }
    });
  
    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', users[socket.id]);
      delete users[socket.id];
    });
  });
  

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(3001, () => {  
  console.log("Server is running on port 3001");
});
