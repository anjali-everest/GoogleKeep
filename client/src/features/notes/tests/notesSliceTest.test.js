import reducer, {
  selectApiStatus,
  updateIsEditingNote,
  updateEditingNoteId,
  updateDeletingNoteId,
  selectIsEditingNote,
  selectEditingNoteId,
  selectAllNotes,
  selectNoteById,
  selectApiError,
} from "../notesSlice.js";
import { initialState } from "../noteInitialState";
import {
  fetchNotes,
  updateOneNote,
  deleteOneNote,
  addNewNote,
} from "../thunkHandler";

describe("notesSlice tests", () => {
  describe("state", () => {
    it("should return the initial state on first run", () => {
      const nextState = initialState;
      const result = reducer(undefined, {});
      expect(result).toEqual(nextState);
    });
  });

  describe("reducers and actions", () => {
    it("should update the isEditingNote when called updateIsEditingNote", () => {
      const updatedState = {
        notes: reducer(initialState, updateIsEditingNote(initialState)),
      };

      expect(selectIsEditingNote(updatedState)).toEqual(true);
    });

    it("should update the given editingNoteId when called updateEditingNoteId", () => {
      const updatedState = {
        notes: reducer(initialState, updateEditingNoteId(1)),
      };
      expect(selectEditingNoteId(updatedState)).toEqual(1);
    });

    it("should update the given deletingNoteId when called updateDeletingNoteId", () => {
      const updatedState = reducer(initialState, updateDeletingNoteId(1));

      expect(updatedState.deletingNoteId).toEqual(1);
    });

    it("should properly set the state when fetch notes is pending", () => {
      const action = { type: fetchNotes.pending.type };
      const updatedState = { notes: reducer(initialState, action) };

      expect(selectApiStatus(updatedState)).toEqual("loading");
    });

    it("should properly set the state when fetch notes is done", () => {
      const fetchedNotes = [
        { id: 1, title: "title", content: "content" },
        { id: 2, title: "title2", content: "content2" },
      ];
      const action = {
        type: fetchNotes.fulfilled.type,
        payload: fetchedNotes,
      };
      const updatedState = { notes: reducer(initialState, action) };

      expect(selectApiStatus(updatedState)).toEqual("succeeded");
      expect(selectAllNotes(updatedState)).toEqual(fetchedNotes);
    });

    it("should properly set the state when fetch notes is rejected", () => {
      const action = {
        type: fetchNotes.rejected.type,
        error: { message: "Failed to fetch" },
      };
      const updatedState = { notes: reducer(initialState, action) };

      expect(selectApiStatus(updatedState)).toEqual("failed");
      expect(selectApiError(updatedState)).toEqual("Failed to fetch");
    });

    it("should properly set the state when addNote is done", () => {
      initialState.notes = [{ id: 1, title: "title", content: "content" }];
      const noteToAdd = {
        id: 2,
        title: "secondNoteTitle",
        content: "secondNoteContent",
      };
      const action = {
        type: addNewNote.fulfilled.type,
        payload: noteToAdd,
      };
      const updatedState = { notes: reducer(initialState, action) };
      expect(selectNoteById(updatedState, 2)).toEqual(noteToAdd);
      expect(selectAllNotes(updatedState).length).toEqual(2);
    });

    it("should properly set the state when updateNote is done", () => {
      initialState.notes = [{ id: 1, title: "title", content: "content" }];
      const noteToUpdate = {
        id: 1,
        title: "updatedTitle",
        content: "updatedContent",
      };
      const action = {
        type: updateOneNote.fulfilled.type,
        payload: noteToUpdate,
      };
      const updatedState = { notes: reducer(initialState, action) };
      expect(selectNoteById(updatedState, 1)).toEqual(noteToUpdate);
    });

    it("should properly set the state when deleteNote is done", () => {
      initialState.notes = [
        { id: 1, title: "title", content: "content" },
        { id: 2, title: "title2", content: "content2" },
        { id: 3, title: "title3", content: "content3" },
      ];
      initialState.deletingNoteId = 2;
      const action = {
        type: deleteOneNote.fulfilled.type,
      };
      const updatedState = { notes: reducer(initialState, action) };
      expect(selectNoteById(updatedState, 2)).toEqual(undefined);
    });
  });
});
