//import modules
const express = require("express");
const clog = require('./middlewear/clog');
const webRouter = require("./routes/web/web");
const notesRoute = require("./routes/api/api");

//setting express app and port
const app = express();
PORT = process.env.PORT = 3001;

app.use(clog);

app.use(express.json())
// load static assets in public folder
app.use(express.static("public"));

//uses routes created in js files
app.use(notesRoute);
app.use(webRouter);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
