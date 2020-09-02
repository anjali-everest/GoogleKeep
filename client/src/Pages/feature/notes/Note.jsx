import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateIsEditingNote, updateEditingNoteId, updateDeletingNoteId } from "./notesSlice"
import { deleteOneNote } from "./ThunkHandler"
import optionsIcon from "./../../../styles/optionsIcon.jpeg"

export const Note = (props) => {
    const { note } = props
    const dispatch = useDispatch()

    const [option, setOption] = useState(false)

    const onNoteClicked = (e) => {
        dispatch(updateIsEditingNote())
        dispatch(updateEditingNoteId(e.target.id))
    }
    const onOptionsClicked = () => setOption(!option)
    const onDeleteNoteClicked = (e) => {
        dispatch(updateDeletingNoteId(e.target.id))
        dispatch(deleteOneNote(e.target.id))
    }

    return (
        note && note.title && note.content && <div id={note.id} key={note.id}>
            <article className="note-excerpt" key={note.id} id={note.id} onClick={onNoteClicked}>
                <h3 id={note.id}>{note.title}</h3>
                <p id={note.id}>{note.content.substring(0, 100)}</p>
            </article>
            <img src={optionsIcon} className="optionsIcon" alt="noteOptions" onClick={onOptionsClicked} />
            {option && <div>
                <button id={note.id} onClick={onDeleteNoteClicked}>Delete</button>
            </div>}
        </div>
    )
}