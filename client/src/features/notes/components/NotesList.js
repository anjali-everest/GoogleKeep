import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllNotes, selectApiStatus, selectApiError } from "./../notesSlice";
import { fetchNotes } from "../thunksHandler";
import { Note } from "./Note";

export const NotesList = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectAllNotes);
  const noteStatus = useSelector(selectApiStatus);
  const error = useSelector(selectApiError);

  useEffect(() => {
    if (noteStatus === "idle") {
      dispatch(fetchNotes());
    }
  }, [noteStatus, dispatch]);

  return (
    <section className="notes-list">
      {noteStatus === "loading" && <div className="loader">Loading...</div>}
      {noteStatus === "succeeded" &&
        notes &&
        notes.length !== 0 &&
        notes.map((note) => <Note key={note.id} note={note} />)}
      {noteStatus === "failed" && <div>{error}</div>}
    </section>
  );
};
