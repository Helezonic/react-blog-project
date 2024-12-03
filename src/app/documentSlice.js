import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    documents : [],
    updated : 0, // To Trigger getAllPosts if any Edit or Add Post
    loading : true //Load state during document updates
}

const documentSlice = createSlice(
    {
        name : "post",
        initialState,
        reducers : {
            addPosts : (state, action) => {
                state.documents = action.payload
            },
            update : (state) => {
                state.updated++
            },
            load : (state) => {
                state.loading = true
            },
            notLoad : (state) => {
                state.loading = false
            },
            clearDoc : (state) => {
                state.documents = [],
                state.updated = 0
            }
        }
    }
)

export default documentSlice.reducer
export const {addPosts, update, load, notLoad, clearDoc} = documentSlice.actions