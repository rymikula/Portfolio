'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCode, FaGamepad, FaServer, FaCoffee, FaUserTie } from 'react-icons/fa'

interface ProjectProps {
  title: string
  description: string
  bullets: string[]
  technologies: string[]
  index: number
  icon?: React.ReactNode
}

const Project = ({ title, description, bullets, technologies, index, icon = <FaCode /> }: ProjectProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="relative h-20 overflow-hidden bg-gradient-to-r from-brown-700/40 to-gray-800/90">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-80" />
        
        {/* Project title */}
        <div className="absolute bottom-0 left-0 w-full p-5 flex items-center">
          <div className="text-brown-400 mr-3">
            {icon}
          </div>
          <h3 className="font-bold text-xl text-cream-100 group-hover:text-brown-300 transition-colors">
            {title}
          </h3>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <p className="text-gray-300 mb-5">{description}</p>
        
        {/* Bullet points */}
        <div className="mb-6">
          <h4 className="text-brown-300 font-medium mb-3">Key Features:</h4>
          <ul className="space-y-2">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-brown-500 mt-1.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span 
              key={tech}
              className="text-xs px-2 py-1 bg-gray-800/70 text-cream-100 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects: Omit<ProjectProps, 'index'>[] = [
    {
      title: 'Game and Render Engine',
      description: 'A custom engine for creating games and rendering 2D/3D geometry with real-time rendering and rasterization.',
      bullets: [
        'Integrated Blinn-Phong shading and per-fragment lighting for realistic illumination, supporting ambient, diffuse, and specular light sources',
        'Developed vertex and fragment shaders for lighting, shadows, and special effects like reflection and refraction',
        'Integrated JavaScript using the V8 Engine, allowing for full-scale game development entirely through scripting',
        'Implemented multithreaded network architecture with ZeroMQ, utilizing a publisher/subscriber pattern for multiplayer',
        'Developed a distributed networked event management system for event logging and game replays'
      ],
      technologies: ['C++', 'JavaScript', 'WebGL', 'V8 Engine', 'ZeroMQ'],
      icon: <FaGamepad />,
    },
    {
      title: 'Gamified AI Web Interface',
      description: 'An interactive AI-based learning tool for students with emotional and behavior disorders to understand how their decisions lead to specific outcomes.',
      bullets: [
        'Deployed via a nonprofit across classrooms in North Carolina as part of the OpenDI research project',
        'Integrated OpenAI\'s GPT into the Ren\'Py visual novel engine, generating personalized adaptive stories',
        'Exports student decision-making data into a graph-like JSON structure for analysis',
        'Integrated with Cytoscape to visualize decision-intelligence graphs and analyze student behavior'
      ],
      technologies: ['Python', 'Ren\'Py', 'OpenAI API', 'JSON', 'Cytoscape'],
      icon: <FaUserTie />,
    },
    {
      title: 'Cafe Application',
      description: 'A full-stack application using layered architecture for managing a cafe business.',
      bullets: [
        'Created a system enabling users to login, manage recipes, stock inventory, and purchase coffee through a web portal',
        'Engineered the backend using Spring Boot, Spring Framework, Jakarta APIs, with Maven for dependency resolution',
        'Managed the database through MySQL and Hibernate ORM',
        'Developed frontend using React, JavaScript, HTML, CSS',
        'Utilized test-driven development with JUnit, code coverage, and continuous integration using Jenkins'
      ],
      technologies: ['Java', 'Spring Boot', 'React', 'MySQL', 'Hibernate', 'JUnit'],
      icon: <FaCoffee />,
    },
    {
      title: 'Employee Profile Manager',
      description: 'A command-line system in C on Linux to manage employee and agency profiles.',
      bullets: [
        'Integrated low-level OS concepts: processes and threads, multithreading, synchronization, virtual memory',
        'Designed and implemented a multithreaded server architecture with TCP/IP socket programming',
        'Structured the project using makefiles, separate compilation, and modular programming principles',
        'Utilized debugging and optimization tools like GDB, Valgrind, and GCC for development'
      ],
      technologies: ['C', 'Linux', 'TCP/IP', 'Multithreading', 'GDB', 'Valgrind'],
      icon: <FaServer />,
    },
  ]

  return (
    <div className="container-section content-section">
      {/* Add section gradient */}
      <div className="section-gradient"></div>
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="heading-lg mb-4">
          Technical <span className="text-gradient">Projects</span>
        </h2>
        <p className="mt-3 text-lg text-gray-300 max-w-3xl mx-auto">
          A selection of projects that demonstrate my technical skills and problem-solving abilities.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {projects.map((project, index) => (
          <Project key={index} {...project} index={index} />
        ))}
      </div>
    </div>
  )
} 