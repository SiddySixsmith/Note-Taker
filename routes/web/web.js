const express = require("express");
const path = require("path");
const router = express.Router();
//
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"))
});

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/404.html"))
});

module.exports = router