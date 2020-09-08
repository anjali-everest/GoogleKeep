export const addNote = (state, action) => {
  state.notes.push(action.payload);
};

export const updateStatusPending = (state) => {
  state.status = "loading";
};

export const updateAllNotes = (state, action) => {
  state.status = "succeeded";
  state.notes = action.payload;
};

export const updateStatusFailed = (state, action) => {
  state.status = "failed";
  state.error = action.error.message;
};

export const updateNote = (state, action) => {
  const { id, title, content } = action.payload;
  const existingNote = state.notes.find((note) => note.id === parseInt(id));
  if (existingNote) {
    existingNote.title = title;
    existingNote.content = content;
  }
};

export const deleteNote = (state) => {
  const index = state.notes.findIndex(
    (note) => note.id === parseInt(state.deletingNoteId)
  );
  state.notes.splice(index, 1);
};
