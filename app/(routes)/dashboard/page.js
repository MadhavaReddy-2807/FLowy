"use client"
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import Header from '../_components/header'
import { useAuth } from '@clerk/clerk-react'
import Workspacelist from '../_components/workspacelist'

const page = () => {
  const org=useAuth();
  useEffect(()=>{
   console.log(org.orgId);
  },[])
  return (
    <>    <div className='flex justify-between p-2  shadow-sm'><Header/>
    <OrganizationSwitcher
    afterLeaveOrganizationUrl='/dashboard'
    afterCreateOrganizationUrl={'/dashboard'}/>
    <UserButton className=''/>
    </div>
    <Workspacelist/>
    </>

  )
}

export default page