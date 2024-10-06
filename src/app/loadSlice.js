import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false
}

const loadSlice = createSlice(
    {
        name : "Load",
        initialState,
        reducers : {
            loading : (state) => {
                state.status = true
            },
            notloading : (state) => {
                state.status = false
            }
        }
    }
)

export default loadSlice.reducer
export const {loading, notloading} = loadSlice.actions