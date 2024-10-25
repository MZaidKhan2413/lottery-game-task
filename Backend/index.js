const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const gameRoutes = require("./routes/gameRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/lottery-game")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/game", gameRoutes);

const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`));

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New user connected: ", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});

module.exports =  {io};