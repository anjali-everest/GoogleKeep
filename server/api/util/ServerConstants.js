//Query constants
const GET_ALL_NOTES = "SELECT * FROM notes";
const GET_ONE_NOTE = "SELECT * FROM notes WHERE id = $1";
const INSERT_NOTE =
  "INSERT INTO notes(title,content) VALUES ($1, $2) RETURNING *";
const UPDATE_NOTE =
  "UPDATE notes SET title = $1,content = $2 WHERE id = $3 RETURNING *";
const DELETE_NOTE = "DELETE FROM notes WHERE id = $1";

//API response message constants
const NOTES_RETRIEVED = "Notes retrieved!";
const NOTES_NOT_FOUND = "Notes not found!";
const INVALID_NOTE_ID = "Invalid note ID!";
const NOTE_RETRIEVED = "Note retrieved!";
const INVALID_NOTE = "Invalid input note to create";
const NOTE_NOT_FOUND_WITH_ID = "Note not found with given id";
const NOTE_CREATED = "Note created!";
const NOTE_UPDATED = "Note updated!";
const NOTE_DELETED = "Note deleted!";

module.exports = {
  GET_ALL_NOTES,
  GET_ONE_NOTE,
  INSERT_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  NOTES_RETRIEVED,
  NOTES_NOT_FOUND,
  INVALID_NOTE_ID,
  NOTE_RETRIEVED,
  INVALID_NOTE,
  NOTE_NOT_FOUND_WITH_ID,
  NOTE_CREATED,
  NOTE_UPDATED,
  NOTE_DELETED,
};
