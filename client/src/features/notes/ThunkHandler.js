import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../../util/ApiHandler";
import ResponseHandler from "../../util/ResponseHandler";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = ResponseHandler.getResponse(await getNotes());
  return response.data;
});

export const addNewNote = createAsyncThunk(
  "notes/addNewNote",
  async (initialNote) => {
    const addNoteResponse = ResponseHandler.getResponse(
      await addNote(initialNote)
    );
    return addNoteResponse.data;
  }
);

export const updateOneNote = createAsyncThunk(
  "notes/updateNote",
  async (updatedNote) => {
    const updateNoteResponse = ResponseHandler.getResponse(
      await updateNote(updatedNote)
    );
    return updateNoteResponse.data;
  }
);

export const deleteOneNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId) => {
    const deleteNoteResponse = ResponseHandler.getResponse(
      await deleteNote(noteId)
    );
    return deleteNoteResponse.data;
  }
);
