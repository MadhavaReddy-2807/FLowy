import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Link2 } from 'lucide-react'
import React from 'react'

const Documentheader = () => {
  return (
    <div className='flex justify-between items-center w-full px-4 py-2 border shadow-b-lg'>
      <div></div>
      <OrganizationSwitcher />
      <div className='flex items-center gap-5'>
        <Button><Link2/>Share</Button>
        <UserButton />
      </div>
    </div>
  )
}

export default Documentheader
