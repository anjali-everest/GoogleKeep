const getMock = jest.fn();
const postMock = jest.fn();
const putMock = jest.fn();
const deleteMock = jest.fn();

jest.doMock("express", () => {
  return {
    Router() {
      return {
        get: getMock,
        post: postMock,
        put: putMock,
        delete: deleteMock,
      };
    },
  };
});
jest.doMock("../../validation/validator");
jest.doMock("../../service/NoteService");

describe("NoteRouter", () => {
  beforeEach(() => {
    require("../NoteRoutes");
  });

  it("should call get notes route", () => {
    expect(getMock).toHaveBeenCalledTimes(2);
  });
  it("should call add note route", () => {
    expect(postMock).toHaveBeenCalledTimes(1);
  });
  it("should call update note route", () => {
    expect(putMock).toHaveBeenCalledTimes(1);
  });
  it("should call delete note route", () => {
    expect(deleteMock).toHaveBeenCalledTimes(1);
  });
});
