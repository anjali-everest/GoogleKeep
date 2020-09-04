import React from "react";
import { useSelector } from "react-redux";
import { NotesList } from "../features/notes/components/NotesList";
import { AddNoteForm } from "../features/notes/components/AddNoteForm";
import { EditNoteForm } from "../features/notes/components/EditNoteForm";
import { selectIsEditingNote } from "../features/notes/notesSlice";

const MainSection = () => {
  const isEditingNote = useSelector(selectIsEditingNote);

  return (
    <div className="main-section">
      <AddNoteForm />
      <NotesList />
      {isEditingNote && <EditNoteForm />}
    </div>
  );
};

export default MainSection;
