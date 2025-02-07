import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from './postSlice'
import { nanoid } from '@reduxjs/toolkit'

const AddPost = () => {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const dispatch = useDispatch()

    const onTitleChange =(e)=>{
        setTitle(e.target.value)
    }
    const onContentChange =(e)=>{
        setContent(e.target.value)
    }

    const handleSubmit = (e) => {  // Add event parameter
        e.preventDefault()  // Prevent form submission
        
        if (!title.trim() || !content.trim()) return  // Basic validation
        
        dispatch(addPost(title,content))
        
        setTitle('')
        setContent('')
      }
    


  return (
    <div>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
      <label>title</label>
      <input type='text' value={title} onChange={onTitleChange}/>
      <label>content</label>
      <input type='text' value={content} onChange={onContentChange}/>
      <button type='submit'>save Post</button>
      </form>
    </div>
  )
}

export default AddPost;
