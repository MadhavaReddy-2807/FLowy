import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import dialog components
import Coveropt from "../_shared/Coveropt"; // Import cover options (array of cover data)
import Image from "next/image"; 
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

const Coverpicker = ({ children,setNewcover }) => {
  const [selectedCover, setSelectedCover] = useState(null);
  // const [newcover,setNewcover]=useState(null);
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Cover</DialogTitle>

          <div className="grid grid-cols-2 gap-4 p-4">
            {Coveropt.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedCover(item)}
                className={`p-2 rounded-md border ${
                  selectedCover === item
                    ? "border-blue-500 p-2" 
                    :"" 
                }`}
              >
                <Image
                  src={item?.imageurl}
                  width={200}
                  height={150}
                  alt={`Cover option ${index + 1}`}
                  className="hover:cursor-pointer"
                />
              </div>
            ))}
          </div>
        </DialogHeader>
        <DialogFooter>
            <DialogClose asChild>
            <Button variant='outline'>Cancel</Button></DialogClose>
            <DialogClose asChild>
            <Button
            onClick={()=>setNewcover(selectedCover?.imageurl)}>Update</Button></DialogClose>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Coverpicker;
