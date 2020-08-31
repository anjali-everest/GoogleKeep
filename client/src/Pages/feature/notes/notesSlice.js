import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'
import {
    getNotes,
    addNote
} from "../../../Util/ApiHandler"
import ResponseHandler from "./../../../Util/ResponseHandler"

const initialState = {
    notes: [],
    status: 'idle',
    error: null
}

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    const response = ResponseHandler.getResponse(await getNotes());
    return response.data
})

export const addNewNote = createAsyncThunk('notes/addNewNote', async initialNote => {
    const addNoteResponse = ResponseHandler.getResponse(await addNote(initialNote))
    return addNoteResponse.data
})

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchNotes.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchNotes.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.notes = state.notes.concat(action.payload)
        },
        [fetchNotes.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addNewNote.fulfilled]: (state, action) => {
            state.notes.push(action.payload)
        }
    }
})

export default notesSlice.reducer