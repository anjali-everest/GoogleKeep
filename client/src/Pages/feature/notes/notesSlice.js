import {
    createSlice
} from '@reduxjs/toolkit'

const initialState = [{
        id: '1',
        title: 'First Note!',
        content: 'Hello!'
    },
    {
        id: '2',
        title: 'Second Note',
        content: 'More text'
    }
]

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {}
})

export default notesSlice.reducer