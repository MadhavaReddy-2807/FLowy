'use client'
import React, { use, useState } from 'react'
import Coverpicker from './Coverpicker'
import { useEffect } from 'react';
import Image from 'next/image';
import { useParams } from "next/navigation";
import Emojipick from './Emojipicker2';
import { Button } from '@/components/ui/button';
import { SmilePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
const Documentinfo = () => {
  const router=useRouter();
    const params = useParams();  
    const { docid, workspaceid } = params;
    // console.log(`doc id is ${workspaceid}`)

    const [docs,setDocs]=useState([]);
    const [currentdoc,setcurrentdoc]=useState(null);
    useEffect(()=>{
      if (docs && docid) {
        const doc = docs.find((d) => d?.id === docid);
        setcurrentdoc(doc || null);
      }
    },[docid,docs])
    const [workspace,setWorkspace]=useState(null);
  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`+`workspaces?workspaceid=${workspaceid}`);
        const data = await res.json();
        setDocs(data);
        console.log(data);
        if(data)
        {
          setWorkspace(data);
          setDocs(data?.docs);
        }
      } catch (error) {
        console.error("Error fetching workspace data:", error);
      }
    };
    console.log(workspace);
    if (workspaceid) {
      fetchWorkspaceData();
    }
  }, [docid]);
  const [coverimage, setcoverimage] = useState('/coverimage.jpg');
  const [emoji,setEmoji]=useState(null);
  useEffect(()=>{
     if(workspace)
     {
      console.log(workspace);
       console.log(workspace?.coverimage);
      setcoverimage(workspace?.coverimage);
      setEmoji(workspace?.emoji)
     }
  },[workspace])
  useEffect(()=>{
    if(workspace?.coverimage !== coverimage) {
      setWorkspace((prev) => ({ ...prev, coverimage }));
    }
  },[coverimage]);
  useEffect(()=>{
    if(workspace?.emoji !== emoji) {
      setWorkspace((prev) => ({ ...prev, emoji }));
    }
  },[emoji]);
  useEffect(() => {

    if (workspaceid && workspace) {
      const timeout = setTimeout(() => {
        updateworkspace();
        // window.location.reload();

      }, 1000); 
  
      return () => clearTimeout(timeout); 
    }
  }, [workspaceid, workspace]);
  const updateworkspace=async()=>{
    // setLoading(true);
    console.log(workspace)
    if(workspace&&workspaceid)
    {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"workspaces", {
     method: "PUT",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       workspaceid: workspaceid,
       workspace
     })
    
   });}
  //  setLoading(false);
  //  setDoc()
  //  router.replace('/workspace/'+workspaceid+`/${doc}`)
  // window.location.reload();

  }
const changevalue=(e)=>{
  const name=e.target.name;
  const value=e.target.value;
  const updateddoc={...currentdoc,name:value};
    setcurrentdoc(updateddoc)
    console.log(updateddoc)
    setWorkspace((prev)=>{
      if(!prev||!prev.docs)
      {
        return prev;
      }
      const updateddocs=prev.docs?.map((doc)=>
        doc?.id===docid?{...doc,name:value}:doc
      )
      console.log(updateddocs)
      return {...prev,docs:updateddocs};
    }
  )
    console.log(updateddoc);
    console.log("Updated Workspace:", workspace);

   
}
useEffect(() => {
  if ( currentdoc?.name) {
    if(router.asPath)
    {

      router.replace(router.asPath);//force reload
    }
  }
  // window.location.reload();
}, [currentdoc?.name]);
  return (
    <div>
        <Coverpicker setNewcover={(v) => setcoverimage(v)}>
             <div className="w-full group">
                        <h2 className="absolute items-center justify-center w-[70%] h-[200px] font-semibold text-xl hidden group-hover:flex">
                          Change Cover
                        </h2>
                        <div>
                          <Image
                            src={coverimage}
                            width={400}
                            height={400}
                            alt=""
                            className="w-full h-[200px] object-cover rounded-t-xl group-hover:opacity-70"
                          />
                        </div>
                      </div>
        </Coverpicker>
        <Emojipick setEmojiicon={(v)=>{setEmoji(v)}}>
                <div variant="outline" className='bg-[#ffff] p-2 border w-16 justify-center hover:bg-slate-100 border-black rounded-xl relative bottom-8 left-2'> 
                  {emoji?<span className='text-4xl'>{emoji}</span>:<SmilePlus size={40} />}
                </div>
              </Emojipick>
              {/* File Name */}
              <div className='font-bold text-3xl ml-3'>
                <input type="text" placeholder='Untiled  Document' name='name'  className='outline-none'
                defaultValue={currentdoc?.name||""}  onBlur={(e)=>{
                   changevalue(e);
                }} /></div>
 
    </div>
  )
}

export default Documentinfo