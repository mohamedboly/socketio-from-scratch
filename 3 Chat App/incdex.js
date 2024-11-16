
import express from "express";
import http from "http";
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(join(process.cwd(), "public", "index.html"));
});


io.on("connection", (socket) => {
  console.log("Utilisateur Connecté Avec Succès");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Utilisateur Déconnecté");
  });
});


server.listen(8080, () =>
  console.log("Démarrage du serveur sur le port :8080")
);
