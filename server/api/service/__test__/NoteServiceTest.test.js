const db = require("../../../database");
const NoteService = require("../NoteService");

jest.mock("../../../database");

describe("NoteService", () => {
  const noteService = new NoteService();
  const notes = [
    { id: 1, title: "title", content: "content" },
    { id: 2, title: "title", content: "content" },
  ];
  const error = new Error();

  describe("getAll of NoteService", () => {
    it("should get content when called getAll on NoteService", async () => {
      db.query.mockReturnValue({ rows: notes });
      const res = await noteService.getAll();
      expect(res).toEqual(notes);
    });

    it("should get error when called getAll on NoteService", async () => {
      db.query.mockImplementation(() => {
        throw error;
      });
      const res = await noteService.getAll();
      expect(res).toEqual(error);
    });
  });

  describe("getOne of NoteService", () => {
    it("should get content when called getOne on NoteService", async () => {
      db.query.mockReturnValue({ rows: [notes[0]] });
      const res = await noteService.getOne(1);
      expect(res).toEqual([notes[0]]);
    });

    it("should get error when called getOne on NoteService", async () => {
      db.query.mockImplementation(() => {
        throw error;
      });
      const res = await noteService.getOne(1);
      expect(res).toEqual(error);
    });
  });

  describe("insert of NoteService", () => {
    it("should insert a note when called insert on NoteService", async () => {
      db.query.mockReturnValue({ rows: notes[0] });
      const res = await noteService.insert(notes[0]);
      expect(res).toEqual(notes[0]);
    });

    it("should get error when called insert on NoteService", async () => {
      db.query.mockImplementation(() => {
        throw error;
      });
      const res = await noteService.insert(notes[0]);
      expect(res).toEqual(error);
    });
  });

  describe("update of NoteService", () => {
    it("should update a note when called update on NoteService", async () => {
      db.query.mockReturnValue({ rows: [notes[0]] });
      const res = await noteService.update(notes[0]);
      expect(res).toEqual(notes[0]);
    });

    it("should get error when called update on NoteService", async () => {
      db.query.mockImplementation(() => {
        throw error;
      });
      const res = await noteService.update(notes[0]);
      expect(res).toEqual(error);
    });
  });

  describe("deleteOne of NoteService", () => {
    it("should update a note when called delete on NoteService", async () => {
      db.query.mockReturnValue();
      const res = await noteService.deleteOne(1);
      expect(res).toEqual();
    });

    it("should get error when called delete on NoteService", async () => {
      db.query.mockImplementation(() => {
        throw error;
      });
      const res = await noteService.deleteOne(1);
      expect(res).toEqual(error);
    });
  });
});
