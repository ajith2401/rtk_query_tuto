import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderReactions from '../counter/RenderReactions';
import { getPosts, getPostsStatus, getPostsError, fetchPosts } from './postSlice';
import TimeAgo from './NewTimeAgo';


const Posts = () => {
    const dispatch = useDispatch()
    const posts = useSelector(getPosts)
    const postError = useSelector(getPostsError)
    const postStatus = useSelector(getPostsStatus)
    const effectRan = useRef(false)

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
            <h1 className='text-3xl font-semibold'>{post.title}</h1>
            <p className='p-10'>{post.content || post.body}</p>
            
            <div className="flex justify-between items-center">
              <div className="text-left">
                <RenderReactions id={post.id} reactions={post.reactions} />
              </div>
              <div className="text-right text-gray-400">
                <TimeAgo timeStamp={post.date} />
              </div>
           
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