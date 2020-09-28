import React from "react";
import { mount } from "enzyme";
import { AddNoteForm } from "../AddNoteForm";
import configureMockStore from "redux-mock-store";
import * as ReactRedux from "react-redux";
import * as thunks from "../../thunksHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";

const mockStore = configureMockStore([createAsyncThunk]);

describe("AddNoteForm tests", () => {
  const store = mockStore({
    notes: [],
    status: "idle",
    error: null,
    editingNoteId: null,
    isEditingNote: false,
    deletingNoteId: null,
  });
  ReactRedux.useDispatch = jest.fn().mockImplementation(() => jest.fn());

  const addNoteForm = mount(
    <ReactRedux.Provider store={store}>
      <AddNoteForm />
    </ReactRedux.Provider>
  );

  it("should match the AddNoteForm snapshot", () => {
    expect(addNoteForm).toMatchSnapshot();
  });

  it("should show note-title field and add-note button on clicking note-content", () => {
    addNoteForm.find(".add-note-form .noteContent").simulate("click");
    expect(addNoteForm.find(".add-note-form .noteTitle").length).toEqual(1);
    expect(addNoteForm.find(".add-note-form .add-note-button").length).toEqual(
      1
    );
  });

  it("should show the new title of note when note title has been changed", () => {
    addNoteForm
      .find(".add-note-form .noteTitle")
      .simulate("change", { target: { value: "Hello" } });

    const titleInput = addNoteForm.find(".add-note-form .noteTitle").instance();

    expect(titleInput.value).toEqual("Hello");
  });

  it("should show the new content when content has been changed", () => {
    addNoteForm
      .find(".add-note-form .noteContent")
      .simulate("change", { target: { value: "Hello I'm the content" } });
    const contentInput = addNoteForm
      .find(".add-note-form .noteContent")
      .instance();

    expect(contentInput.value).toEqual("Hello I'm the content");
  });

  it("should save the new note when clicked on save button", () => {
    const addNewNoteSpy = jest
      .spyOn(thunks, "addNewNote")
      .mockImplementationOnce(() => Promise.resolve({}));

    addNoteForm
      .find(".add-note-form .noteTitle")
      .simulate("change", { target: { value: "Hello" } });
    addNoteForm
      .find(".add-note-form .noteContent")
      .simulate("change", { target: { value: "Hello I'm the content" } });
    addNoteForm.find(".add-note-form .add-note-button").simulate("click");

    expect(addNewNoteSpy).toHaveBeenCalled();
  });
});
