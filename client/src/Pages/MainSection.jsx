import React from "react"
import {
    NotesList
} from './feature/notes/NotesList';
import { AddNoteForm } from "./feature/notes/AddNoteForm";

const MainSection = () => {
    return (
        <>
            <AddNoteForm />
            <NotesList />
        </>
    )
}

export default MainSection;