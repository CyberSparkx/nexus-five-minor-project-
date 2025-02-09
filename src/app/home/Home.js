import AboutSGP from '@/components/AboutSGP'
import Departments from '@/components/Departments'
import Footer from '@/components/Footer'
import PhotoSGP from '@/components/PhotoSGP'
import Principal from '@/components/Principal'
import Slider from '@/components/Slider'
import React from 'react'

const Home = () => {
  return (
    <div>
        <Slider/>
        <AboutSGP/>
        <Principal/>
        <Departments/>
        <PhotoSGP/>
        <Footer/>
    </div>
  )
}

export default Home