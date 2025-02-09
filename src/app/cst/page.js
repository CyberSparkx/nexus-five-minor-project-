'use client'
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const DepartmentPage = () => {

  useEffect(() => {
    // Animating elements on scroll
    gsap.from('.intro', {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.intro',
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: true
      }
    });

    gsap.from('.feature-item', {
      opacity: 0,
      x: -100,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.features',
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: true
      }
    });

    gsap.from('.footer', {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
        end: 'bottom 60%',
        scrub: true
      }
    });

    // Animating photos grid
    gsap.from('.photo-item', {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.photos',
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: true
      }
    });

    // Adding Zoom effect on Faculty Photos on hover
    gsap.utils.toArray('.teacher img').forEach((img) => {
      gsap.fromTo(img, {
        scale: 1,
      }, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power1.inOut',
        paused: true,
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Adding hover effect for photos in the Photos section
    gsap.utils.toArray('.photo-item img').forEach((img) => {
      img.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 1.1, duration: 0.3 });
      });
      img.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, duration: 0.3 });
      });
    });

  }, []);

  return (
    <div className="bg-gray-900 text-white">
      
      {/* Header */}
      <header className=" top-0 left-0 w-full bg-gray-800 p-5 shadow-md z-50">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          {/* Department Logo */}
          <img
            src="https://t4.ftcdn.net/jpg/04/35/23/71/360_F_435237161_xcuauJpP8Q04QPYBk8MirwzPulXYwRyj.jpg" // Replace with your logo's URL
            alt="Department Logo"
            className="h-12" // Adjust size as needed
          />
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#about" className="hover:text-blue-500">About</a></li>
              <li><a href="#labs" className="hover:text-blue-500">Labs</a></li>
              <li><a href="#teachers" className="hover:text-blue-500">Teachers</a></li>
              <li><a href="#photos" className="hover:text-blue-500">Photos</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="intro lg:h-[80vh] flex flex-col justify-center items-center text-center py-20" id="about">
        <h2 className="text-4xl font-semibold mb-6">Welcome to the Department of Computer Science & Engineering</h2>
        <p className="text-lg max-w-4xl mx-auto">We provide world-class education in computer science, with a focus on innovation, research, and hands-on learning. Our department is dedicated to empowering students to excel in the ever-evolving tech world.</p>
      </section>

      {/* Department Features Section */}
      <section className="features py-20 bg-gray-800" id="labs">
        <h2 className="text-4xl font-semibold text-center mb-12">Our Department Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
          <div className="feature-item bg-gray-700 p-8 rounded-lg shadow-lg text-center">
            <img src="https://images.unsplash.com/photo-1738447429433-69e3ecd0bdd0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Lab 1" className="w-full h-48 object-cover rounded-lg mb-6"/>
            <h3 className="text-2xl font-semibold">Advanced Computing Lab</h3>
            <p className="text-sm mt-2">A state-of-the-art lab for advanced research in computing technologies.</p>
          </div>
          <div className="feature-item bg-gray-700 p-8 rounded-lg shadow-lg text-center">
            <img src="https://plus.unsplash.com/premium_photo-1663050681752-4c95effcca58?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Lab 2" className="w-full h-48 object-cover rounded-lg mb-6"/>
            <h3 className="text-2xl font-semibold">Machine Learning Lab</h3>
            <p className="text-sm mt-2">Equipped with powerful machines for AI and machine learning projects.</p>
          </div>
          <div className="feature-item bg-gray-700 p-8 rounded-lg shadow-lg text-center">
            <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Lab 3" className="w-full h-48 object-cover rounded-lg mb-6"/>
            <h3 className="text-2xl font-semibold">Robotics Lab</h3>
            <p className="text-sm mt-2">Focusing on automation and robotics innovations for the future.</p>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="teachers py-20" id="teachers">
        <h2 className="text-4xl font-semibold text-center mb-12">Meet Our Faculty</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
          <div className="teacher bg-gray-700 p-8 rounded-lg shadow-lg text-center">
            <img src="https://images.unsplash.com/photo-1659301254614-8d6a9d46f26a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Professor 1" className="w-40 h-40 rounded-full mx-auto mb-6"/>
            <h3 className="text-2xl font-semibold">Dr. John Doe</h3>
            <p className="text-sm mt-2">Specializes in Artificial Intelligence and Machine Learning.</p>
          </div>
          <div className="teacher bg-gray-700 p-8 rounded-lg shadow-lg text-center">
            <img src="https://images.unsplash.com/photo-1605711285791-0219e80e43a3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Professor 2" className="w-40 h-40 rounded-full mx-auto mb-6"/>
            <h3 className="text-2xl font-semibold">Dr. Jane Smith</h3>
            <p className="text-sm mt-2">Expert in Software Engineering and Computer Networks.</p>
          </div>
          <div className="teacher bg-gray-700 p-8 rounded-lg shadow-lg text-center">
            <img src="https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Professor 3" className="w-40 h-40 rounded-full mx-auto mb-6"/>
            <h3 className="text-2xl font-semibold">Dr. Emily Taylor</h3>
            <p className="text-sm mt-2">Researcher in Cybersecurity and Data Privacy.</p>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section className="photos  py-20" id="photos">
        <h2 className="text-4xl font-semibold text-center mb-12">Department Photos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
          <div className="photo-item bg-gray-700 p-4 rounded-lg overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Photo 1" className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"/>
          </div>
          <div className="photo-item bg-gray-700 p-4 rounded-lg overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1567168544999-b8ca00a3d9c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Photo 2" className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"/>
          </div>
          <div className="photo-item bg-gray-700 p-4 rounded-lg overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Photo 3" className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"/>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 h-full text-center py-8">
        <div className="container mx-auto px-6">
          {/* Footer Text */}
          <p className="text-sm text-gray-400 mb-4">© 2025 Computer Science & Engineering Department | All Rights Reserved</p>

          {/* Social Links */}
          <div className="social-links mt-4 flex justify-center space-x-6 flex-wrap">
            <a href="#" className="text-blue-500 hover:text-blue-700 transition-all">Facebook</a>
            <a href="#" className="text-blue-500 hover:text-blue-700 transition-all">Twitter</a>
            <a href="#" className="text-blue-500 hover:text-blue-700 transition-all">LinkedIn</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default DepartmentPage;
