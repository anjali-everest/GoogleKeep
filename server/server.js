const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const noteRouter = require("./api/routes/NoteRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", noteRouter);
const server = app.listen(process.env.PORT || 8080);

module.exports = server;
