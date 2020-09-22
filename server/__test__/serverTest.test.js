const noteRouter = require("../api/routes/NoteRoutes");

describe("should test the server configuration", () => {
  const useSpy = jest.fn();
  const listenSpy = jest.fn();

  jest.doMock("express", () => {
    return () => ({
      listen: listenSpy,
      use: useSpy,
    });
  });

  beforeEach(() => {
    require("../server");
  });
  
  it("should initialize an express server", () => {
    expect(listenSpy).toHaveBeenCalled();
  });

  it("should use a router", () => {
    expect(useSpy).toHaveBeenCalledWith("/", noteRouter);
  });
});
