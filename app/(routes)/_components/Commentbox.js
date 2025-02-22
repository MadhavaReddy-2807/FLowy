"use client";
import React from "react";
import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";

const Commentbox = ({ params }) => {
  const { threads } = useThreads(); // Fetch threads dynamically

  return (
    <div className="w-[300px] h-[350px] shadow-lg rounded-lg overflow-auto p-4 bg-white">
      <h2 className="text-lg font-semibold mb-2">Comments</h2>

      <div className="space-y-2">
        {threads?.length > 0 ? (
          threads.map((thread) => <Thread key={thread.id} thread={thread} />)
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>

      {/* Show composer only if threads exist */}
      
        <div className="mt-4 border-t pt-2">
          <Composer />
        </div>
      
    </div>
  );
};

export default Commentbox;
