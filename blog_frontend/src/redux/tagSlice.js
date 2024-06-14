import { createSlice } from "@reduxjs/toolkit";

export const tagSlice = createSlice({
    name: 'tags',
    initialState: {
        selectedTags: []
    },
    reducers: {
        addTag: (state, action) => {
            state.selectedTags.push(action.payload);
        },
        removeTag: (state,action) => {
            state.selectedTags = state.selectedTags.filter(tag => tag.id !== action.payload)
        }
    }
});

export const { addTag, removeTag } = tagSlice.actions;

export default tagSlice.reducer;