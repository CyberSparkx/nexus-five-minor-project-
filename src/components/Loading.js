"use client"

import React, { useEffect } from 'react'
import { gsap } from 'gsap';

const Loading = () => {

     useEffect(() => {
        // Animating elements on scroll
        gsap.to('.loading', {
         
          y: -1000,
          duration: 3,
          ease: 'power3.out',
          stagger: 0.4,
          zIndex: 10,
          height: 0,
          width : 0,
        }); 
      }, []);
      
  return (
    <div className='flex absolute  z-[15]  top-0 left-0'>
    <div className='bg-zinc-500 bg-opacity-30 backdrop-blur-lg w-[26vw] h-[100vh] loading'></div>
    <div className='bg-zinc-950 pt-[20vh] w-[26vw] h-[100vh] loading'>
        <img className='w-full' src="https://t4.ftcdn.net/jpg/04/35/23/71/360_F_435237161_xcuauJpP8Q04QPYBk8MirwzPulXYwRyj.jpg"/>
    </div>
    <div className='bg-white pt-[20vh] w-[26vw] h-[100vh] loading'>
        <img className='w-full' src="https://pbs.twimg.com/profile_images/1746942307277127680/K1bXZpxO_400x400.jpg"/>
    </div>
    <div className='bg-zinc-500 bg-opacity-30 backdrop-blur-lg w-[26vw] h-[100vh] loading'></div>
    </div>
  )
}

export default Loading