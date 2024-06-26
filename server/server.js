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

  socket.on('send-chat-message', async message => {
    const username = users[socket.id];
    try {
      const userResult = await pool.query("SELECT user_id FROM accounts WHERE username = $1", [username]);
      const userId = userResult.rows[0].user_id;
      await pool.query("INSERT INTO messages (user_id, username, message) VALUES ($1, $2, $3)", [userId, username, message]);
      socket.broadcast.emit('chat-message', { message, name: username });
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
