"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

export default function Home() {
  const [project, setProject] = useState(null);

  // Simulate fetching data for a single project
  useEffect(() => {
    const fetchedProject = {
      id: 1,
      title: 'Project 1',
      description: 'This is a detailed description for Project 1.',
      imageUrl: '/images/project1.jpg',
    };
    setProject(fetchedProject);

    // GSAP animation for project details, team section, and footer
    gsap.from('.project-card', {
      opacity: 0,
      y: 100,
      duration: 1.5,
      stagger: 0.2,
    });
    gsap.from('.footer', {
      opacity: 0,
      y: 50,
      duration: 1.5,
      delay: 0.5,
    });
    gsap.from('.team-card', {
      opacity: 0,
      y: 100,
      duration: 1.5,
      stagger: 0.2,
      delay: 1,
    });
    gsap.from('.project-details', {
      opacity: 0,
      y: 100,
      duration: 1.5,
      delay: 1.5,
    });

    // Adding zoom effect on hover for project images
    gsap.to('.project-card img', {
      scale: 1.1,
      ease: "power1.inOut",
      duration: 0.3,
      paused: true,
      repeat: -1,
      yoyo: true,
      hover: { scale: 1.05, duration: 0.3 }, // zoom effect on hover
    });

  }, []);

  if (!project) return null;

  // Team members array
  const teamMembers = [
    { name: 'John Doe', role: 'Frontend Developer', imageUrl: '/images/team1.jpg' },
    { name: 'Jane Smith', role: 'Backend Developer', imageUrl: '/images/team2.jpg' },
    { name: 'Alice Johnson', role: 'UX/UI Designer', imageUrl: '/images/team3.jpg' },
    { name: 'Bob Brown', role: 'Project Manager', imageUrl: '/images/team4.jpg' },
    { name: 'Charlie Davis', role: 'Full Stack Developer', imageUrl: '/images/team5.jpg' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="py-16 text-center">
        <h1 className="text-5xl font-semibold text-gray-900">Our Awesome Projects</h1>
      </header>

      {/* Team Section */}
      <section className="w-full bg-gray-100 py-16">
        <h2 className="text-3xl font-semibold text-center text-gray-900">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mt-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Section */}
      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="project-card relative rounded-lg shadow-lg overflow-hidden bg-white hover:scale-105 transition-transform duration-500 ease-in-out">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent text-white p-4 w-full text-center">
            <h3 className="text-xl">{project.title}</h3>
          </div>
        </div>
      </motion.section>

      {/* Project Details */}
      <div className="max-w-3xl mx-auto p-4 project-details">
        <h2 className="text-4xl font-semibold text-center">{project.title}</h2>
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-64 object-cover mt-4 rounded-lg"
        />
        <p className="mt-4">{project.description}</p>
      </div>

      {/* Footer */}
      <footer className="footer bg-gray-900 text-white text-center py-8 mt-12 w-full">
        <p>&copy; 2025 Our Team of 5 | All Rights Reserved</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://github.com" target="_blank" className="text-gray-400 hover:text-white">GitHub</a>
          <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-white">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-white">Twitter</a>
        </div>
      </footer>
    </div>
  );
}
