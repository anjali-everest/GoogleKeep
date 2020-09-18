//Query constants
export const GET_ALL_NOTES = "SELECT * FROM notes";
export const GET_ONE_NOTE = "SELECT * FROM notes WHERE id = $1";
export const INSERT_NOTE =
  "INSERT INTO notes(title,content) VALUES ($1, $2) RETURNING *";
export const UPDATE_NOTE =
  "UPDATE notes SET title = $1,content = $2 WHERE id = $3 RETURNING *";
export const DELETE_NOTE = "DELETE FROM notes WHERE id = $1";
//API response message constants
export const NOTES_RETRIEVED = "Notes retrieved!";
export const NOTES_NOT_FOUND = "Notes not found!";
export const INVALID_NOTE_ID = "Invalid note ID!";
export const NOTE_RETRIEVED = "Note retrieved!";
export const INVALID_NOTE = "Invalid input note to create";
export const NOTE_NOT_FOUND_WITH_ID = "Note not found with given id";
export const NOTE_CREATED = "Note created!";
export const NOTE_UPDATED = "Note updated!";
export const NOTE_DELETED = "Note deleted!";
