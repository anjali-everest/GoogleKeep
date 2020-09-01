import React from "react"
import { useSelector } from "react-redux"
import {
    NotesList
} from './feature/notes/NotesList';
import { AddNoteForm } from "./feature/notes/AddNoteForm";
import { EditNoteForm } from "./feature/notes/EditNoteForm";

const MainSection = () => {
    const isEditingNote = useSelector(state => state.notes.isEditingNote)

    return (
        <>
            <AddNoteForm />
            <NotesList />
            {isEditingNote && <EditNoteForm />}
        </>
    )
}

export default MainSection;