'use client'
import React, { useState } from 'react'

const PhotoSGP = () => {

  const [image, setimage] = useState([
    "campus2.jpg",
    "campus1.jpg",
    "cmpus 2 1.jpg",
    "campus 1 1.jpg",
    "cc lab.jpg",
    "cc lab 2.jpg",
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
