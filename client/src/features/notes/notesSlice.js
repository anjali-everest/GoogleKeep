import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotes,
  addNewNote,
  updateOneNote,
  deleteOneNote,
} from "./thunksHandler";
import {
  addNote,
  updateStatusPending,
  updateAllNotes,
  updateStatusFailed,
  updateNote,
  deleteNote,
} from "../../actions/notesActions";
import { initialState } from "./noteInitialState";

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    updateIsEditingNote(state) {
      state.isEditingNote = !state.isEditingNote;
    },
    updateEditingNoteId(state, action) {
      state.editingNoteId = action.payload;
    },
    updateDeletingNoteId(state, action) {
      state.deletingNoteId = action.payload;
    },
  },
  extraReducers: {
    [fetchNotes.pending]: updateStatusPending,
    [fetchNotes.fulfilled]: updateAllNotes,
    [fetchNotes.rejected]: updateStatusFailed,
    [addNewNote.fulfilled]: addNote,
    [updateOneNote.fulfilled]: updateNote,
    [deleteOneNote.fulfilled]: deleteNote,
  },
});

export const selectIsEditingNote = (state) => state.notes.isEditingNote;
export const selectEditingNoteId = (state) => state.notes.editingNoteId;
export const selectAllNotes = (state) => state.notes.notes;
export const selectNoteById = (state, id) =>
  state.notes.notes.find((note) => note.id === id);
export const selectApiStatus = (state) => state.notes.status;
export const selectApiError = (status) => status.notes.error;

export const {
  updateIsEditingNote,
  updateEditingNoteId,
  updateDeletingNoteId,
} = notesSlice.actions;

export default notesSlice.reducer;
