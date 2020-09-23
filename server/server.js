const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const noteRouter = require("./api/routes/NoteRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", noteRouter);
const server = app.listen(8080);

module.exports = server;
