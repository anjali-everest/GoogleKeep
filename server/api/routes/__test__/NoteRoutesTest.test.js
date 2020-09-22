const getSpy = jest.fn();
const postSpy = jest.fn();
const putSpy = jest.fn();
const deleteSpy = jest.fn();

jest.doMock("express", () => {
  return {
    Router() {
      return {
        get: getSpy,
        post: postSpy,
        put: putSpy,
        delete: deleteSpy,
      };
    },
  };
});

jest.doMock("../../validation/validator");
jest.doMock("../../service/NoteService");

describe("test NoteRouter", () => {
  beforeEach(() => {
    require("../NoteRoutes");
  });

  it("should call get notes route", () => {
    expect(getSpy).toHaveBeenCalledTimes(2);
  });
  it("should call add note route", () => {
    expect(postSpy).toHaveBeenCalledTimes(1);
  });
  it("should call update note route", () => {
    expect(putSpy).toHaveBeenCalledTimes(1);
  });
  it("should call delete note route", () => {
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });
});
