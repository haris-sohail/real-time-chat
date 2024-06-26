const express = require("express");
const routes = require("./routes/route");
const cors = require("cors");
const app = express();


app.use(cors());

app.use(express.json()); 

app.use("/", routes);

app.get("/", (req, res) => {
    res.send("Hello World");
})
    
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

