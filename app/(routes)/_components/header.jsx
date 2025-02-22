import React, { useEffect } from 'react'
import Logo from './logo'
import { useAuth } from '@clerk/clerk-react'

const Header = () => {
 
  return (
    <div className='hidden md:block'><Logo/></div>
  )
}

export default Header