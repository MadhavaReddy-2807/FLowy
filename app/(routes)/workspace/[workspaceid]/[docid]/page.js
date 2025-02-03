"use client"
import Documenteditor from '@/app/(routes)/_components/Documenteditor'
import Sidenav from '@/app/(routes)/_components/Sidenav'
import Texteditor from '@/app/(routes)/_components/Texteditor'
import React, {  useEffect } from 'react'

const page = ({params}) => {
  return (
    <div className='flex flex-row'>
       <div>
        <Sidenav params={params}/>
       </div>
       <div className='w-full flex flex-col '>
            <Documenteditor params={params}/>
            <Texteditor params={params}/>
            </div>

    </div>
  )
}

export default page