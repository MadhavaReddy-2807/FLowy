import { Link2Icon, MoreVertical, PenBox, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from '@/hooks/use-toast'

const Dropdown = ({workspaceid,docid}) => {
   const deletedoc=async ()=>{
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"workspaces", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        workspaceid:workspaceid,
        docid: docid,
      })
    });
    if(res.ok)
    {
      window.location.reload();
      // toast({
      //   title: "Document Deleted",
      // })   
    }
  }
  const [down,setDown]=useState(false);
  return (
    <div>
    <div className=''>
    <DropdownMenu>
  <DropdownMenuTrigger className='ml-1'><MoreVertical/></DropdownMenuTrigger>
  <DropdownMenuContent className='absolute'>
  
    <DropdownMenuItem><Link2Icon/>Share</DropdownMenuItem>
    <DropdownMenuItem><PenBox/>Rename</DropdownMenuItem>
    <DropdownMenuItem className='text-red-600' onClick={deletedoc}><Trash2/>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

    </div>
    </div>

  )
}

export default Dropdown