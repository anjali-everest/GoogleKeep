import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNotes, updateIsEditingNote, updateEditingNoteId, deleteOneNote, updateDeletingNoteId } from "./notesSlice"
import optionsIcon from "./../../../styles/optionsIcon.jpeg"


export const NotesList = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)
  const noteStatus = useSelector(state => state.notes.status)
  const error = useSelector(state => state.notes.error)
  const [option, setOption] = useState(false)

  const onOptionsClicked = () => setOption(!option)
  const onDeleteNoteClicked = (e) => {
    dispatch(updateDeletingNoteId(e.target.id))
    dispatch(deleteOneNote(e.target.id))
  }

  useEffect(() => {
    if (noteStatus === 'idle') {
      dispatch(fetchNotes())
    }
  }, [noteStatus, dispatch])

  const handleNoteClick = (e) => {
    dispatch(updateIsEditingNote())
    dispatch(updateEditingNoteId(e.target.id))
  }

  let content
  if (noteStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (noteStatus === 'succeeded') {
    content = notes.notes && notes.notes.length !== 0 && notes.notes.map(note => (
      <div id={note.id} key={note.id}>
        <article className="note-excerpt" key={note.id} id={note.id} onClick={handleNoteClick}>
          <h3 id={note.id}>{note.title}</h3>
          <p id={note.id}>{note.content.substring(0, 100)}</p>
        </article>
        <img src={optionsIcon} className="optionsIcon" alt="noteOptions" onClick={onOptionsClicked} />
        {option && <div>
          <button id={note.id} onClick={onDeleteNoteClicked}>Delete</button>
        </div>}
      </div>
    ))
  } else if (noteStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section>
      <h2>Notes</h2>
      {content}
    </section>
  )
}