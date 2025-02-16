"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'


const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
      setIsOpen(false)
  }, [])
  

  // Toggle the side panel visibility
  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div >
  <div>
      <nav className='flex  justify-between bg-white items-center px-8 shadow-md h-[8vh] w-full'>
        <Link href='/'  id="right" className='cursor-pointer'>
          <Image
            src="/logo.jpg"
            width={40}
            height={40}
            alt="Picture of the author"
          />
        </Link>
        <div id="left" className='cursor-pointer' onClick={toggleSidePanel}>
          <Image
            src="/hamburger.webp"
            width={40}
            height={40}
            alt="Hamburger icon"
          />
        </div>
      </nav>
      
      {/* Side panel with dynamic visibility */}
      <div 
        className={`w-[60vw] ${isOpen ? 'absolute z-20 ml-[40vw]' : 'hidden'} h-screen bg-zinc-700 z-15 transition-all duration-300`}
      >
        <ul className='text-xl text-white font-semibold flex flex-col gap-5 items-center mx-auto py-10 cursor-pointer'>
          <Link href='/cst'><li>CST Page</li></Link>
          <Link href='/notes'><li>Notes Manager</li></Link>
          <Link href='/password'><li>Password Manager</li></Link>
          <Link href='/chatbot'><li>Go to Chatbot</li></Link>
          <Link href='/team'><li>Our Team</li></Link>
        </ul>
      </div>
    </div>
      </div>
    
  )
}

export default Nav