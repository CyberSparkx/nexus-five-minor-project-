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
        className="mySwiper lg:w-[95vw] lg:mx-auto lg:my-8  lg:h-[60vh]  md:w-[95vw] md:mx-auto md:my-8  md:h-[60vh] object-fit"
      >
        <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1738975927070-d5af82de67c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1645343182679-bf59289a9c89?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1613488329064-aafbeb1e4db1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  />
        </SwiperSlide>
    
      </Swiper>
    </div>
  );
}