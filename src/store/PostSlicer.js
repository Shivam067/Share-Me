import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPosts: [], // {id, title, constent, userID, status}
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addAllPosts: (state, action) => {
            state.allPosts = action.payload
        },
        addPost: (state, action) => {
            state.allPosts.push(action.payload)
        },
        deleteMyPost(state, action) {
            const index = state.allPosts.findIndex(post => post.$id === action.payload)
            state.allPosts.splice(index, 1)
        },
        updateMyPost(state, action) {
            state.allPosts = state.allPosts.map(post => post.$id === action.payload.id ? {...action.payload.dbPost} : post)
            // const index = state.allPosts.findIndex(post => post.$id === action.payload.id)
            // state.allPosts[index] = action.payload.dbPost
        }
    }
})

export const { addAllPosts, addPost, deleteMyPost, updateMyPost } = postSlice.actions

export default postSlice.reducer