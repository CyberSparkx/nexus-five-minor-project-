'use client'
import React, { useState } from 'react'

const PhotoSGP = () => {

  const [image, setimage] = useState([
    "https://images.unsplash.com/photo-1613488329064-aafbeb1e4db1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1738694237335-a537515c0b7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1738614647383-0435fcb26a55?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]);

  return (
    <div className='flex flex-col justify-center mb-10 items-center'>
        
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold w-[80vw] sm:w-[60vw] md:w-[35vw] mx-auto my-10 text-center'>
            Photos
        </h1>

        <div className='flex flex-wrap gap-5 px-6 sm:px-10 md:px-[10vw] justify-center'>
            {
                image.map((img, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 overflow-hidden">
                      <div className="relative aspect-w-16 aspect-h-9">
                        <img 
                          className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110" 
                          src={img} 
                          alt={`SGP Photo ${index+1}`} 
                        />
                      </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default PhotoSGP
