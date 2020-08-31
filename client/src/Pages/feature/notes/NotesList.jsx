import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNotes } from "./notesSlice"

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

  let content
  if (noteStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (noteStatus === 'succeeded') {
    console.log(notes)
    content = notes.notes.map(note => (
      <article className="note-excerpt" key={note.id}>
        <h3>{note.title}</h3>
        <p>{note.content.substring(0, 100)}</p>
      </article>
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