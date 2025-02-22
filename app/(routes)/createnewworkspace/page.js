"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, SmilePlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Coverpicker from '../_components/Coverpicker';
import Emojipick from '../_components/Emojipicker';
import { useAuth, useUser } from '@clerk/clerk-react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
const CreateWorkspace = () => {
  const [client,setClient]=useState(false);
  useEffect(()=>{
    setClient(true);
  },[])
  const [coverimage, setcoverimage] = useState('/coverimage.jpg');
  const [workspacename, setworkspacename] = useState('');
  const [emoji,setEmoji]=useState();
  const orgId=useAuth();
  const user=useUser();
  const [loading,setLoading]=useState(false);
  const id=uuidv4();
  const docid=uuidv4();
  const oncreateworkspace=async()=>{
    const arr=[{id:docid,name:""}];
    console.log(orgId)
    setLoading(true)
    const workspace={
      workspacename:workspacename,
      emoji:emoji||"📁",
      coverimage:coverimage,
      createdby:user?.primaryEmailAddress?.emailAddress,
      workspaceid:id,
      docs:arr,
      orgId:orgId?orgId:user?.primaryEmailAddress?.emailAddress
    
  }
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL+"workspaces")
  const res =await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"workspaces",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(workspace)})
  if(res.ok)
  {
    console.log('Success');
    setLoading(false)
  }
  setworkspacename("");
  router.replace('/workspace/'+id+'/'+docid)
}
const router=useRouter();
const godashboard=()=>{
  router.push('/dashboard');
}
  return (
    <div className="py-3 md:p-36  md:-mt-10 md:mx-9 md:px-10 flex justify-center justify-items-center ">
      <div className="relative hover:cursor-pointer border rounded-t-xl shadow-xl pb-10 w-[80%]">
        <Coverpicker className="w-full" setNewcover={(v) => setcoverimage(v)}>
          <div className="w-full group">
            <h2 className="absolute mx-auto items-center justify-center w-full h-[150px] font-semibold text-xl hidden group-hover:flex">
              Change Cover
            </h2>
            <div>
              <Image
                src={coverimage}
                width={400}
                height={400}
                alt=""
                className="w-full h-[150px] object-cover rounded-t-xl group-hover:opacity-70"
              />
            </div>
          </div>
        </Coverpicker>

        <div className="p-10">
          <h2 className="font-semibold text-xl">Create a new workspace</h2>
          <h2 className="text-sm mt-2">
            This is a shared space where you can work with your team together. You can always rename it later.
          </h2>
          <div className="mt-5 w-[100%]">
            <div className="flex gap-2">
              <Emojipick setEmojiicon={(v)=>{setEmoji(v)}}>
                <Button variant="outline">
                  {emoji?emoji:<SmilePlus />}
                </Button>
              </Emojipick>
              <Input
                className=""
                placeholder="Workspace Name"
                value={workspacename}
                onChange={(e) => setworkspacename(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-5 gap-3">
              <Button disabled={!workspacename?.length} onClick={oncreateworkspace} >{loading?<Loader2 className='animate-spin'/>:"Create"}</Button>
              <Button variant="outline" onClick={godashboard} >Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspace;
