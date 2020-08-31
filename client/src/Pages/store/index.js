import {
    configureStore
} from '@reduxjs/toolkit';

import notesReducer from "../feature/notes/notesSlice";

export default configureStore({
    reducer: {
        notes: notesReducer
    }
})