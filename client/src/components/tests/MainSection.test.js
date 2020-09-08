import React from "react";
import { mount } from "enzyme";
import MainSection from "../MainSection";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
const mockStore = configureMockStore();

describe("MainSection tests", () => {
  const store = mockStore({
    notes: [],
    status: "idle",
    error: null,
    editingNoteId: null,
    isEditingNote: false,
    deletingNoteId: null,
  });

  it("Should render without crashing", () => {
    mount(
      <Provider store={store}>
        <MainSection />
      </Provider>
    );
  });
  it("should match the MainSection snapshot", function () {
    const mainSection = mount(
      <Provider store={store}>
        <MainSection />
      </Provider>
    );
    expect(mainSection).toMatchSnapshot();
  });
});
