import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    signupData : null
}

const signupSlice = createSlice ({
    name:"signup",
    initialState,
    reducers:{
        setSignupData :(state,actions)=>{
            state.signupData = actions.payload
        }
    }
})

export const {setSignupData} = signupSlice.actions
export default signupSlice.reducer