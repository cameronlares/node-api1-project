// import express from 'express'; // ES2015 modules, not supported by default by all versions of node
const express = require("express"); // CommonJS modules

const server = express();

// needed to teach express how to read JSON data from req.body
server.use(express.json()); // remember to invoke json()

server.get("/", (req, res) => {
    // always return the correct http status code based on the operation performed
    res.status(200).json({ hello: "Node 34" });
});

// see a list of lessons { id: 1, name: 'introduction to node' }
let users = [
    { id: 1, name: "Brad", bio: "Fitness Trainer" },
    { id: 2, name: "John", bio: "Web Developer at Facebook" },
    { id: 3, name: "Ashley", bio: "Hair Stylist" },
];
let nextId = 3; // hack, not needed when we start using databases

// GET /users
server.get("/users", (req, res) => {
    res.status(200).json({ data: users });
});

// POST /users -> add a lesson to the users array -> respond with the users array
server.post("/users", function (req, res) {
    // client will axios.post('https://api.com/users', data);
    const data = req.body;

    users.push({ id: nextId++, ...data });

    res.status(201).json({ data: users });
});

server.put("/users/:id", (req, res) => {
    // find the lesson
    // anything read from the URL will be a string, we need to convert it to a number
    const id = Number(req.params.id);
    const changes = req.body;

    const found = users.find(l => l.id === id);

    if (found) {
        // update the lesson with data received in the body
        Object.assign(found, changes);

        res.status(200).json({ data: users });
    } else {
        res.status(404).json({ message: "Lesson not found" });
    }
    // resturn the users array
});

server.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    users = users.filter(l => l.id !== id);

    res.status(200).json({ data: users });
});

const port = 5000;
server.listen(port, () => console.log("api running"));

// npm run server
