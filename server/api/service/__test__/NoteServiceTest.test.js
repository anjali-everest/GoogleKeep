const db = require("../../../database");
const NoteService = require("../NoteService");

jest.mock("../../../database");
const noteService = new NoteService();

describe("NoteService", () => {
  describe("getAll", () => {
    it("should get content when called getAll on NoteService", async () => {
      const notes = [{}, {}];
      db.query.mockReturnValue({ rows: notes });
      const res = await noteService.getAll();
      expect(res).toEqual(notes);
    });

    it("should get error when called getAll on NoteService", async () => {
      const error = new Error();
      db.query.mockImplementation(() => {
        throw error;
      });
      const res = await noteService.getAll();
      expect(res).toEqual(error);
    });
  });

  describe("getOne", () => {
    it("should get content when called getOne on NoteService", async () => {
      const note = [{}];
      db.query.mockReturnValue({ rows: note });
      const res = await noteService.getOne(1);
      expect(res).toEqual(note);
    });

    it("should get error when called getOne on NoteService", async () => {
      const error = new Error();
      db.query.mockImplementation(() => {
        throw error;
      });
      const res = await noteService.getOne(1);
      expect(res).toEqual(error);
    });
  });

  describe("insert", () => {
    let note = { title: "title", content: "content" };
    it("should insert a note when called insert on NoteService", async () => {
      db.query.mockReturnValue({ rows: note });
      const res = await noteService.insert(note);
      expect(res).toEqual(note);
    });

    it("should get error when called insert on NoteService", async () => {
      const error = new Error();
      db.query.mockImplementation(() => {
        throw error;
      });
      const res = await noteService.insert(note);
      expect(res).toEqual(error);
    });
  });

  describe("update", () => {
    let note = { id: 1, title: "title", content: "content" };
    it("should update a note when called update on NoteService", async () => {
      db.query.mockReturnValue({ rows: [note] });
      const res = await noteService.update(note);
      expect(res).toEqual(note);
    });

    it("should get error when called update on NoteService", async () => {
      const error = new Error();
      db.query.mockImplementation(() => {
        throw error;
      });
      const res = await noteService.update(note);
      expect(res).toEqual(error);
    });
  });

  describe("deleteOne", () => {
    it("should update a note when called delete on NoteService", async () => {
      db.query.mockReturnValue();
      const res = await noteService.deleteOne(1);
      console.log(res);
      expect(res).toEqual();
    });

    it("should get error when called delete on NoteService", async () => {
      const error = new Error();
      db.query.mockImplementation(() => {
        throw error;
      });
      const res = await noteService.deleteOne(1);
      expect(res).toEqual(error);
    });
  });
});
