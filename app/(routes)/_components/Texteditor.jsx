"use client"
import React, { useEffect, useRef, useState } from 'react'
import ToggleBlock from 'editorjs-toggle-block';
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code';
import Undo from 'editorjs-undo';
import AIText from '@alkhipce/editorjs-aitext'
import Alert from 'editorjs-alert';
import { useParams } from 'next/navigation';
// import { useState } from 'react';
// import React, { useEffect, useRef, useState } from 'react'
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import Delimiter from '@editorjs/delimiter';
// import Alert from 'editorjs-alert';
import List from "@editorjs/list";
// import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist'
// import Embed from '@editorjs/embed';
// import SimpleImage from 'simple-image-editorjs';
// import Table from '@editorjs/table'
// import CodeTool from '@editorjs/code'
import Paragraph from '@editorjs/paragraph';
import GenerateFromAI from './GenerateFromAI';
const Texteditor = () => {
      const params = useParams();  
      const { docid, workspaceid } = params;
  const ref = useRef(); // Create a reference to store the editor instance
  const [docs,setDocs]=useState(null);
  const [workspace,setWorkspace]=useState(null);
  
  useEffect(() => {
    intieditor(); // Initialize the editor when the component mounts
  }, []);
  const savedocument=()=>
  {
    ref.current.save().then((output)=>{
      console.log(output)
       changevalue(output);
    })
  }
 const [currentdoc,setcurrentdoc]=useState(null);
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
  const intieditor = () => {
    if(ref.current)
    {
      return;
    }
    // console.log("heel")
    if (!ref.current || !(ref.current instanceof EditorJS)) {  // Check if the editor instance is not yet created
     
      ref.current = new EditorJS({
        onChange:(ap,event)=>{
          savedocument();
        },
        holder: 'editorjs', // Attach the editor to the DOM element with ID 'editorjs'
        autofocus: true,
        placeholder: "Start typing your document here...", // Add placeholder text

        onReady: () => {
          console.log("Editor is ready");
          setTimeout(() => {
            const firstBlock = document.querySelector('.ce-paragraph');
            if (firstBlock) {
              firstBlock.focus(); // Ensure the first paragraph block gets focus
            }
          }, 100);
        },
        
        onChange: (api, event) => {
          savedocument();
        },
        tools:{
          header: Header,
          delimiter: Delimiter,
          table: Table,
          alert: Alert,
          code: CodeTool,
          alert: {
            class: Alert,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+A',
            config: {
              alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
              defaultType: 'primary',
              messagePlaceholder: 'Enter something',
            }
          },
          table: Table,
          list: {
            class: List,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+L',
            config: {
              defaultStyle: 'unordered'
            },
          },
          checklist: {
            class: Checklist,
            shortcut: 'CMD+SHIFT+C',
            inlineToolbar: true,
          },
          toggle: {
            class: ToggleBlock,
            inlineToolbar: true,
          },
          // image: SimpleImage,
          code: {
            class: CodeTool,
            shortcut: 'CMD+SHIFT+P'
          },
        },
      });
    }
  };

  const changevalue=(data)=>{

    const updateddoc={...currentdoc,output:data};
      setcurrentdoc(updateddoc)
      console.log(updateddoc)
      setWorkspace((prev)=>{
        if(!prev||!prev.docs)
        {
          return prev;
        }
        const updateddocs=prev.docs?.map((doc)=>
          doc?.id===docid?{...doc,output:data}:doc
        )
        console.log(updateddocs)
        return {...prev,docs:updateddocs};
      }
    )
      console.log(updateddoc);
      console.log("Updated Workspace:", workspace);
  
     
  }

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
    useEffect(() => {
      if (docs && docid && ref.current instanceof EditorJS) {
        const doc = docs.find((d) => d?.id === docid);
        setcurrentdoc(doc || null);
        
        if (doc?.output) {
          setTimeout(() => {
            ref.current?.render(doc.output);
          }, 500);
        }
      }
    }, [docid, docs]);
    
  return (
    <div className='w-full'>
      <div id='editorjs' className=' flex justify-start ml-6 w-full  relative bottom-[400px] p-10'></div>
      <div  className='fixed bottom-20 md:ml-80 left-0 z-10'><GenerateFromAI setGeneratedOutput={(output) => {
  if (ref.current) {
    ref.current.render(output);
  } else {
    console.error("Editor instance not initialized.");
  }
}} />
</div>
    </div>
  );
};

export default Texteditor;
