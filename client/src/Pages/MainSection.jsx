import React from "react"
import { useSelector } from "react-redux"
import {
    NotesList
} from './feature/notes/NotesList';
import { AddNoteForm } from "./feature/notes/AddNoteForm";
import { EditNoteForm } from "./feature/notes/EditNoteForm";
import { selectIsEditingNote } from "./feature/notes/notesSlice"

const MainSection = () => {
    const isEditingNote = useSelector(selectIsEditingNote)

    return (
        <>
            <AddNoteForm />
            <NotesList />
            {isEditingNote && <EditNoteForm />}
        </>
    )
}

export default MainSection;