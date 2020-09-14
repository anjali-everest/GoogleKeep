import React from "react";
import { shallow } from "enzyme";
import { Note } from "../Note";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureMockStore();

describe("Note tests", () => {
  const noteProp = { id: 1, title: "title", content: "content" };
  const store = mockStore({
    notes: [],
    status: "idle",
    error: null,
    editingNoteId: null,
    isEditingNote: false,
    deletingNoteId: null,
  });
  const note = shallow(
    <Provider store={store}>
      <Note note={noteProp} />
    </Provider>
  );

  it("should match the Note snapshot", () => {
    expect(note).toMatchSnapshot();
  });
});
