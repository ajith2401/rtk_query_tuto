import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReaction } from '../post/postSlice';

const RenderReactions = ({ id, reactions }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  // Get emojis with counts > 0, sorted by count
  const activeEmojis = Object.entries(reactions)
    .filter(([_, data]) => data.count > 0)
    .sort((a,b) => b.count - a.count)
    .slice(0, 3); // Take top 3

  // If no active emojis, show the first three
  const defaultEmojis = activeEmojis.length > 0 
    ? activeEmojis 
    : Object.entries(reactions).slice(0,1);

  // Calculate total reactions
  const totalCount = Object.values(reactions)
    .reduce((sum, reaction) => sum + reaction.count, 0);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Default view showing top emojis */}
      {!isHovered && (
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-1">
            {defaultEmojis.map(([type, data]) => (
              <button 
                key={type}
                className="text-xl hover:scale-125 transition-transform duration-200 ease-in-out"
                title={data.label}
              >
                {data.emoji}
              </button>
            ))}
          </div>
     
          {totalCount > 0 &&  <span className="text-sm text-gray-600 ml-2">
              {totalCount}
            </span>}
 
        </div>
      )}

      {/* Expanded emoji view on hover */}
      {isHovered && (
        <div className="absolute bottom-full mb-2 bg-white shadow-lg rounded-lg p-2 border">
          <div className="flex space-x-4">
            {Object.entries(reactions).map(([reactionType, reactionData]) => (
              <div 
                key={reactionType}
                className="flex flex-col items-center"
              >
                <button
                  onClick={() => {
                    dispatch(addReaction({ id, reactionType }));
                    setIsHovered(false);
                  }}
                  className="text-xl hover:scale-125 transition-transform duration-200 ease-in-out"
                  title={reactionData.label}
                >
                  {reactionData.emoji}
                </button>
                {reactionData.count > 0 && (
                  <span className="text-xs text-gray-600">
                    {reactionData.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderReactions;