import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const Emojipick = ({ children,setEmojiicon }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(!open)}>
        {children}
      </div>
      {open && (
        <div className="absolute -mt-8 ml-2 z-10">
          <EmojiPicker onEmojiClick={(e)=>{setEmojiicon(e.emoji)
            setOpen(false)
          }} />
        </div>
      )}
    </>
  );
};

export default Emojipick;
