import express from "express";
import {
  getAllNotes,
  getOneNote,
  addNote,
  updateNote,
  deleteNote,
} from "./api/controller/noteController";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/notes", getAllNotes);
app.get("/notes/:id", getOneNote);
app.post("/notes", addNote);
app.put("/notes/:id", updateNote);
app.delete("/notes/:id", deleteNote);

app.listen(8080);

export default app;
