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
    //PLANNING
    "Please help me draft a syllabus for an introductory course on Environmental Science",
    "Please provide a detailed lesson plan for teaching the concept of Climate Change",
    "I want you to create a study schedule with dates for me. The exact date today is 29th September 2023. I have my exam week starting on 1st December 2023 and I have exams for Environment Studies. I have “4” hours available each weekday and “8” hours available for each day of the weekend. I come back from school at “4” PM on the weekdays and have no school on weekends. Keep in mind that I should be focusing more on Final Project since it is the topic I am struggling with. After creating the schedule, break the weeks down and plan the days for me",
    //TOPIC
    "Outline an essay on Climate Change",
    "Write an engaging and informative essay about Climate Change",
    "Discuss the pros and cons of Climate Change",
    "Can you explain Green House Effect in simple terms in great details?",
    "Reorganize my text into bullet points",
    "What are some fun ways to introduce the above topic",
    "Write a song that teaches students about Climate Change",
    "Please suggest some class discussion topic on above",
    "Please suggest some in-class activities on the above",
    //RESOURCE
    "Suggest some books, articles and videos related Climate Change ",
    "I have a student with Visual Learning Style. Can you recommend specific resources or tools that cater to this learning style?",
    "Generate ideas for  experiments for Climate Change that can be conducted in a classroom setting.",
    "List some fun activities I can do with my students to explore the concept of Climate Change",
    "Can you suggest some interactive games or activities that can help reinforce learning in Climate Change?",
    "Can you generate a hypothetical scenario for Climate Change and provide details and potential implications for the topic?",
    "I'm introducing the Climate change to my class. Can you provide additional insights, examples, and real-world applications to help students explore and grasp the concept more thoroughly?",
    //EVALUATION
    "Suggest some quiz questions on Climate Change students.",
    "Could you generate a set of questions that cover subtopics, ideas, and concepts related to this Climage Change? ",
    "Can you provide some practice questions or mock exam questions and answers for Climage Change?"
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
