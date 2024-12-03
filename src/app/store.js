import { configureStore } from "@reduxjs/toolkit"
import authSliceReducer from "./authSlice"
import documentSliceReducer from "./documentSlice"


export const store = configureStore({
  reducer : {
    auth : authSliceReducer,
    document : documentSliceReducer
  }
}) 