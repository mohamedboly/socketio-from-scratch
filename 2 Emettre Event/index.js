import express from "express";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { dirname, join } from "path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté");

  // Envoyer un message au client
  socket.emit("messageServeur", "Bienvenue cher client");

  socket.on("messageClient", (data) => {
    console.log(`message reçu du client : ${data}`);
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

server.listen(8000, () => {
  console.log("Le serveur a démarré : http://localhost:8000");
});
