"use client";
import React, { useEffect, useRef } from "react";
import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";

const Commentbox = ({ params }) => {
  const { threads } = useThreads();
  const isThreadsReady = useRef(false); // Use ref to avoid re-renders

  useEffect(() => {
    if (threads?.length > 0) {
      isThreadsReady.current = true;
    }
  }, [threads]);

  return (
    <div className="w-[300px] h-[350px] shadow-lg rounded-lg overflow-auto p-4 bg-white">
      <h2 className="text-lg font-semibold mb-2">Comments</h2>
      
      <div className="space-y-2">
        {threads?.map((thread) => (
          <Thread key={thread.id} thread={thread} />
        ))}
      </div>

      {isThreadsReady.current && (
        <div className="mt-4 border-t pt-2">
          <Composer />
        </div>
      )}
    </div>
  );
};

export default Commentbox;
