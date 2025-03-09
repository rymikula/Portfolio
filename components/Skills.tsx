'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaJava, FaPython, FaReact, FaNodeJs, FaHtml5, FaGitAlt, FaDatabase,
  FaServer, FaCode, FaTools, FaLaptop, FaCogs, FaCloud, FaGamepad,
  FaDesktop, FaNetworkWired, FaFileCode, FaTerminal, FaLock
} from 'react-icons/fa'
import { 
  SiCplusplus, SiC, SiJavascript, SiSpring, SiMysql, SiLinux, SiUnrealengine,
  SiLua, SiWebgl, SiOpengl, SiJunit5, SiApachetomcat, SiApacheant, SiPostman,
  SiJson, SiXml, SiPerforce, SiBlender, SiAdobecreativecloud, SiRobloxstudio,
  SiHibernate, SiOracle, SiGradle
} from 'react-icons/si'

interface SkillGroupProps {
  title: string
  skills: {
    name: string;
    icon: React.ReactNode;
  }[];
  variant: 'primary' | 'secondary';
  delay: number;
}

const SkillGroup = ({ title, skills, variant, delay }: SkillGroupProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay * 0.3 }}
      className="card p-8 backdrop-blur-sm"
    >
      <h3 className="heading-md text-cream-100 mb-8 flex items-center">
        <span className="inline-block w-6 h-0.5 bg-brown-500 mr-3"></span>
        {title}
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: delay * 0.3 + (i * 0.1) }}
            className={`skill-tag ${variant === 'primary' ? 'skill-tag-primary' : 'skill-tag-secondary'} flex flex-col items-center gap-2 group hover:scale-105`}
          >
            <div className="text-2xl group-hover:scale-110 transition-transform">
              {skill.icon}
            </div>
            <span className="font-medium text-center">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

interface SkillCategoryProps {
  title: string;
  skills: string[];
  icon: React.ReactNode;
  delay: number;
}

