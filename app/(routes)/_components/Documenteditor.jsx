import React, { useState } from 'react'
import Documentheader from './Documentheader'
import Documentinfo from './Documentinfo'
import { Button } from '@/components/ui/button'
import { MessageCircle, X } from 'lucide-react'
import Commentbox from './Commentbox'
const Documenteditor = ({params}) => {
  const changecomment=()=>{
    setopencomment((prev)=>!prev)
  }
  const [opencomment,setopencomment]=useState(false);
  return (
    <div className='flex flex-col h-screen w-full'>
      {/* header */}
      <Documentheader />
      <Documentinfo params={params}/>
      <div className='flex-grow bg-white p-4'>
        {/* Other editor content goes here */}
      </div>
      <div className='fixed right-16  bottom-36 md:right-4 md:bottom-20  mr-2 z-40'>
        <Button onClick={changecomment}>{opencomment?<X/>:<MessageCircle/>}</Button>
        {opencomment&&<Commentbox params={params}/>}
      </div>
    </div>
  )
}

export default Documenteditor
