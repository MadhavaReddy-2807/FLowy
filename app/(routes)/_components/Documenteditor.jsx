import React from 'react'
import Documentheader from './Documentheader'
import Documentinfo from './Documentinfo'
const Documenteditor = (params) => {
  return (
    <div className='flex flex-col h-screen w-full'>
      {/* header */}
      <Documentheader />
      <Documentinfo params={params}/>
      <div className='flex-grow bg-white p-4'>
        {/* Other editor content goes here */}
      </div>
    </div>
  )
}

export default Documenteditor
