require("../api/routes/NoteRoutes");
require("body-parser");
require("cors");

const useMock = jest.fn();
const listenMock = jest.fn();

jest.doMock("express", () => {
  return () => ({
    listen: listenMock,
    use: useMock,
  });
});

describe("Server configuration", () => {
  beforeEach(() => {
    require("../server");
  });

  it("should initialize an express server listening on a port", () => {
    expect(listenMock).toHaveBeenCalled();
  });

  it("should test the server to use a router, cors, body-parser and body-parser url encoded", () => {
    expect(useMock).toHaveBeenCalledTimes(4);
  });
});
