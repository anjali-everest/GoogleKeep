import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'
import {
    getNotes,
    addNote,
    updateNote
} from "../../../Util/ApiHandler"
import ResponseHandler from "./../../../Util/ResponseHandler"

const initialState = {
    notes: [],
    status: 'idle',
    error: null,
    editingNoteId: true,
    isEditingNote: false
}

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    const response = ResponseHandler.getResponse(await getNotes());
    return response.data
})

export const addNewNote = createAsyncThunk('notes/addNewNote', async initialNote => {
    const addNoteResponse = ResponseHandler.getResponse(await addNote(initialNote))
    return addNoteResponse.data
})

export const updateOneNote = createAsyncThunk('notes/updateNote', async updatedNote => {
    const updateNoteResponse = ResponseHandler.getResponse(await updateNote(updatedNote))
    return updateNoteResponse.data
})

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        updateIsEditingNote(state, action) {
            state.isEditingNote = !state.isEditingNote
        },
        updateEditingNoteId(state, action) {
            state.editingNoteId = action.payload
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
        }
    }
})

export const {
    updateIsEditingNote,
    updateEditingNoteId
} = notesSlice.actions

export default notesSlice.reducer