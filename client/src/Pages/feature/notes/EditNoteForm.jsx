import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { updateOneNote, updateIsEditingNote, fetchNotes } from "./notesSlice";

export const EditNoteForm = () => {
    const noteId = useSelector(state => state.notes.editingNoteId)
    const note = useSelector(state => state.notes.notes.find(note => note.id === parseInt(noteId)))

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
        <div className="editNoteModel" >
            <div>
                <textarea
                    value={title}
                    onChange={onTitleChanged}
                />
                <textarea
                    value={content}
                    onChange={onContentChanged}
                />
                <button onClick={onSaveNoteClicked}>Save</button>
            </div>
        </div >
    );
};
