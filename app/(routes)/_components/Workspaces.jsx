import React from 'react'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { MoreVertical } from 'lucide-react';
const Workspaces = ({ workspacelist }) => {
  const router=useRouter();
  const onclickspace=(workspaceid,docid)=>{
    router.push('/workspace/'+workspaceid+'/'+docid);
  }
  const deleteworkspace=async (id)=>{
    const res =await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"workspace",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspaceid:id})})
    // console.log("helo")
    window.location.reload();
  }
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ml-2'>
      {workspacelist.map((item, index) => (
        <div key={index} className=' border-2  rounded-lg shadow-md hover:cursor-pointer hover:shadow-lg'>
          <div>

          <Image
            src={item?.coverimage}
            alt={item?.workspacename || 'Workspace Image'}
            objectFit="cover"
            className=" flex justify-center object-cover h-[150px] w-[100%]" height={200} width={300} onClick={()=>onclickspace(item.workspaceid,item?.docs[0]?.id)}
          />          </div>

          <div className='flex justify-between'>
          <h2 className='flex p-2 ml-2 mt-2 justify-center font-lightbold text-xl'><span className='mr-2'>{item?.emoji}</span>{item?.workspacename}</h2>
          <DropdownMenu>
  <DropdownMenuTrigger className='ml-1'><MoreVertical/></DropdownMenuTrigger>
  <DropdownMenuContent className='absolute'>
    <DropdownMenuItem className='text-red-600' onClick={
      ()=>{
      deleteworkspace(item.workspaceid)}
    }>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>          </div>

        </div>
      ))}
    </div>
  )
}

export default Workspaces