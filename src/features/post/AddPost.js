import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from './postSlice'

const AddPost = () => {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [isFormOpen,setIsFormOpen] = useState(false)
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
      <button className='text-center justify-center bg-blue-500 text-white font-semibold mt-5 rounded-lg p-4' onClick={()=> setIsFormOpen(!isFormOpen)}>Add Post</button>
      { isFormOpen &&
        <div className='fixed inset-0 flex justify-center text-center items-center z-50 w-full' onClick={()=>setIsFormOpen(false)}>
      <form onSubmit={handleSubmit}      onClick={(e) => e.stopPropagation()} // Prevent form close on clicking inside the form
       className='text-center justify-center bg-slate-400 flex-col p-4 m-4 shadow-lg rounded-xl'>
      <div className='m-5'>
      <label className='text-xl font-semibold '>Title</label>
      <input type='text' value={title} onChange={onTitleChange} className='w-full rounded-lg p-2'/>
      </div>
     <div className='m-5'>
      <label className='text-xl font-semibold '>Content</label>
      <textarea type='text' value={content} onChange={onContentChange} className='w-full rounded-lg p-2'/>
      </div>
      <button type='submit' className='text-center justify-center bg-blue-500 text-white font-semibold mt-5 rounded-lg p-2'>save Post</button>
    
      </form>
      </div>
      }
    </div>
  )
}

export default AddPost;
