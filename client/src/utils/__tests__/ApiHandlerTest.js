import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getNotes, addNote, updateNote, deleteNote } from "../apiHandler";
import { NOTES_API_URL } from "../../constants/appConstants";

describe("Home API Service", () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });
  describe("getNotes", () => {
    it("should return response with status 200 and empty data when getNotes is called", async () => {
      mock.onGet(NOTES_API_URL).reply(200, {});
      await getNotes().then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual({});
      });
    });

    it("should returns response with status 400 when getNotes is called", async () => {
      mock.onGet(NOTES_API_URL).reply(400);
      await getNotes().then((response) => {
        expect(response.response.status).toEqual(400);
      });
    });
  });

  describe("addNote", () => {
    it("should return response of status 201 with note created when addNote is called", async () => {
      const note = {
        title: "title",
        content: "content",
      };
      mock.onPost(NOTES_API_URL, note).reply(201, note);
      await addNote(note).then((response) => {
        expect(response.status).toEqual(201);
        expect(response.data).toEqual(note);
      });
    });

    it("should return response of status 400", async () => {
      const note = {
        title: "title",
        content: "content",
      };
      mock.onPost(NOTES_API_URL, note).reply(400);
      await addNote(note).then((response) => {
        expect(response.response.status).toEqual(400);
      });
    });

    it("should return response of status 400 with note created when addNote is called", async () => {
      mock.onPost(NOTES_API_URL).reply(400);
      await addNote({}).then((response) => {
        expect(response.response.status).toEqual(400);
      });
    });
  });

  describe("updateNote", () => {
    it("should return response of status 200 with note created when updateNote is called", async () => {
      const note = {
        id: 1,
        title: "title",
        content: "content",
      };
      mock.onPut(NOTES_API_URL + note.id, note).reply(200, note);
      await updateNote(note).then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(note);
      });
    });

    it("should return response of status 400 when updateNote is called without note id", async () => {
      const note = {
        id: 1,
        title: "title",
        content: "content",
      };
      mock.onPut(NOTES_API_URL, note).reply(404);
      await updateNote(note).then((response) => {
        expect(response.response.status).toEqual(404);
      });
    });
  });

  describe("deleteNote", () => {
    it("should return response of status 200 when deleteNote is called", async () => {
      mock.onDelete(NOTES_API_URL + "1").reply(204);
      await deleteNote(1).then((response) => {
        expect(response.status).toEqual(204);
      });
    });

    it("should return response of status 440 when deleteNote is called without note id", async () => {
      mock.onDelete(NOTES_API_URL).reply(404);
      await deleteNote().then((response) => {
        expect(response.response.status).toEqual(404);
      });
    });

    it("should return response of status 400 when updateNote is called deleteNote", async () => {
      mock.onDelete(NOTES_API_URL + "1").reply(400);
      await deleteNote(1).then((response) => {
        expect(response.response.status).toEqual(400);
      });
    });
  });
});
