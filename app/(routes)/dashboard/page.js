"use client"
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { FaHome } from "react-icons/fa";

import React, { useEffect } from 'react'
import Header from '../_components/header'
import { useAuth, useUser } from '@clerk/clerk-react'
import Workspacelist from '../_components/workspacelist'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
const page = () => {
  const {  userId, orgId } = useAuth();
  const router=useRouter();
const {user}=useUser();
  // useEffect(()=>{
  //   if(orgId)
  //   {

  //     window.location.reload();
  //   }
  // },[orgId])
  useEffect(()=>{
    console.log("hi everyone")
    if(userId&&user)
    {
      saveuserdata();
    }
  },[userId,user])
 
  const goback=()=>{
     router.replace('/');
  }
  const saveuserdata=async ()=>{
    console.log("Hello")
    if(user)
    {
    const data={
      name:user?.fullName,
      avatar:user?.imageUrl,
      email:user?.primaryEmailAddress?.emailAddress
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}userdata`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });}}
  return (
    <>    <div className='flex justify-between p-2  shadow-sm'><Header/>
    <OrganizationSwitcher
    afterLeaveOrganizationUrl='/dashboard'
    afterCreateOrganizationUrl={'/dashboard'}/>
      <div className='flex flex-row justify-center gap-3 '>

    <UserButton className=''/>
    </div></div>
    <Workspacelist/>
    </>

  )
}

export default page