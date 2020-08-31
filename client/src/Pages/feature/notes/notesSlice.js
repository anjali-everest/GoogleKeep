import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'
import {
    getNotes
} from "../../../Util/ApiHandler"
import ResponseHandler from "./../../../Util/ResponseHandler"

const initialState = {
    notes: [],
    status: 'idle',
    error: null
}

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    const response = ResponseHandler.getResponse(await getNotes());
    console.log(response)
    return response.data
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
            // Add any fetched posts to the array
            state.notes = state.notes.concat(action.payload)
        },
        [fetchNotes.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export default notesSlice.reducer