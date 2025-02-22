"use client"
import Documenteditor from '@/app/(routes)/_components/Documenteditor'
import Sidenav from '@/app/(routes)/_components/Sidenav'
import Texteditor from '@/app/(routes)/_components/Texteditor'
import { Room } from '@/app/Room'
import React, {  useEffect } from 'react'

const page = ({params}) => {
    const { docid,workspaceid } = React.use(params);
    // useEffect(()=>{
    // //   if(workspaceid)
    // //   {
    // //     window.location.reload();
    // //   }
    // // },[workspaceid])
  return (
    <Room params={params}>
    <div className='flex flex-row'>
       <div>
        <Sidenav params={params}/>
       </div>
       <div className='w-full flex flex-col '>
            <Documenteditor params={params}/>
            <Texteditor params={params}/>
            </div>

    </div>
          </Room>
  )
}

export default page