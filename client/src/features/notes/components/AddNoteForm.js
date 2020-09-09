import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewNote } from "../thunkHandler";
import ResizableTextarea from "../../../components/ResizableTextArea";

export const AddNoteForm = () => {
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onContentClicked = () => setOpenForm(true);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onSaveNoteClicked = () => {
    if (title || content) {
      dispatch(
        addNewNote({
          title,
          content,
        })
      );

      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="add-note-form">
      <input
        type="text"
        id="noteTitle"
        name="noteTitle"
        className="noteTitle"
        hidden={!openForm}
        value={title}
        placeholder="Title"
        onChange={onTitleChanged}
      />
      <ResizableTextarea
        id="noteContent"
        placeholder="Take a note..."
        value={content}
        onChange={onContentChanged}
        onClick={onContentClicked}
      />
      <button
        type="button"
        hidden={!openForm}
        className="add-note-button"
        onClick={onSaveNoteClicked}
      >
        Save
      </button>
    </div>
  );
};
