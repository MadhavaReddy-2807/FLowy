'use client'
import React, { useState, useEffect } from 'react'
import Coverpicker from './Coverpicker'
import Image from 'next/image';
import { useParams, useRouter } from "next/navigation";
import Emojipick from './Emojipicker2';
import { SmilePlus } from 'lucide-react';

const Documentinfo = () => {
  const router = useRouter();
  const params = useParams();  
  const { docid, workspaceid } = params;

  const [docs, setDocs] = useState([]);
  const [currentdoc, setcurrentdoc] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const [coverimage, setcoverimage] = useState('/coverimage.jpg');
  const [emoji, setEmoji] = useState(null);

  useEffect(() => {
    if (docs && docid) {
      const doc = docs.find((d) => d?.id === docid);
      setcurrentdoc(doc || null);
    }
  }, [docid, docs]);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}workspaces?workspaceid=${workspaceid}`);
        const data = await res.json();
        setDocs(data);
        if (data) {
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
  }, [docid]);

  useEffect(() => {
    if (workspace) {
      setcoverimage(workspace?.coverimage);
      setEmoji(workspace?.emoji);
    }
  }, [workspace]);

  useEffect(() => {
    if (workspace?.coverimage !== coverimage) {
      setWorkspace((prev) => ({ ...prev, coverimage }));
    }
  }, [coverimage]);

  useEffect(() => {
    if (workspace?.emoji !== emoji) {
      setWorkspace((prev) => ({ ...prev, emoji }));
    }
  }, [emoji]);

  useEffect(() => {
    if (workspaceid && workspace) {
      const timeout = setTimeout(() => {
        updateworkspace();
      }, 1000); 
  
      return () => clearTimeout(timeout);
    }
  }, [workspaceid, workspace]);

  const updateworkspace = async () => {
    if (workspace && workspaceid) {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "workspaces", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          workspaceid: workspaceid,
          workspace
        })
      });
    }
  };

  const changevalue = (e) => {
    const newName = e.target.value;
    setcurrentdoc((prev) => ({ ...prev, name: newName }));

    setWorkspace((prev) => {
      if (!prev || !prev.docs) return prev;
      return {
        ...prev,
        docs: prev.docs.map((doc) =>
          doc?.id === docid ? { ...doc, name: newName } : doc
        ),
      };
    });

    // console.log("Updated Workspace:", workspace);
  };

  useEffect(() => {
    if (currentdoc?.name) {
      if (router.asPath) {
        router.replace(router.asPath); // Force reload
      }
    }
  }, [currentdoc?.name]);

  return (
    <>
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
                className="w-full h-[200px] object-cover group-hover:opacity-70"
              />
            </div>
          </div>
        </Coverpicker>

        <Emojipick setEmojiicon={(v) => setEmoji(v)}>
          <div className='bg-gray-200 p-2 border w-16 justify-center hover:bg-slate-100 hover:cursor-pointer border-black rounded-xl relative bottom-8 left-2'> 
            {emoji ? <span className='text-4xl'>{emoji}</span> : <SmilePlus size={40} />}
          </div>
        </Emojipick>

        {/* File Name */}
        <div className='font-bold text-3xl ml-3'>
          <input 
            type="text" 
            placeholder='Untitled Document' 
            name='name'  
            className='outline-none'
            value={currentdoc?.name || ""}
            onChange={(e) => setcurrentdoc({ ...currentdoc, name: e.target.value })}
            onBlur={(e) => changevalue(e)}
          />
        </div>
      </div>
    </>
  );
}

export default Documentinfo;
