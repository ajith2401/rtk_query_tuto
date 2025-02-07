import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, editPost } from './postSlice'
import { getUserSuccess } from './userSlice'

const AddPost = ({ post, isEditing = false, onClose }) => {
  console.log({post});
  
  const users = useSelector(getUserSuccess);
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || post?.body || '');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const postAuthor = users?.find((user) => Number(user?.id) === Number(post?.userId)) || '';
  const [userId, setUserId] = useState(postAuthor?.id || '');
  const dispatch = useDispatch();

  const onTitleChange =(e)=>{
    setTitle(e.target.value)
}
const onContentChange =(e)=>{
    setContent(e.target.value)
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !userId) return;

    if (isEditing) {
      dispatch(editPost({
        id: post.id,
        title,
        content,
        userId
      }));
      onClose?.(); // Close the edit form
    } else {
      dispatch(addPost(title, content, userId));
      setIsFormOpen(false);
    }
    
    setUserId('');
    setTitle('');
    setContent('');
  };

  return (
    <div>
    {!isEditing && (
      <button 
        className='text-center justify-center bg-blue-500 text-white font-semibold mt-5 rounded-lg p-4' 
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        Add Post
      </button>
    )}
      { (isFormOpen || post) &&
        <div className='fixed inset-0 flex justify-center text-center items-center z-50 w-full' 
        onClick={() => isEditing ? onClose?.() : setIsFormOpen(false)}>
      <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} // Prevent form close on clicking inside the form
       className='text-center justify-center bg-slate-400 flex-col p-4 m-4 shadow-lg rounded-xl'>
      <div className='m-5'>
      <label className='text-xl font-semibold '>Title</label>
      <input type='text' value={title} onChange={onTitleChange} className='w-full rounded-lg p-2'/>
      </div>
     <div className='m-5'>
      <label className='text-xl font-semibold '>Content</label>
      <textarea type='text' value={content} onChange={onContentChange} className='w-full rounded-lg p-2'/>
      </div>

      <div className='m-5'>
      <label className='text-xl font-semibold'>Author</label>
      {users && (
          <select 
              className='w-full rounded-lg p-2' 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)}
          >
              <option value="">--select author--</option>
              {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
              ))}
          </select>
      )}
  </div>

  <button type='submit' className='text-center justify-center bg-blue-500 text-white font-semibold mt-5 rounded-lg p-2'>
  {isEditing ? 'Update Post' : 'Save Post'}
</button>
    
      </form>
      </div>
      }
    </div>
  )
}

export default AddPost;
