import db from "../../database";
import {
  DELETE_NOTE,
  GET_ALL_NOTES,
  GET_ONE_NOTE,
  INSERT_NOTE,
  UPDATE_NOTE,
} from "../util/serverConstants";

class NoteService {
  getAll = async () => {
    try {
      const response = await db.query(GET_ALL_NOTES);
      return response.rows;
    } catch (e) {
      return e;
    }
  };

  getOne = async (id) => {
    try {
      const response = await db.query(GET_ONE_NOTE, [id]);
      return response.rows;
    } catch (e) {
      return e;
    }
  };

  insert = async (note) => {
    try {
      const response = await db.query(INSERT_NOTE, [note.title, note.content]);
      return response.rows;
    } catch (e) {
      return e;
    }
  };

  update = async (note) => {
    try {
      await db.query(UPDATE_NOTE, [note.title, note.content, note.id]);
      return note;
    } catch (e) {
      return e;
    }
  };

  deleteOne = async (id) => {
    try {
      await db.query(DELETE_NOTE, [id]);
    } catch (e) {
      return e;
    }
  };
}

export default NoteService;
