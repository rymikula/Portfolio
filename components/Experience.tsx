'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaBriefcase, FaCalendarAlt, FaBuilding, FaGraduationCap, FaBook, 
  FaUsers, FaDollarSign, FaGamepad, FaCode
} from 'react-icons/fa'
import { useState } from 'react'

interface ExperienceItemProps {
  title: string
  organization: string
  period: string
  description: string[]
  index: number
  icon?: React.ReactNode
  children?: React.ReactNode
}

const ExperienceItem = ({ title, organization, period, description, index, icon = <FaBriefcase className="w-3 h-3" />, children }: ExperienceItemProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="relative pl-12 pb-16 last:pb-0"
      style={{ zIndex: 10 }}
    >
      {/* Vertical line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-brown-600/50 via-brown-700/20 to-transparent group-last:to-transparent" />
      
      {/* Circle for icon */}
      <div className="absolute left-0 top-0 w-7 h-7 rounded-full flex items-center justify-center z-10 border-2 bg-brown-800 border-brown-600 text-brown-300 shadow-md">
        {icon}
      </div>
      
      {/* Content Card */}
      <div 
        className={`card relative bg-gray-900/60 backdrop-blur-sm p-7 rounded-lg transition-all duration-200 ${isHovered ? 'bg-[rgba(30,20,15,0.9)] border-[#725037] shadow-lg transform -translate-y-1' : 'border-gray-700'}`}
        style={{ 
          zIndex: isHovered ? 50 : 20,
          borderWidth: '1px',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Semi-transparent indicator */}
        <div className="absolute -left-7 top-4 w-7 h-px bg-gradient-to-r from-transparent to-brown-500/70" />
        
        {/* Title and period */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h3 className="font-bold text-xl text-cream-100 hover:text-brown-300 transition-colors">
            {title}
          </h3>
          <div className="flex items-center text-sm text-gray-400 bg-gray-800/70 px-3 py-1 rounded-full">
            <FaCalendarAlt className="mr-2 opacity-70" size={12} />
            {period}
          </div>
        </div>
        
        {/* Organization */}
        <div className="flex items-center mb-4 text-brown-300">
          <FaBuilding className="mr-2" size={14} />
          <p className="font-medium">{organization}</p>
        </div>
        
        {/* Description list */}
        <div className="space-y-2">
          {description.map((item, i) => (
            <div key={i} className="flex items-start hover:bg-gray-800/30 p-1 rounded-md transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-brown-500 mt-1.5 mr-2 flex-shrink-0 transition-colors" />
              <p className="text-gray-300 transition-colors">
                {item}
              </p>
            </div>
          ))}
        </div>
        
        {/* Custom content */}
        {children}
      </div>
    </motion.div>
  )
}

interface EducationItemProps {
  title: string
  organization: string
  period: string
  courses: string[]
  index: number
  icon?: React.ReactNode
}

const EducationItem = ({ title, organization, period, courses, index, icon = <FaGraduationCap className="w-3 h-3" /> }: EducationItemProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="relative pl-12 pb-16 last:pb-0"
      style={{ zIndex: 10 }}
    >
      {/* Vertical line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-brown-600/50 via-brown-700/20 to-transparent group-last:to-transparent" />
      
      {/* Circle for icon */}
      <div className="absolute left-0 top-0 w-7 h-7 rounded-full flex items-center justify-center z-10 border-2 bg-brown-800 border-brown-600 text-brown-300 shadow-md">
        {icon}
      </div>
      
      {/* Content Card */}
      <div 
        className={`card relative bg-gray-900/60 backdrop-blur-sm p-7 rounded-lg transition-all duration-200 ${isHovered ? 'bg-[rgba(30,20,15,0.9)] border-[#725037] shadow-lg transform -translate-y-1' : 'border-gray-700'}`}
        style={{ 
          zIndex: isHovered ? 50 : 20,
          borderWidth: '1px',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Semi-transparent indicator */}
        <div className="absolute -left-7 top-4 w-7 h-px bg-gradient-to-r from-transparent to-brown-500/70" />
        
        {/* Title and period */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h3 className="font-bold text-xl text-cream-100 hover:text-brown-300 transition-colors">
            {title}
          </h3>
          <div className="flex items-center text-sm text-gray-400 bg-gray-800/70 px-3 py-1 rounded-full">
            <FaCalendarAlt className="mr-2 opacity-70" size={12} />
            {period}
          </div>
        </div>
        
        {/* Organization */}
        <div className="flex items-center mb-6 text-brown-300">
          <FaBuilding className="mr-2" size={14} />
          <p className="font-medium">{organization}</p>
        </div>
        
        {/* Courses */}
        <div className="mb-4 flex items-center">
          <FaBook className="text-brown-400 mr-2" size={14} />
          <h4 className="text-brown-300 font-medium">Coursework</h4>
        </div>
        <div className="flex flex-wrap gap-3">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + (i * 0.05) }}
              className="bg-gray-800/70 hover:bg-brown-800/40 px-4 py-2 rounded-lg text-cream-100 text-sm transition-colors"
            >
              {course}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

interface StatItemProps {
  icon: React.ReactNode
  value: string
  label: string
  delay: number
}

const StatItem = ({ icon, value, label, delay }: StatItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center hover:bg-gray-800/80 transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-brown-400 text-2xl mb-2">
        {icon}
      </div>
      <div className="text-cream-100 text-2xl font-bold mb-1">
        {value}
      </div>
      <div className="text-gray-400 text-sm">
        {label}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const [experienceRef, experienceInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const workExperiences: Omit<ExperienceItemProps, 'index'>[] = [
    {
      title: 'Incoming Associate Software Engineer',
      organization: 'Lenovo',
      period: 'Starting May 2025',
      description: [
        'Will be joining Lenovo to work on Cloud IoT platforms'
      ],
    },
    {
      title: 'Software Engineer Intern',
      organization: 'LexisNexis',
      period: 'June 2024 - Aug 2024',
      description: [
        'Developed enterprise Java applications for managing legal content',
        'Overhauled legacy build infrastructure by migrating Ant/Ivy systems to Gradle; developed custom plugins and scripts to automate programming workflow',
        'Collaborated with Agile teams using Azure DevOps to drive continuous integration and delivery of software applications',
      ],
    },
    {
      title: 'Owner and Hobbyist Developer',
      organization: 'Video Game Studio, Roblox Platform',
      period: 'March 2012 - Current',
      description: [
        'Founded a studio with over $40,000 peak monthly revenue, six figures total profit, tens of millions of play sessions, and 7,000 peak concurrent users',
        'Featured across all official Roblox social media channels each year for outstanding development implementations',
        'Developed several large-scale, object-oriented codebases comprising hundreds of modular components and services',
        'Led full-stack development to launch dozens of games, many of which appeared on the platform\'s front page',
        'Contracted with other game studios, developers, and content creators to expand development and user acquisition',
      ],
      children: (
        <div className="mt-6" onClick={(e) => e.stopPropagation()}>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem 
              icon={<FaDollarSign />} 
              value="$40K+" 
              label="Peak Monthly Revenue" 
              delay={0.1} 
            />
            <StatItem 
              icon={<FaUsers />} 
              value="7,000+" 
              label="Peak Concurrent Users" 
              delay={0.2} 
            />
            <StatItem 
              icon={<FaGamepad />} 
              value="10M+" 
              label="Total Play Sessions" 
              delay={0.3} 
            />
            <StatItem 
              icon={<FaCode />} 
              value="20+" 
              label="Games Developed" 
              delay={0.4} 
            />
          </div>
        </div>
      ),
    },
  ]

  const [educationRef, educationInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const educations: Omit<EducationItemProps, 'index'>[] = [
    {
      title: 'Master of Computer Science',
      organization: 'North Carolina State University',
      period: 'Graduating May 2026',
      courses: [
        'Software Engineering',
        'Foundations of Data Science',
        'Computer Graphics',
        'Advanced Computer Graphics',
        'Game Engine Foundations'
      ],
      icon: <FaGraduationCap className="w-3 h-3" />,
    },
    {
      title: 'Bachelor of Science in Computer Science',
      organization: 'North Carolina State University',
      period: 'Graduating May 2025',
      courses: [
        'Software Engineering',
        'Software Dev. Fundamentals',
        'Data Structures & Algorithms',
        'C & Software Tools',
        'Operating Systems',
        'Discrete Math',
        'Linear Algebra',
        'Statistics',
        'Calculus 3',
        'Physics 2',
        'Human Computer Interaction',
        'Human-Centered Security'
      ],
      icon: <FaGraduationCap className="w-3 h-3" />,
    },
  ]

  return (
    <div className="container-section content-section" style={{ zIndex: 7000, position: 'relative' }}>
      {/* Add section gradient */}
      <div className="section-gradient"></div>
      
      {/* Education Section */}
      <div id="education" className="mb-16">
        <motion.div
          ref={educationRef}
          initial={{ opacity: 0, y: 30 }}
          animate={educationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 relative z-10"
        >
          <h2 className="heading-lg mb-4">
            <span className="text-gradient">Education</span>
          </h2>
          <p className="mt-3 text-lg text-gray-300 max-w-3xl mx-auto">
            My educational foundation in computer science at North Carolina State University.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative" style={{ zIndex: 10 }}>
          {/* Visual connector for timeline beginning */}
          <div className="absolute left-3 top-0 w-px h-12 bg-gradient-to-b from-transparent to-brown-600/50"></div>
          
          {/* Education Timeline */}
          {educations.map((education, index) => (
            <EducationItem
              key={index}
              title={education.title}
              organization={education.organization}
              period={education.period}
              courses={education.courses}
              index={index}
              icon={education.icon}
            />
          ))}
        </div>
      </div>
      
      {/* Work Experience Section */}
      <div id="work-experience">
        <motion.div
          ref={experienceRef}
          initial={{ opacity: 0, y: 30 }}
          animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 relative z-10"
        >
          <h2 className="heading-lg mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="mt-3 text-lg text-gray-300 max-w-3xl mx-auto">
            My professional journey in software engineering and development.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative" style={{ zIndex: 10 }}>
          {/* Visual connector for timeline beginning */}
          <div className="absolute left-3 top-0 w-px h-12 bg-gradient-to-b from-transparent to-brown-600/50"></div>
          
          {/* Work Experience Timeline */}
          {workExperiences.map((experience, index) => (
            <ExperienceItem
              key={index}
              title={experience.title}
              organization={experience.organization}
              period={experience.period}
              description={experience.description}
              index={index}
              icon={experience.icon}
            >
              {experience.children}
            </ExperienceItem>
          ))}
        </div>
      </div>
    </div>
  )
} 