const SkillCategory = ({ title, skills, icon, delay }: SkillCategoryProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay * 0.2 }}
      className="card p-6 backdrop-blur-sm"
    >
      <div className="flex items-center mb-4">
        <div className="text-2xl mr-3 text-brown-400">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-cream-100">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span 
            key={index}
            className="text-sm px-3 py-1 bg-gray-800/70 text-cream-100 rounded-md hover:bg-brown-800/50 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Programming Languages
  const programmingLanguages = [
    { name: 'C++', icon: <SiCplusplus /> },
    { name: 'Java', icon: <FaJava /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'C', icon: <SiC /> },
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'HTML/CSS', icon: <FaHtml5 /> },
    { name: 'Lua', icon: <SiLua /> },
  ]
  
  // Frameworks & Libraries
  const frameworksLibraries = [
    { name: 'Spring Framework', icon: <SiSpring /> },
    { name: 'Spring Boot', icon: <SiSpring /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'REST API', icon: <FaServer /> },
    { name: 'Hibernate/JPA', icon: <SiHibernate /> },
    { name: 'Jakarta', icon: <FaFileCode /> },
    { name: 'Swing', icon: <FaDesktop /> },
    { name: 'ZeroMQ', icon: <FaNetworkWired /> },
  ]
  
  // Graphics & Game Development
  const graphicsGameDev = [
    { name: 'OpenGL', icon: <SiOpengl /> },
    { name: 'WebGL', icon: <SiWebgl /> },
    { name: 'Unreal Engine', icon: <SiUnrealengine /> },
    { name: 'Blender', icon: <SiBlender /> },
    { name: 'Roblox Studio', icon: <SiRobloxstudio /> },
    { name: 'V8 Engine', icon: <FaCode /> },
    { name: 'Adobe Suite', icon: <SiAdobecreativecloud /> },
  ]
  
  // Tools & Technologies
  const devTools = [
    { name: 'Git/GitHub', icon: <FaGitAlt /> },
    { name: 'Jenkins', icon: <FaCogs /> },
    { name: 'Azure DevOps', icon: <FaCloud /> },
    { name: 'JUnit', icon: <SiJunit5 /> },
    { name: 'Maven', icon: <FaTools /> },
    { name: 'Gradle', icon: <SiGradle /> },
    { name: 'Ant/Ivy', icon: <SiApacheant /> },
    { name: 'Postman', icon: <SiPostman /> },
    { name: 'Perforce', icon: <SiPerforce /> },
  ]

  // Database & Infrastructure
  const databaseInfra = [
    { name: 'SQL', icon: <FaDatabase /> },
    { name: 'MySQL', icon: <SiMysql /> },
    { name: 'Oracle DB', icon: <SiOracle /> },
    { name: 'Linux/Unix', icon: <SiLinux /> },
    { name: 'Tomcat', icon: <SiApachetomcat /> },
    { name: 'JSON', icon: <SiJson /> },
    { name: 'XML', icon: <SiXml /> },
    { name: 'GDB/Valgrind', icon: <FaTerminal /> },
  ]

  // Skill categories for the detailed section
  const systemsSkills = [
    'Multithreading', 'Synchronization', 'Virtual Memory', 'Scheduling', 
    'I/O Management', 'File Systems', 'Protection & Security', 'Networking',
    'TCP/IP', 'Socket Programming', 'Encryption', 'Computer Organization',
    'Process Management', 'Memory Management', 'Distributed Systems'
  ]

  const softwareEngineeringSkills = [
    'Object-Oriented Design', 'Design Patterns', 'Clean Architecture', 
    'Test-Driven Development', 'Agile Methodologies', 'CI/CD', 
    'Code Coverage', 'Static Analysis', 'Version Control', 
    'Documentation', 'API Design', 'Microservices', 'Layered Architecture',
    'Dependency Injection', 'Modular Programming', 'Event-Driven Architecture'
  ]

  const academicSkills = [
    'Data Structures', 'Algorithms', 'Discrete Math', 'Linear Algebra',
    'Statistics', 'Computer Graphics', 'Human-Computer Interaction',
    'Human-Centered Security', 'Data Science', 'Game Engine Development',
    'Calculus', 'Physics', 'Computational Theory', 'Artificial Intelligence',
    'Machine Learning', 'Numerical Methods', 'Formal Languages'
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
          Professional <span className="text-gradient">Skills</span>
        </h2>
        <p className="mt-3 text-lg text-gray-300 max-w-3xl mx-auto">
          A comprehensive set of technical skills parsed from my resume.
        </p>
      </motion.div>

      {/* Main technical skills with icons */}
      <div className="grid grid-cols-1 gap-6 relative z-10 mb-10">
        <SkillGroup
          title="Programming Languages"
          skills={programmingLanguages}
          variant="primary"
          delay={0}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkillGroup
            title="Frameworks & Libraries"
            skills={frameworksLibraries}
            variant="secondary"
            delay={1}
          />
          
          <SkillGroup
            title="Graphics & Game Development"
            skills={graphicsGameDev}
            variant="secondary"
            delay={1.5}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkillGroup
            title="Development Tools"
            skills={devTools}
            variant="primary"
            delay={2}
          />
          
          <SkillGroup
            title="Database & Infrastructure"
            skills={databaseInfra}
            variant="primary"
            delay={2.5}
          />
        </div>
      </div>
      
      {/* Detailed skill categories */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-2xl font-bold text-cream-100 text-center mb-6"
      >
        Specialized Knowledge Areas
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <SkillCategory
          title="Systems & OS Concepts"
          skills={systemsSkills}
          icon={<FaTerminal />}
          delay={0}
        />
        
        <SkillCategory
          title="Software Engineering"
          skills={softwareEngineeringSkills}
          icon={<FaCode />}
          delay={0.5}
        />
        
        <SkillCategory
          title="Academic Foundations"
          skills={academicSkills}
          icon={<FaLaptop />}
          delay={1}
        />
        
        <SkillCategory
          title="Game Development & Graphics"
          skills={[
            'Shader Programming', 'Vertex Shaders', 'Fragment Shaders',
            'Lighting Models', 'Blinn-Phong Shading', 'Texture Mapping',
            'UV Mapping', 'Alpha Transparency', 'Reflection', 'Refraction',
            'Networked Multiplayer', 'Game Loop Architecture', 'Event Management',
            'Publisher/Subscriber Pattern', 'Game Replays', 'Rasterization'
          ]}
          icon={<FaGamepad />}
          delay={1.5}
        />
      </div>
    </div>
  )
} 