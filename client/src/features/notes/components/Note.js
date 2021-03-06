import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  updateIsEditingNote,
  updateEditingNoteId,
  updateDeletingNoteId,
} from "./../notesSlice";
import { deleteOneNote } from "../thunksHandler";
import deleteIcon from "./../../../assets/deleteIcon.png";

export const Note = (props) => {
  const { note } = props;
  const dispatch = useDispatch();

  const [showOptions, setShowOptions] = useState(false);

  const onMouseEntered = () => {
    setShowOptions(!showOptions);
  };
  const onMouseLeft = () => {
    setShowOptions(!showOptions);
  };
  const onNoteClicked = (e) => {
    dispatch(updateIsEditingNote());
    dispatch(updateEditingNoteId(e.target.id));
  };
  const onDeleteNoteClicked = (e) => {
    e.stopPropagation();
    dispatch(updateDeletingNoteId(e.target.id));
    dispatch(deleteOneNote(e.target.id));
  };

  return (
    note && (
      <div
        id={note.id}
        key={note.id}
        className="note-body"
        onMouseEnter={onMouseEntered}
        onMouseLeave={onMouseLeft}
        onClick={onNoteClicked}
      >
        <p id={note.id} className="note-title">
          {note.title}
        </p>
        <p id={note.id} className="note-content">
          {note.content.substring(0, 100)}
        </p>
        <img
          id={note.id}
          hidden={!showOptions}
          src={deleteIcon}
          alt="deleteIcon"
          className="note-delete-icon"
          onClick={onDeleteNoteClicked}
        />
      </div>
    )
  );
};

Note.propTypes = {
  note: PropTypes.object,
};
