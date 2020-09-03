import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { addNewNote } from "./ThunkHandler"
import ResizableTextarea from '../../ResizableTextArea'

export const AddNoteForm = () => {
  const dispatch = useDispatch()
  const [openForm, setOpenForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onContentClicked = e => setOpenForm(true)
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
    <div className="add-note-form">
      {openForm &&
        <input
          type="text"
          id="noteTitle"
          name="noteTitle"
          className="note-title"
          value={title}
          placeholder="Title"
          onChange={onTitleChanged}
        />}
      <ResizableTextarea placeholder="Take a note..."
        value={content}
        onChange={onContentChanged}
        onClick={onContentClicked}
      />
      {openForm && <button type="button" className="add-note-button" onClick={onSaveNoteClicked}>Save</button>}
    </div>
  )
}