const { NOTE_NOT_FOUND_WITH_ID } = require("../util/ServerConstants");

class NoteController {
  #noteService = null;
  constructor(noteService) {
    this.#noteService = noteService;
  }

  getAllNotes = async (request, response) => {
    try {
      const notes = await this.#noteService.getAll();
      return response.json(notes);
    } catch (error) {
      return sendError(response, 500, error);
    }
  };

  getOneNote = async (request, response) => {
    const { id } = request.params;
    try {
      const note = await this.#noteService.getOne(id);
      if (!isExist(note))
        return sendError(response, 400, NOTE_NOT_FOUND_WITH_ID);
      return response.json(note);
    } catch (error) {
      return sendError(response, 500, error);
    }
  };

  addNote = async (request, response) => {
    try {
      const { title, content } = request.body;
      const note = await this.#noteService.insert({
        title,
        content,
      });
      response.status(201).json(note);
    } catch (error) {
      return sendError(response, 500, error);
    }
  };

  updateNote = async (request, response) => {
    try {
      const note = {
        id: request.params.id,
        title: request.body.title,
        content: request.body.content,
      };
      const isAvailable = await this.isNoteAvailable(note.id);
      if (!isAvailable) return sendError(response, 400, NOTE_NOT_FOUND_WITH_ID);
      const updatedNote = await this.#noteService.update(note);
      return response.json(updatedNote);
    } catch (error) {
      return sendError(response, 500, error);
    }
  };

  deleteNote = async (request, response) => {
    try {
      const id = request.params.id;
      const isAvailable = await this.isNoteAvailable(id);
      if (!isAvailable) return sendError(response, 400, NOTE_NOT_FOUND_WITH_ID);
      await this.#noteService.deleteOne(id);
      return response.status(204).json();
    } catch (error) {
      return sendError(response, 500, error);
    }
  };

  isNoteAvailable = async (id) => {
    const note = await this.#noteService.getOne(id);
    return isExist(note);
  };
}

const isExist = (item) => {
  return item && item.length !== 0;
};

const sendError = (response, status, error) => {
  return response.status(status).json({ error: error });
};

module.exports = NoteController;
