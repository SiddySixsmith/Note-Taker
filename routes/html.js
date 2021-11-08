const express = require('express');
const path = require('path');

const htmlR = express.Router();

htmlR.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "../Develop//public/index.html"));
});

htmlR.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
});

htmlR.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

module.exports = htmlR;