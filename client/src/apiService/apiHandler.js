import httpService from "./index";
import { NOTES_API_URL } from "../constants/appConstants";

const getNotes = async () => {
  return await httpService
    .get(NOTES_API_URL)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

const addNote = async (note) => {
  return await httpService
    .post(NOTES_API_URL, note)
    .then((res) => res.data)
    .catch((err) => err);
};

const updateNote = async (note) => {
  return await httpService
    .put(NOTES_API_URL + note.id, note)
    .then((res) => res.data)
    .catch((err) => err);
};

const deleteNote = async (noteId) => {
  return await httpService.delete(NOTES_API_URL + noteId).catch((err) => err);
};

export { getNotes, addNote, updateNote, deleteNote };
