import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    token : localStorage.getItem("token") || null,
    loading:false,
    isAdmin:localStorage.getItem("admin") || false,
    isCartUpdate :false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken:(state,actions)=>{
            state.token = actions.payload
        },
        setLoading:(state,actions)=>{
            state.loading = actions.payload
        },
        setAdmin:(state,actions)=>{
            state.isAdmin = actions.payload
        },
        setIsCartUpdate :(state)=>{
            state.isCartUpdate = ! state.isCartUpdate
        }
    }
})


export const { setToken,setLoading,setAdmin ,setIsCartUpdate} = authSlice.actions
export default authSlice.reducer