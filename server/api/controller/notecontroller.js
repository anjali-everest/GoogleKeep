export default class NoteController {
  constructor(noteService) {
    this.noteService = noteService;
  }

  getAllNotes = async (request, response) => {
    const notes = await this.noteService.getAll();

    return response.json(notes);
  };

  getOneNote = async (request, response) => {
    const { id } = request.params;
    const note = await this.noteService.getOne(id);
    if (!note || note.length === 0)
      return response.status(400).json({ error: "Note not found with ID" });

    return response.json(note);
  };

  addNote = async (request, response) => {
    const { title, content } = request.body;
    const note = await this.noteService.insert({
      title,
      content,
    });

    response.status(201).json(note);
  };

  updateNote = async (request, response) => {
    const note = {
      id: request.params.id,
      title: request.body.title,
      content: request.body.content,
    };
    const noteToUpdate = await this.noteService.getOne(note.id);
    if (!noteToUpdate || noteToUpdate.length === 0)
      return response.status(400).json({ error: "Note not found with ID" });

    const updatedFile = await this.noteService.update(note);
    return response.json(updatedFile);
  };

  deleteNote = async (request, response) => {
    const id = request.params.id;
    const noteToDelete = await this.noteService.getOne(id);
    if (!noteToDelete || noteToDelete.length === 0)
      return response.status(400).json({ error: "Note not found with ID" });

    await this.noteService.deleteOne(id);
    return response.status(204).json();
  };
}
