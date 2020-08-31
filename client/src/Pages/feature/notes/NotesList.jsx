import React from 'react'
import { useSelector } from 'react-redux'

export const NotesList = () => {
  const notes = useSelector(state => state.notes)

  const renderedNotes = notes !== undefined && notes !== 0 && notes.map(note => (
    <article className="note-excerpt" key={note.id}>
      <h3>{note.title}</h3>
      <p>{note.content.substring(0, 100)}</p>
    </article>
  ))

  return (
    <section>
      <h2>Notes</h2>
      {renderedNotes}
    </section>
  )
}