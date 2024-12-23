import express from "express";
import { fileURLToPath } from "url";
import http from "http";
import { dirname, join } from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/hello", (req, res) => {
  res.send("Hello");
});


io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté");

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

server.listen(8080, () => {
  console.log("Le serveur a démarré : http://localhost:8000");
});
