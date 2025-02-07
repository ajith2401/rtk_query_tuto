import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderReactions from '../counter/RenderReactions';
import { getPosts, getPostsStatus, getPostsError, fetchPosts, removePost } from './postSlice';
import TimeAgo from './NewTimeAgo';
import { getUserSuccess } from './userSlice';
import AddPost from './AddPost';


const Posts = () => {
    const dispatch = useDispatch()
    const posts = useSelector(getPosts)
    const postError = useSelector(getPostsError)
    const postStatus = useSelector(getPostsStatus)
    const effectRan = useRef(false)
    const users = useSelector(getUserSuccess)
    const [editingPostId, setEditingPostId] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);

     // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdownId && !event.target.closest('.dropdown-container')) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdownId]);

    useEffect(() => {
        if (effectRan.current === false) {
            if (postStatus === 'idle') {
                dispatch(fetchPosts())
            }
            return () => {
                effectRan.current = true
            }
        }
    }, [postStatus, dispatch])

    if (postStatus === 'loading') {
        return <div>Loading...</div>
    }

    if (postStatus === 'failed') {
        return <div>Error: {postError}</div>
    }



    const renderPosts = Array.isArray(posts) ? posts.map(post => (
        <div key={post.id} className='border border-r  rounded-lg bg-slate-50 box-border m-4 p-4 shadow-lg'>
        <div className="flex justify-between items-center">
        <div className="text-left text-black">
        <p className='text-sm'><span className='text-sm font-semibold'>Post by: </span> {users.find(user => Number(user.id) === Number(post.userId))?.name || "Unknown Author"}</p>
         </div>
         <div className="text-left text-black flex-col relative dropdown-container">
         <button className='text-xl' onClick={()=>setOpenDropdownId(openDropdownId === post.id ? null : post.id)}>
        ...
        </button>
        {openDropdownId === post.id && (
            <div className='absolute right-0 top-10 bg-white border shadow-lg rounded-lg w-32 py-2 z-10'>
              <button 
                className='w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700'
                onClick={() => {
                  setEditingPostId(post.id);
                  setOpenDropdownId(null);
                }}
              >
                Edit Post
              </button>
              <button 
                className='w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700'
                onClick={() => dispatch(removePost(post))}
              >
                Delete Post
              </button>
            </div>
          )}
          </div>
        </div>
            <h1 className='text-3xl font-semibold'>{post.title}</h1>
            <p className='p-10'>{post.content || post.body}</p>
            
            <div className="flex justify-between items-center">
              <div className="text-left">
                <RenderReactions id={post.id} reactions={post.reactions} />
              </div>
              <div className="text-right text-gray-400 text-sm">
                <TimeAgo timeStamp={post.date} />
              </div>  
              <div>
            </div>
            {editingPostId === post.id && (
              <AddPost 
                post={post} 
                isEditing={true} 
                onClose={() => setEditingPostId(null)}
              />
            )}
          </div>
          </div>
    )) : null;

    

    return (
        <section className='min-h-screen justify-center flex-col text-center p-2'>
            {renderPosts}
        </section>
    )
}

export default Posts;