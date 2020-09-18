import NoteService from "../service/NoteService";

const noteService = new NoteService();

const getAllNotes = async (request, response) => {
  const notes = await noteService.getAll();
  return response.json(notes);
};

const getOneNote = async (request, response) => {
  const { id } = request.params;
  const note = await noteService.getOne(id);
  return response.json(note); //if no note found??
};

const addNote = async (request, response) => {
  const { title, content } = request.body;
  const note = await noteService.insert({
    title,
    content,
  });

  response.status(201).json(note);
};

const updateNote = async (request, response) => {
  const note = {
    id: request.params.id,
    title: request.body.title,
    content: request.body.content,
  };
  const updatedFile = await noteService.update(note);
  return response.json(updatedFile);
};

const deleteNote = async (request, response) => {
  const id = request.params.id;
  const deletedNote = await noteService.deleteOne(id);
  return response.json(deletedNote);
};

export { getAllNotes, getOneNote, addNote, updateNote, deleteNote };
