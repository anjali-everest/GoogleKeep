const NoteController = require("../NoteController");
const NoteService = require("../../service/NoteService");
const { NOTE_NOT_FOUND_WITH_ID } = require("../../util/ServerConstants");

describe("NoteController", () => {
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
  const notes = [
    { id: 1, title: "title", content: "content" },
    { id: 2, title: "title", content: "content" },
  ];

  describe("getNotes of NoteController", () => {
    it("should get notes when called getNotes given service call returns list of notes", async () => {
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

  describe("getOneNote of NoteController", () => {
    it("should get note when called getOneNote", async () => {
      jest
        .spyOn(noteService, "getOne")
        .mockImplementation(() => Promise.resolve(notes[0]));
      await noteController.getOneNote(req, res, null);
      expect(res.json).toBeCalledWith(notes[0]);
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

  describe("addNote of NoteController", () => {
    it("should add note when called addNote", async () => {
      jest
        .spyOn(noteService, "insert")
        .mockImplementation(() => Promise.resolve(notes[0]));
      await noteController.addNote(req, res, null);
      expect(res.json).toBeCalledWith(notes[0]);
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

  describe("updateNote of NoteController", () => {
    it("should respond with updated note when called updateNote", async () => {
      jest
        .spyOn(noteService, "update")
        .mockImplementation(() => Promise.resolve(notes[0]));
      await noteController.updateNote(req, res, null);
      expect(res.json).toBeCalledWith(notes[0]);
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

  describe("deleteNote of NoteController", () => {
    it("should respond with 204 status when called deleteNote", async () => {
      jest
        .spyOn(noteService, "getOne")
        .mockImplementation(() => Promise.resolve(notes[0]));
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
      jest
        .spyOn(noteService, "getOne")
        .mockImplementation(() => Promise.resolve(notes[0]));
      jest
        .spyOn(noteService, "deleteOne")
        .mockImplementation(() => Promise.reject(error));
      await noteController.deleteNote(req, res, null);
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith({ error: error });
    });
  });
});
