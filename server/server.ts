import express from "express";
import bodyParser from 'body-parser';
import http from "http";
import { Server } from "socket.io";
import path from 'path';

const app = express();
const server = http.createServer(app);
const io: Server = require("socket.io")(server);

app.use(bodyParser.json());
app.use(express.static('../user/dist/user'));

let clientList: string[] = [
    "https://chat.openai.com\nhttps://wokwi.com"
];
let adminList: string[] = [
    "Suggest some interesting activities at the end of our High School Sports event",
    "Draft a leave and license contract with fifty thousand deposit and twelve thousand monthly rent",
    "Write a small peom for programmer falling in love with keyboard",
    "Esp32 board, LED is connected on pin 12, write a micropython code for LED blinking",
    "Esp32 board, DHT22 sensor connected on pin 15. Write a microphython for sensing temparature and humidity",
    "Esp32 board, LED connected on pin 12, DHT22 connected on pin 15. Write a micropython code with WIFI connected with ssid Wokwi-GUEST. Add MQTT support with LED subscribing on topic device/led and DHT22 temp publishing on device/temp.",
    "Reorganize the above code and make it more beautiful",
    "Add debugging statement in the code",
    "Refactor it into class",
    "Document the class",
    "Comment the class",
    "Write unit test to test this class"
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


// Route all API requests to index.html
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../user/dist/user/index.html'));
});

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '../../user/dist/user/index.html'));
});

// Serve the Angular static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../user/dist/user/index.html'));
});


const port = 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
