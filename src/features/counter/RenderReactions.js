import React from 'react'
import { useDispatch } from 'react-redux';
import { addReaction } from '../post/postSlice';

const RenderReactions = ({id,reactions}) => {
   const dispatch = useDispatch()
    const RenderPostReaction = Object.entries(reactions).map(([reactionType,reactionData])=>
        <div key={reactionType}> 
        <p>{reactionData.count}</p>
        <button onClick={()=>dispatch(addReaction({id,reactionType}))}>{reactionData.emoji}</button>
        </div>)

  return (
    <div className='flex space-x-4'>
      {RenderPostReaction}
    </div>
  )
}

export default RenderReactions;