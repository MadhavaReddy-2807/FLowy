"use client";
import React from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Loader2 } from "lucide-react";

export function Room({ children, params }) {
  const { docid,workspaceid } = React.use(params);

  const resolveUsers = async ({ userIds }) => {
    console.log("Fetching users:", userIds);

    if (!userIds || userIds.length === 0) return []; // Early exit

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}getusers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds }),
      });

      if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);

      const users = await res.json();

      return users.map(user => ({
        id: user.email,
        name: user.name,
        avatar: user.avatar,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  return (
    <LiveblocksProvider authEndpoint={`/api/liveblocks-auth?roomId=${workspaceid}`} resolveUsers={resolveUsers}>
      <RoomProvider id={workspaceid}>
        <ClientSideSuspense fallback={<div className="md:w-72 relative hidden md:flex  bg-blue-50 h-screen p-5 text-nowrap">Data is loading please wait... <Loader2 className='animate-spin'/></div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
