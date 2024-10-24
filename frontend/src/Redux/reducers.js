
import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./Slices/authSlice"
import signupSlice from "./Slices/signupSlice"

export const store = configureStore({
    reducer:{
        auth:authSlice,
        signup:signupSlice
    }
})