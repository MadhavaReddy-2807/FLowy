"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { AlignLeft, ArrowLeftIcon, LayoutGrid } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Workspaces from "./Workspaces";
import { FaHome } from "react-icons/fa";

const Workspacelist = () => {
  const { orgId, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [workspacelist, setWorkspacelist] = useState([]);

  useEffect(() => {
    setWorkspacelist([]);
  }, [orgId]);

  const getworkspacelist = async () => {
    if (!user) return;
    console.log("Org ID:", orgId);
    console.log("User ID:", userId);
    
    const queryParam = orgId ? `orgId=${orgId}` : `userId=${userId}`;
    console.log("Query:", queryParam);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}workspacelist?${queryParam}`
      );

      if (!response.ok) throw new Error("Failed to fetch workspaces");

      const data = await response.json();
      setWorkspacelist(data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  useEffect(() => {
    if (user) getworkspacelist();
  }, [orgId, user]);

  return (
    <>
    <div className="p-8 m-10 md:p-16 md:m-10">
      <div className="flex justify-between">
      <div className=''><Button className='mb-3' onClick={()=>{goback()}}><FaHome />
      Home</Button>
        <h2 className="font-bold overflow-clip  text-3xl ">Hello, {user?.fullName} 👋</h2></div>
        <Button onClick={() => router.push("/createnewworkspace")}>+</Button>
      </div>

      <div className="p-14 flex justify-between text-xl">
        <h2 className="text-[#1cd1ea] font-semibold">WorkSpaces</h2>
       
      </div>

      {workspacelist.length === 0 ? (
        <div className="flex justify-center">
          <div className="flex-col text-center">
            <img src="workspace.webp" alt="Workspace" width={200} />
            <p className="text-md mt-2">Create a new Workspace</p>
            <Button className="mt-2" onClick={() => router.push("/createnewworkspace")}>
              Add a new Workspace
            </Button>
          </div>
        </div>
      ) : (
        <Workspaces workspacelist={workspacelist} />
      )}
    </div>
  </>
  );
};

export default Workspacelist;
