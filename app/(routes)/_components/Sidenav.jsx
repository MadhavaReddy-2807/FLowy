"use client";
import React, { useEffect, useState } from "react";
import Logo from "./logo";
import { Progress } from "@/components/ui/progress";
import { Bell, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Dropdown from "./Dropdown";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import Notificationbox from "./Notificationbox";
// import Image from "next/image";
import { FaAlignJustify } from "react-icons/fa";


const Sidenav = ({ params }) => {
  const { docid, workspaceid } = React.use(params);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [doc, setDoc] = useState(docid);
  const [docs, setDocs] = useState([]);
  const { toast } = useToast();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}workspaces?workspaceid=${workspaceid}`
        );
        const data = await res.json();
        setDocs(data);
        console.log(data);
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
  }, [workspaceid]);

  useEffect(() => {
    console.log(workspace);
    if (workspace) {
      console.log(workspace);
      updateworkspace();
    }
  }, [workspace]);

  const updatedoc = async () => {
    console.log(docs);
    if (docs.length >= 5) {
      toast({
        title: "Upgrade plan",
        description: "You reached max file, Upgrade your plan for unlimited access",
      });
      return;
    }
    const newid = uuidv4();
    setDoc(newid);
    const newDoc = { id: newid, name: "" };
    const updatedDocs = [...docs, newDoc];
    setDocs(updatedDocs);
    setWorkspace((prev) => ({ ...prev, docs: updatedDocs }));
    toast({
      title: "Document Added",
    });
  };

  const updateworkspace = async () => {
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}workspaces`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workspaceid: workspaceid,
        workspace,
      }),
    });
    setLoading(false);
    router.replace(`/workspace/${workspaceid}/${doc}`);
  };

  const changedoc = (item) => {
    router.replace(`/workspace/${workspaceid}/${item?.id}`);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
    {!open&&<div onClick={()=>{setOpen(!open)}} className="absolute  ml-2 mt-4">
      <FaAlignJustify />
      </div>}

      {/* Overlay (closes sidebar when clicked outside) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-blue-50 p-5 z-20 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:relative md:w-72 md:translate-x-0 md:block`}
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the sidebar
      >
        <div className="flex  md:flex justify-between p-1 pb-3 border-b-2">
          <div className="-mt-3  ">
            <Logo />
          </div>
          <Notificationbox params={params} >
            <Bell />
          </Notificationbox>
        </div>

        <div className="flex justify-between mt-5 p-1">
          <h2 className="text-xl font-semibold">
            {workspace ? workspace?.workspacename : "Workspace Name"}
          </h2>
          <Button size="sm" className="text-xl" onClick={updatedoc}>
            {loading ? <Loader2 className="animate-spin" /> : <Plus />}
          </Button>
        </div>

        <div className="mt-5">
          {docs?.length > 0 ? (
            docs.map((item, index) => (
              <div
                key={index}
                className={`text-lg flex justify-between items-center p-2 rounded-md hover:cursor-pointer ${
                  item?.id === docid ? "bg-white shadow-md border hover:bg-blue-100" : ""
                }`}
                onClick={() => changedoc(item)}
              >
                {!workspace?.emoji ? (
                  <Image src="/document.svg" alt="Document" width={20} height={40} unoptimized />
                ) : (
                  <span className="text-2xl">{workspace.emoji}</span>
                )}
                <h2 className="mt-1 text-nowrap">{item?.name === "" ? "Untitled Document" : item?.name}</h2>
                <div className="mt-2">
                  <Dropdown workspaceid={workspaceid} docid={item?.id} />
                </div>
              </div>
            ))
          ) : (
            <p>No Documents available</p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="fixed bottom-5 w-full left-0 p-5">
          <Progress value={(docs?.length / 5) * 100} />
          <h2 className="text-lg mt-2 flex justify-center">
            <b>{docs?.length}</b> &nbsp;Out of 5 files used
          </h2>
          <span className="text-sm">Upgrade your plan for unlimited access</span>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
