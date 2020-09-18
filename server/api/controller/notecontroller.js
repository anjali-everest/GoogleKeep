import { NOTE_NOT_FOUND_WITH_ID } from "../util/serverConstants";

let noteService = null;
export default class NoteController {
  constructor(service) {
    noteService = service;
  }

  getAllNotes = async (request, response) => {
    try {
      const notes = await noteService.getAll();
      return response.json(notes);
    } catch (error) {
      return sendError(response, 500, error);
    }
  };

  getOneNote = async (request, response) => {
    const { id } = request.params;
    try {
      const note = await noteService.getOne(id);
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
      const note = await noteService.insert({
        title,
        content,
      });
      response.status(201).json(note);
    } catch (error) {
      return sendError(response, 500, error);
    }
  };

  updateNote = async (request, response) => {
    const note = {
      id: request.params.id,
      title: request.body.title,
      content: request.body.content,
    };
    try {
      const noteToUpdate = await noteService.getOne(note.id);
      if (!isExist(noteToUpdate))
        return sendError(response, 400, NOTE_NOT_FOUND_WITH_ID);
      console.log("exist");
      const updatedFile = await noteService.update(note);
      return response.json(updatedFile);
    } catch (error) {
      return sendError(response, 500, error);
    }
  };

  deleteNote = async (request, response) => {
    const id = request.params.id;
    try {
      const noteToDelete = await noteService.getOne(id);
      if (!isExist(noteToDelete))
        return sendError(response, 400, NOTE_NOT_FOUND_WITH_ID);
      await noteService.deleteOne(id);
      return response.status(204).json();
    } catch (error) {
      return sendError(response, 500, error);
    }
  };
}

const isExist = (item) => {
  return item && item.length !== 0;
};

const sendError = (response, status, error) => {
  return response.status(status).json({ error: error });
};
