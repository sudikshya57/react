import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-solid'></div>
        <p className='mt-4 text-gray-700'>Loading...</p>
      
    </div>
  )
}

export default Loading
