const db = require("../../database");

const {
  DELETE_NOTE,
  GET_ALL_NOTES,
  GET_ONE_NOTE,
  INSERT_NOTE,
  UPDATE_NOTE,
} = require("../util/ServerConstants");

class NoteService {
  getAll = async () => {
    try {
      const response = await db.query(GET_ALL_NOTES);
      return response.rows;
    } catch (e) {
      throw e;
    }
  };

  getOne = async (id) => {
    try {
      const response = await db.query(GET_ONE_NOTE, [id]);
      return response.rows;
    } catch (e) {
      throw e;
    }
  };

  insert = async (note) => {
    try {
      const response = await db.query(INSERT_NOTE, [note.title, note.content]);
      return response.rows;
    } catch (e) {
      throw e;
    }
  };

  update = async (note) => {
    try {
      const response = await db.query(UPDATE_NOTE, [
        note.title,
        note.content,
        note.id,
      ]);
      return response.rows[0];
    } catch (e) {
      throw e;
    }
  };

  deleteOne = async (id) => {
    try {
      await db.query(DELETE_NOTE, [id]);
    } catch (e) {
      throw e;
    }
  };
}

module.exports = NoteService;
