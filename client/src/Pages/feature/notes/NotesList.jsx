import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNotes, updateIsEditingNote, updateEditingNoteId } from "./notesSlice"

export const NotesList = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)
  const noteStatus = useSelector(state => state.notes.status)
  const error = useSelector(state => state.notes.error)

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