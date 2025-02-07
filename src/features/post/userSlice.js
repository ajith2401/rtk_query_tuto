import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users : [],
    status: 'idle',
    error :""
}


export const fetchUser = createAsyncThunk('users/fetchUsers' , async()=>{
    try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await axios.get(url)
    return [...response.data]
        
    } catch (error) {
        return error.message
    }
    


})


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers :{

    },
    extraReducers(builder){
        builder.addCase(fetchUser.pending, (state,action)=>{
            state.status = 'loading'
        })
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
             state.status = 'succeeded';
             state.users = action.payload

        })
        builder.addCase(fetchUser.rejected,(state,action)=>{
             state.status = 'failed';
             state.error = action.payload || "something went wrong"
        })
    }

})

export const getUserStatus = (state)=>state.users.status;
export const getUserSuccess = (state)=>state.users.users;
export const getUserFailure = (state)=>state.users.error;

export default userSlice.reducer;