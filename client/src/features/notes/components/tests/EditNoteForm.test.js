import React from "react";
import { mount } from "enzyme";
import { EditNoteForm } from "../EditNoteForm";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import * as thunks from "../../thunkHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";

const mockStore = configureMockStore([createAsyncThunk]);

describe("EditNoteForm tests", () => {
  const note = { id: 1, title: "title", content: "content" };
  const store = mockStore({
    notes: {
      notes: [note],
      status: "idle",
      error: null,
      editingNoteId: 1,
      isEditingNote: true,
      deletingNoteId: null,
    },
  });
  const editNoteForm = mount(
    <Provider store={store}>
      <EditNoteForm />
    </Provider>
  );

  it("should match the EditNoteForm snapshot", () => {
    expect(editNoteForm).toMatchSnapshot();
  });

  it("should show the new title of note when note title has been changed", () => {
    editNoteForm
      .find(".edit-note-form .note-title")
      .simulate("change", { target: { value: "Hello" } });

    const titleInput = editNoteForm
      .find(".edit-note-form .note-title")
      .instance();

    expect(titleInput.value).toEqual("Hello");
  });

  it("should show the new content when content has been changed", () => {
    editNoteForm
      .find(".edit-note-form .note-content")
      .simulate("change", { target: { value: "Hello I'm the content" } });
    const contentInput = editNoteForm
      .find(".edit-note-form .note-content")
      .instance();

    expect(contentInput.value).toEqual("Hello I'm the content");
  });

  it("should save the new note when clicked on save button", () => {
    const updateOneNoteSpy = jest.spyOn(thunks, "updateOneNote");
    const fetchNotesSpy = jest.spyOn(thunks, "fetchNotes");

    editNoteForm
      .find(".edit-note-form .note-title")
      .simulate("change", { target: { value: "Hello" } });
    editNoteForm
      .find(".edit-note-form .note-content")
      .simulate("change", { target: { value: "Hello I'm the content" } });
    editNoteForm.find(".edit-note-form .note-save-button").simulate("click");

    expect(updateOneNoteSpy).toHaveBeenCalled();
    expect(fetchNotesSpy).toHaveBeenCalled();
  });
});
