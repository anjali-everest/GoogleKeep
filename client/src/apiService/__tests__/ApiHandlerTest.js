import httpService from "../index";
import { getNotes, addNote, updateNote, deleteNote } from "../apiHandler";
import { SUCCESS } from "../../constants/appConstants";
jest.mock("../index");

describe("Home API Service", () => {
  const note = {
    title: "title",
    content: "content",
  };
  const error = new Error();

  describe("getNotes", () => {
    it("should return response with data when getNotes is called", async () => {
      httpService.get.mockImplementationOnce(() =>
        Promise.resolve({ data: {} })
      );
      const response = await getNotes();
      expect(httpService.get.mock.calls.length).toBe(1);
      expect(response).toEqual({});
    });

    it("should returns response with error when getNotes is called", async () => {
      httpService.get.mockImplementationOnce(() => Promise.reject(error));
      const response = await getNotes();
      expect(response).toBe(error);
    });
  });

  describe("addNote", () => {
    it("should return response with note created when addNote is called", async () => {
      httpService.post.mockImplementationOnce(() =>
        Promise.resolve({ data: note })
      );
      const response = await addNote(note);
      expect(httpService.post.mock.calls.length).toBe(1);
      expect(response).toEqual(note);
    });

    it("should return response with error", async () => {
      httpService.post.mockImplementationOnce(() => Promise.reject(error));
      const response = await addNote(note);
      expect(response).toBe(error);
    });
  });

  describe("updateNote", () => {
    it("should return response with note updated when updateNote is called", async () => {
      httpService.put.mockImplementationOnce(() =>
        Promise.resolve({ data: note })
      );
      const response = await updateNote(note);
      expect(httpService.put.mock.calls.length).toBe(1);
      expect(response).toEqual(note);
    });

    it("should return response with error", async () => {
      httpService.put.mockImplementationOnce(() => Promise.reject(error));
      const response = await updateNote(note);
      expect(response).toBe(error);
    });
  });

  describe("deleteNote", () => {
    it("should return response of status 204 when deleteNote is called", async () => {
      httpService.delete.mockImplementationOnce(() =>
        Promise.resolve({ status: SUCCESS })
      );
      const response = await deleteNote(1);
      expect(httpService.delete.mock.calls.length).toBe(1);
      expect(response.status).toEqual(SUCCESS);
    });

    it("should return response with error", async () => {
      httpService.delete.mockImplementationOnce(() => Promise.reject(error));
      const response = await deleteNote(note);
      expect(response).toBe(error);
    });
  });
});
