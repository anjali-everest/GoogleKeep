import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { addNewNote } from "./notesSlice"

export const AddNoteForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onSaveNoteClicked = () => {
    if (title && content) {
      dispatch(
        addNewNote({
          title,
          content
        })
      )

      setTitle('')
      setContent('')
    }
  }

  return (
    <section>
      <h2>Add a New Note</h2>
      <form>
        <label htmlFor="noteTitle">Note Title:</label>
        <input
          type="text"
          id="noteTitle"
          name="noteTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="noteContent">Content:</label>
        <textarea
          id="noteContent"
          name="noteContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSaveNoteClicked}>Save Note</button>
      </form>
    </section>
  )
}