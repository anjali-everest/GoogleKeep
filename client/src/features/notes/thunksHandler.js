import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../../apiService/apiHandler";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  return getNotes();
});

export const addNewNote = createAsyncThunk("notes/addNewNote", async (note) => {
  return addNote(note);
});

export const updateOneNote = createAsyncThunk(
  "notes/updateNote",
  async (note) => {
    return updateNote(note);
  }
);

export const deleteOneNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId) => {
    return deleteNote(noteId);
  }
);
