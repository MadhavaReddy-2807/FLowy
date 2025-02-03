"use client";
import React, { useEffect, useState } from 'react';
import Logo from './logo';
import { Progress } from "@/components/ui/progress"
import { Bell, Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import Dropdown from './Dropdown';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast"
const Sidenav = ({ params }) => {
  const { docid, workspaceid } = React.use(params);
 const router=useRouter();
 const [doc,setDoc]=useState(docid);
  const [docs, setDocs] = useState([]);
  const { toast } = useToast()
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

    if (workspaceid) {
      fetchWorkspaceData();
    }
  }, [workspaceid]);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
   console.log(workspace);
   if(workspace)
   {
    console.log(workspace);
     updateworkspace();
   }
  },[workspace])

  const updatedoc=async()=>{
    console.log(docs)
    if(docs.length>=5)
    {
        toast({
          title: "Upgrade plan",
          description: "You reached max file,Upgrade your plan for unlimited access",
        })
      return;
    }
    const newid= uuidv4();
    setDoc(newid)
    const newDoc = { id: newid, name: "Untitled Document" };
    // console.log(newDoc)
    const updatedDocs = [...docs, newDoc];
    setDocs(updatedDocs);
    // console.log(docs)
    setWorkspace((prev) => ({ ...prev, docs: updatedDocs }));
    //  console.log(workspace)
    toast({
      title: "Document Added",
    })
  }
  const updateworkspace=async()=>{
    setLoading(true);
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"workspaces", {
     method: "PUT",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       workspaceid: workspaceid,
       workspace
     })
   });
   setLoading(false);
  //  setDoc()
   router.replace('/workspace/'+workspaceid+`/${doc}`)
  }
const changedoc=(item)=>{
   router.replace('/workspace/'+workspaceid+`/${item?.id}`)
}
  return (
    <div className="md:w-72 hidden md:block bg-blue-50 h-screen p-5">
      <div className="md:flex justify-between justify-items-center p-1 pb-3 border-b-2">
        <div className="-mt-3">
          <Logo />
        </div>
        <Bell />
      </div>
      <div className="flex justify-between mt-5 p-1">
        <h2 className="text-xl font-semibold">WorkSpace Name</h2>
        <Button size="sm" className="text-xl" onClick={updatedoc}>
          {loading?<Loader2 className='animate-spin'/>:<Plus/>}
          
        </Button>
      </div>
      <div className='mt-5'>
        {docs?.length > 0 ? (
          docs?.map((item, index) => (
            <div key={index} className={` text-lg flex  justify-between items-center p-2 rounded-md hover:cursor-pointer ${
              item?.id === docid ? "bg-white shadow-md border hover:bg-blue-100" : ""
            }`} onClick={()=>{changedoc(item)}}>
              {!workspace?.emoji ? (
   <Image src="/document.svg" alt="Document" width={20} height={40} unoptimized />
) : (
   <span className="text-2xl">{workspace.emoji}</span>
)}
              <h2 className='mt-1 text-nowrap'>{item?.name==''?"Untitled Document":item?.name}</h2>
              <div className='mt-2'>
              <Dropdown workspaceid={workspaceid} docid={item?.id}  /></div>

            </div>
          ))
        ) : (
          <p>No Documents available</p>
        )}
      </div>      
      <div className='absolute top-[660px]'>
      <Progress value={(docs.length/5)*100} />
      <h2 className='text-lg mt-2 flex justify-center'><b>{docs.length}</b> &nbsp;Out  of 5 files used    </h2>
      <span className='text-sm'>Upgrade your plan for unlimited access</span>
      </div>


    </div>
  );
};

export default Sidenav;
