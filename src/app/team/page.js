"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/components/Loading';
import Nav from '@/components/Nav';

export default function Home() {
  const [projects, setProjects] = useState([]);

  // Simulate fetching data for multiple projects
  useEffect(() => {
   const fetchProjects = axios.get('/api/projects');
    fetchProjects.then((response) => {
      setProjects(response.data);
    });

  }, []);

  if (projects.length === 0) return null;

  // Team members array
  const teamMembers = [
    { name: 'Naren Roy', role: 'Fullstack Developer , Web Designer , Team Lead', imageUrl: 'https://images.unsplash.com/photo-1473830394358-91588751b241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Dipanjan Haldar', role: 'Game Developer , Web designer ', imageUrl: 'https://images.unsplash.com/photo-1534083264897-aeabfc7daf8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Ayush Ghosh', role: 'UX/UI Designer', imageUrl: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Supriyo Adhikari', role: 'UX/UI Designer , Tester', imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Sandip Mallik', role: 'Databade Administrator , Material Supplyer ,Tester  , Data input', imageUrl: 'https://images.unsplash.com/photo-1554126807-6b10f6f6692a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  return (
   <>
    <Nav/>
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <Loading/>
      {/* Header */}
      <header className="py-16 text-center">
      
        <h1 className="text-5xl font-semibold text-gray-900">Welcome To Our Minor Project</h1>
      </header>

      {/* Team Section */}
      <section className="w-full bg-gray-100 py-16">
        
        <h2 className="text-3xl font-semibold text-center text-gray-900">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mt-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              <img  src={member.imageUrl}/>
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Section */}
      {projects.map((project) => (
  <div key={project._id} className="project-card mt-8 relative rounded-lg shadow-lg overflow-hidden bg-white hover:scale-105 transition-transform duration-500 ease-in-out">
   <a href={project.link} target="_blank" rel="noopener noreferrer">
   <img
      src={project.imageUrl}
      alt={project.title}

      className="w-full h-48 object-cover  "
    />
    <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent text-white p-4 w-full text-center">
      <h3 className="text-xl">{project.title}</h3>
    </div>
   </a>
  </div>
))}


      {/* Footer */}
      <footer className="footer bg-gray-900 text-white text-center py-8 mt-12 w-full">
        <p>&copy; 2025 Our Team of 5 | All Rights Reserved</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://github.com/CyberSparkx" target="_blank" className="text-gray-400 hover:text-white">GitHub</a>
          <a href="https://www.linkedin.com/in/naren-roy-4390a6238/" target="_blank" className="text-gray-400 hover:text-white">LinkedIn</a>
          <a href="https://medial.app/user/naren-roy-8ec943add6a5c" target="_blank" className="text-gray-400 hover:text-white">Medial</a>
          <a href="https://x.com/NarenRo26790356" target="_blank" className="text-gray-400 hover:text-white">X.com</a>
        </div>
      </footer>
    </div></>
  );
}
