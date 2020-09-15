import axios from "axios";
import { NOTES_API_URL } from "./../util/AppConstants";

const getNotes = async () => {
  try {
    return await axios.get(NOTES_API_URL);
  } catch (err) {
    return err;
  }
};

const addNote = async (note) => {
  try {
    return await axios.post(NOTES_API_URL, note);
  } catch (err) {
    return err;
  }
};

const updateNote = async (note) => {
  try {
    return await axios.put(NOTES_API_URL + note.id, note);
  } catch (err) {
    return err;
  }
};

const deleteNote = async (noteId) => {
  try {
    return await axios.delete(NOTES_API_URL + noteId);
  } catch (err) {
    return err;
  }
};

export { getNotes, addNote, updateNote, deleteNote };
