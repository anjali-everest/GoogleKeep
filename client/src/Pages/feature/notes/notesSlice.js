import {
    createSlice
} from '@reduxjs/toolkit'
import {
    fetchNotes,
    addNewNote,
    updateOneNote,
    deleteOneNote
} from "./ThunkHandler"

const initialState = {
    notes: [],
    status: 'idle',
    error: null,
    editingNoteId: null,
    isEditingNote: false,
    deletingNoteId: null
}

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        updateIsEditingNote(state, action) {
            state.isEditingNote = !state.isEditingNote
        },
        updateEditingNoteId(state, action) {
            state.editingNoteId = action.payload
        },
        updateDeletingNoteId(state, action) {
            state.deletingNoteId = action.payload
        }
    },
    extraReducers: {
        [fetchNotes.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchNotes.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.notes = action.payload
        },
        [fetchNotes.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addNewNote.fulfilled]: (state, action) => {
            state.notes.push(action.payload)
        },
        [updateOneNote.fulfilled]: (state, action) => {
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
        },
        [deleteOneNote.fulfilled]: (state, action) => {
            var index = state.notes.map(note => {
                return note.Id;
            }).indexOf(action.payload);
            state.notes.splice(index, 1);
        }
    }
})

export const selectIsEditingNote = state => state.notes.isEditingNote
export const selectEditingNoteId = state => state.notes.editingNoteId
export const selectAllNotes = state => state.notes
export const selectNoteById = (state, id) => state.notes.notes.find(note => note.id === id)
export const selectApiStatus = state => state.notes.status
export const selectApiError = status => status.notes.error


export const {
    updateIsEditingNote,
    updateEditingNoteId,
    updateDeletingNoteId
} = notesSlice.actions

export default notesSlice.reducer