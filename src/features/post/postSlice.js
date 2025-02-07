import {  createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import {sub} from 'date-fns'

const reactions = {
    like: {
        count: 0,
        emoji: "👍", // Thumbs up emoji
        label: "Like" // Text label
    },
    heart: {
        count: 0,
        emoji: "❤️", // Red heart emoji
        label: "Love"
    },
    thumpsUp: { // Corrected spelling
        count: 0,
        emoji: "🙌", // Raising hands emoji (often used for approval)
        label: "Approve" // Or "Cheer"
    },
    // Add more reactions as needed
    wow: {
      count: 0,
      emoji: "😮",
      label: "Wow"
    },
    laugh: {
      count: 0,
      emoji: "😂",
      label: "Laugh"
    },
    sad: {
      count: 0,
      emoji: "😢",
      label: "Sad"
    }
}

const initialState = {
    status:'idle',
    posts: [
        { id: 1, 
            title: "First Post", 
            content: "This is the content of the first post." ,
            date : sub(new Date(), {minutes: 10}).toISOString(),
            reactions:reactions
        },

        { id: 2, 
          title: "Second Post", 
          content: "Content of the second post goes here.",
          date : sub(new Date(), {minutes: 5 }).toISOString(),
          reactions:reactions
         },
          
        { id: 3, 
           title: "Third Post", 
           content: "More content for the third post." ,
           date : sub(new Date(), {minutes: 30}).toISOString(),
           reactions:reactions
    },
        // ... more initial posts if needed
    ],
    error:''
};

const POST_RL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async () =>{
try {
    const response = await axios.get(POST_RL)
    return [...response.data];
} catch (error) {
    return error.message;
    
}
})



const postSlice = createSlice({
    name :"posts",
    initialState,
    reducers:{
        addPost : {
            reducer: (state,action)=>{
            state.posts.push(action.payload)
        },
        prepare(title,content,userId) {
            return {
                payload: {
                    id:nanoid(),
                    title,
                    content,
                    userId,
                    date : new Date().toISOString(),
                    reactions:reactions
                }
            }
        },

        },
        editPost: (state,action)=>{
            const {id,content,title} = action.payload;
            const postIndex = state.posts.findIndex((post)=> post.id === id)
            state.posts[postIndex] = {...state.posts[postIndex], content, title}

        },
        removePost : (state,action)=>{
            const {id} = action.payload;
            state.posts = state.posts.filter((post)=> post.id !==id )
        },
        addReaction : (state,action) =>{
            const  {id,reactionType} = action.payload;
            const existingPost = state.posts.find(post => post.id ===id)
            existingPost.reactions[reactionType].count++
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending,(state, action)=>{
            state.status = 'loading'
        })
        builder.addCase(fetchPosts.fulfilled,(state, action)=>{
            state.status = 'succeeded';
            let min = 1;
            const loadedPosts = action.payload.map(post =>({
                ...post,
                date :sub(new Date(), {minutes:min++}).toISOString(),
                reactions: reactions
            }
            ))
            state.posts = [...state.posts, ...loadedPosts];
        })
        builder.addCase(fetchPosts.rejected,(state, action)=>{
            state.posts = 'failed'
            state.error = action.payload || 'Failed to fetch posts';
        })
    
    }
})

export const getPostsStatus = (state)=>state.posts.status
export const getPostsError = (state)=>state.posts.error;
export const getPosts = (state)=>state.posts.posts;

export  const {addPost,editPost, removePost,addReaction} = postSlice.actions;
export default postSlice.reducer;