export const addNote = (state, action) => {
    state.notes.push(action.payload)
}

export const updateStatusPending = (state, action) => {
    state.status = 'loading'
}

export const updateAllNotes = (state, action) => {
    state.status = 'succeeded'
    state.notes = action.payload
}

export const updateStatusFailed = (state, action) => {
    state.status = 'failed'
    state.error = action.error.message
}

export const updateNote = (state, action) => {
    const {
        id,
        title,
        content
    } = action.payload
    const existingNote = state.notes.find(note => note.id === parseInt(id))
    if (existingNote) {
        existingNote.title = title
        existingNote.content = content
    }
}

export const deleteNote = (state, action) => {
    var index = state.notes.map(note => {
        return note.Id;
    }).indexOf(action.payload);
    state.notes.splice(index, 1);
}