"use client"

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Slider() {
  return (
    <div >
      <Swiper
      
        spaceBetween={30}
        centeredSlides={true} 
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper lg:w-[95vw] lg:mx-auto lg:my-8  lg:h-[70vh]  md:w-[95vw] md:mx-auto md:my-8  md:h-[70vh] rounded-xl object-fit"
      >
        <SwiperSlide>
            <img src="campus2.jpg"  />
        </SwiperSlide>
        <SwiperSlide>
            <img src="campus1.jpg"  />
        </SwiperSlide>
        <SwiperSlide>
            <img src="cc lab 2.jpg"  />
        </SwiperSlide>
    
        <SwiperSlide>
            <img src="campus 1 1.jpg"  />
        </SwiperSlide>
    
        <SwiperSlide>
            <img src="cmpus 2 1.jpg"  />
        </SwiperSlide>
    
      </Swiper>
    </div>
  );
}