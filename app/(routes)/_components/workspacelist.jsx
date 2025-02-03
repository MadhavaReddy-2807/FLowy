import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import { AlignLeft, LayoutGrid } from 'lucide-react';
import React, { useState } from 'react'
import Link from 'next/link';
const Workspacelist = () => {
    const [workspacelist,setworkspacelist]=useState([]);
    const {user}=useUser();
  return (
    <div className='p-8 m-10 md:p-16 md:m-10'>
        <div className='flex justify-between'>
            <h2 className='font-bold text-3xl'>
                Hello,{user?.fullName}👋
            </h2>
            <Button>+</Button>
        </div>
        <div className='p-14 flex justify-between text-xl'>
            <h2 className='text-[#1cd1ea] font-semibold'>WorkSpaces</h2>
            <div className='flex gap-2 font-bold '>
            <LayoutGrid/>
            <AlignLeft/>
            </div>
        </div>
        {workspacelist.length==0&&
        <div className='flex justify-center'>
        <div className='flex-col '>
            <img src="workspace.webp" alt="" width={200} />
            <p className='text-md mt-2'>Create a new Workspace</p>
            <Link href="/createnewworkspace">
            <Button className='mt-2'>Add a new Work Space</Button></Link>
        </div></div>
        }
    </div>
  )
}

export default Workspacelist