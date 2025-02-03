import React from 'react'
import Image from 'next/image'
const Logo = () => {
    return (
        <div>
            <div className='flex justify-items-center '>
                <img src="/logo.png" alt="" width={40} />
                <span className='font-bold  text-2xl text-[#303841] mt-2 ml-2' >Flowly</span>
                </div>
        </div>
    )
}

export default Logo