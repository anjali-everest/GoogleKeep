const express = require("express");
const cors = require("cors");
const noteRouter = require("./api/routes/NoteRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", noteRouter);
app.listen(8080);

module.exports = app;
