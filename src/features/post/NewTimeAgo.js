import { formatDistanceToNow, parseISO } from 'date-fns'
import React from 'react'

const TimeAgo = ({timeStamp}) => {
    const date = parseISO(timeStamp)
    const time = formatDistanceToNow(date)
    const timeAgo = `${time} ago`
  return (
    <div>
      <span className='text-sm'>
      &nbsp; {timeAgo}
      </span>
    </div>
  )
}

export default TimeAgo;