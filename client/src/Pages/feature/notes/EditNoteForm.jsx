import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { updateIsEditingNote, selectEditingNoteId, selectNoteById } from "./notesSlice"
import { fetchNotes, updateOneNote } from "./ThunkHandler"

export const EditNoteForm = () => {
    const noteId = useSelector(selectEditingNoteId)
    const note = useSelector(state => selectNoteById(state, parseInt(noteId)))

    const dispatch = useDispatch()

    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onSaveNoteClicked = () => {
        if (title && content) {
            dispatch(updateOneNote({ id: noteId, title, content }))
            dispatch(updateIsEditingNote())
            dispatch(fetchNotes())
        }
    }

    return (
        <div className="edit-note-form" >
            <div className="model">
                <textarea className="note-title" value={title} onChange={onTitleChanged} />
                <textarea className="note-content" value={content} onChange={onContentChanged} />
                <button className="note-save-button" onClick={onSaveNoteClicked}>Save</button>
            </div>
        </div >
    );
};
