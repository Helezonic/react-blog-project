import { configureStore } from "@reduxjs/toolkit"
import authSliceReducer from "./authSlice"
import loadSliceReducer from "./loadSlice"


export const store = configureStore({
  reducer : {
    auth : authSliceReducer,
    load : loadSliceReducer
  }
}) 