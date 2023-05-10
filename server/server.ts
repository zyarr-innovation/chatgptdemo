import express from "express";
import bodyParser from 'body-parser';
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io: Server = require("socket.io")(server);

app.use(bodyParser.json());
app.use('/', express.static('../user/dist/user'));

let clientList: string[] = [
    "First String"
];
let adminList: string[] = [
    "First String",
    "Second String",
    "Third String",
    "Fourth String",
    "Fifth String",
    "Sixth String",
    "Seventh String",
    "Eigth String",
    "Ninth String",
    "Tenth String"
];

app.get("/clientlist", (req, res) => {
    console.log('getting client list')
    res.json(clientList);
});

app.get("/adminlist", (req, res) => {
    console.log('getting admin list')
    res.json(adminList);
});

app.post("/message", (req, res) => {
    const message = req.body.message;
    console.log(`Received message: ${message}`);
    clientList.push(message)
    io.emit('message', message); // Emit the message to all connected clients
    res.sendStatus(200);
});

io.on("connection", (socket) => {
    console.log(`Client connected with id ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`Client disconnected with id ${socket.id}`);
    });
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
