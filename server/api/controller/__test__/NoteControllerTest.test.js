const NoteController = require("../NoteController");
const NoteService = require("../../service/NoteService");
const { NOTE_NOT_FOUND_WITH_ID } = require("../../util/ServerConstants");

describe("Test NoteController functionality", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.json.error = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockRequest = () => {
    const req = {};
    req.params = jest.fn().mockReturnValue(req);
    req.params.id = 1;
    req.body = jest.fn().mockReturnValue({});
    return req;
  };

  const noteService = new NoteService();
  const noteController = new NoteController(noteService);

  const res = mockResponse();
  const req = mockRequest();
  const error = new Error();

  describe("test getNotes functionality", () => {
    it("should get notes when called getNotes given service call returns list of notes", async () => {
      const notes = [{}, {}];
      jest
        .spyOn(noteService, "getAll")
        .mockImplementation(() => Promise.resolve(notes));
      await noteController.getAllNotes(null, res, null);
      expect(res.json).toBeCalledWith(notes);
    });

    it("should get error when called getNotes given service call returns error ", async () => {
      jest
        .spyOn(noteService, "getAll")
        .mockImplementation(() => Promise.reject(error));
      await noteController.getAllNotes(null, res, null);
      expect(res.json).toBeCalledWith({ error: error });
      expect(res.status).toBeCalledWith(500);
    });
  });

  describe("test getOneNote functionality", () => {
    it("should get note when called getOneNote", async () => {
      const note = [{}];
      jest
        .spyOn(noteService, "getOne")
        .mockImplementation(() => Promise.resolve(note));
      await noteController.getOneNote(req, res, null);
      expect(res.json).toBeCalledWith(note);
    });

    it("should get an error when called getOneNote given service call gets rejected ", async () => {
      jest
        .spyOn(noteService, "getOne")
        .mockImplementation(() => Promise.reject(error));
      await noteController.getOneNote(req, res, null);
      expect(res.json).toBeCalledWith({ error: error });
      expect(res.status).toBeCalledWith(500);
    });

    it("should get an error when called getOneNote given invalid Id", async () => {
      jest
        .spyOn(noteService, "getOne")
        .mockImplementation(() => Promise.resolve());
      await noteController.getOneNote(req, res, null);
      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith({ error: NOTE_NOT_FOUND_WITH_ID });
    });

    it("should get an error when called getOneNote given params.id as null", async () => {
      req.params.id = null;
      jest
        .spyOn(noteService, "getOne")
        .mockImplementation(() => Promise.resolve());
      await noteController.getOneNote(req, res, null);
      expect(res.json).toBeCalledWith({ error: error });
      expect(res.status).toBeCalledWith(500);
    });
  });

  describe("test addNote functionality", () => {
    it("should add note when called addNote", async () => {
      const note = [{}];
      jest
        .spyOn(noteService, "insert")
        .mockImplementation(() => Promise.resolve(note));
      await noteController.addNote(req, res, null);
      expect(res.json).toBeCalledWith(note);
      expect(res.status).toBeCalledWith(201);
    });

    it("should return an error when called addNote given service call gets rejected", async () => {
      jest
        .spyOn(noteService, "insert")
        .mockImplementation(() => Promise.reject(error));
      await noteController.addNote(req, res, null);
      expect(res.json).toBeCalledWith({ error: error });
      expect(res.status).toBeCalledWith(500);
    });

    it("should return an error when called addNote given no req body content ", async () => {
      req.body = null;
      const error = new Error();
      jest
        .spyOn(noteService, "insert")
        .mockImplementation(() => Promise.resolve());
      await noteController.addNote(req, res, null);
      expect(res.json).toBeCalledWith({ error: error });
      expect(res.status).toBeCalledWith(500);
    });
  });

  describe("test updateNote functionality", () => {
    it("should respond with updated note when called updateNote", async () => {
      const note = [{}];
      jest
        .spyOn(noteService, "update")
        .mockImplementation(() => Promise.resolve(note));
      await noteController.updateNote(req, res, null);
      expect(res.json).toBeCalledWith(note);
    });

    it("should respond with error when called updateNote given invalid note id", async () => {
      jest
        .spyOn(noteService, "getOne")
        .mockImplementation(() => Promise.resolve());
      await noteController.updateNote(req, res, null);
      expect(res.json).toBeCalledWith({ error: NOTE_NOT_FOUND_WITH_ID });
      expect(res.status).toBeCalledWith(400);
    });

    it("should respond with error when called updateNote given no id param", async () => {
      req.params.id = null;
      await noteController.updateNote(req, res, null);
      expect(res.json).toBeCalledWith({ error: error });
      expect(res.status).toBeCalledWith(500);
    });

    it("should respond with error when called updateNote given no req body content", async () => {
      req.body = null;
      await noteController.updateNote(req, res, null);
      expect(res.json).toBeCalledWith({ error: error });
      expect(res.status).toBeCalledWith(500);
    });

    it("should respond with error when called updateNote when service call gets rejected", async () => {
      req.body = null;
      jest
        .spyOn(noteService, "update")
        .mockImplementation(() => Promise.reject(error));
      await noteController.updateNote(req, res, null);
      expect(res.json).toBeCalledWith({ error: error });
      expect(res.status).toBeCalledWith(500);
    });
  });

  describe("test deleteNote functionality", () => {
    it("should respond with 204 status when called deleteNote", async () => {
      const note = [{}];
      jest
        .spyOn(noteService, "getOne")
        .mockImplementation(() => Promise.resolve(note));
      jest
        .spyOn(noteService, "deleteOne")
        .mockImplementation(() => Promise.resolve());
      await noteController.deleteNote(req, res, null);
      expect(res.status).toBeCalledWith(204);
    });

    it("should respond with 400 status when called deleteNote given invalid note id", async () => {
      jest
        .spyOn(noteService, "getOne")
        .mockImplementation(() => Promise.resolve());
      await noteController.deleteNote(req, res, null);
      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith({ error: NOTE_NOT_FOUND_WITH_ID });
    });

    it("should respond with 500 status when called deleteNote when service call get rejected", async () => {
      const note = [{}];
      jest
        .spyOn(noteService, "getOne")
        .mockImplementation(() => Promise.resolve(note));
      jest
        .spyOn(noteService, "deleteOne")
        .mockImplementation(() => Promise.reject(error));
      await noteController.deleteNote(req, res, null);
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith({ error: error });
    });
  });
});
