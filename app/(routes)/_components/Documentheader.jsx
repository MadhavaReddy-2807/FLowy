"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { ArrowBigLeft, ArrowLeftIcon, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
const Documentheader = () => {
  const router=useRouter();
  const { toast } = useToast()
  const handleShare = async () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    try {
      await navigator.clipboard.writeText(currentUrl);
 toast({
        title: "Link Copied",
      })    } 
      catch(err){
      console.error("Failed to copy link:", err);
    }
  };
const goback=()=>{
  router.replace('/dashboard')
}
  return (
    <div className="flex justify-between items-center w-full px-1 py-2 border shadow-b-lg">
      <div></div>
      <OrganizationSwitcher />
      <div className="flex items-center gap-5">
        <Button onClick={handleShare} className='hidden md:flex overflow-hidden'>
          <Link2 className="mr-2" /> Share
        </Button>
        <div className="flex gap-2">
        <Button className='ml-2' onClick={()=>{goback()}}><ArrowLeftIcon/>Back</Button>
        <UserButton /></div>
      </div>
    </div>
  );
};

export default Documentheader;
