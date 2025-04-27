const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname)));

const users = {}; // { nombre: socket.id }

io.on("connection", (socket) => {
    console.log("Usuario conectado:", socket.id);

    socket.on("register", (nombre) => {
        users[nombre] = socket.id;
        socket.username = nombre;

        console.log("Usuarios conectados:", users);
        io.emit("user list", users);
    });

    socket.on("private message", ({ to, message }) => {
        const toId = users[to];
        if (toId) {
            io.to(toId).emit("private message", {
                from: socket.username,
                message
            });
        }
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado:", socket.username);
        if (socket.username && users[socket.username]) {
            delete users[socket.username];
            io.emit("user list", users);
        }
    });
});

server.listen(3000, "0.0.0.0", () => {
    console.log("Servidor escuchando en http://0.0.0.0:3000");
});
