//import modules
const express = require("express");
const { Router } = require("express");
const notes = require("./Develop/db/db.json")
const clog = require('./middlewear/clog');

//setting express app and port
const app = express();
PORT = process.env.PORT = 3001;

app.use(clog);

const apiRouter = require("./routes/api");
const htmlroute = require("./routes/html");

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(".Develop/public"));
app.use(apiRouter);
app.use(htmlroute);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
