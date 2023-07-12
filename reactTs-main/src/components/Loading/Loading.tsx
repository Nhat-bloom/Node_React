import { Spin } from 'antd'
import React from 'react'

const Loading = () => {
   return (
      <div className='flex justify-center items-center w-full min-h-screen'>
         <Spin size='large' />
      </div>
   )
}

export default Loading
