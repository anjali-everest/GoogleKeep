import express from "express";
import cors from "cors";
import noteRouter from "./api/routes/NoteRoutes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", noteRouter);
app.listen(8080);

export default app;
