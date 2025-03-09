'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaTrophy, FaGamepad, FaUniversity } from 'react-icons/fa'
import { MdEmail, MdLocationOn } from 'react-icons/md'

interface AchievementCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

const AchievementCard = ({ icon, title, description, delay }: AchievementCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
      className="card p-7 hover:scale-[1.02] transition-all"
    >
      <div className="mb-5 text-brown-400 text-3xl">{icon}</div>
      <h3 className="text-xl font-bold text-cream-100 mb-3">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const achievements = [
    {
      icon: <FaGamepad />,
      title: 'Successful Game Studio',
      description: 'Founded a Roblox game studio generating over $40,000 in peak monthly revenue with six figures total profit, tens of millions of play sessions, and 7,000 peak concurrent users.',
    },
    {
      icon: <FaTrophy />,
      title: 'Featured Developer',
      description: 'Recognized across all official Roblox social media channels each year for outstanding development implementations and innovative game mechanics.',
    },
    {
      icon: <FaUniversity />,
      title: 'Accelerated Academic Path',
      description: 'Enrolled in NC State\'s accelerated program enabling simultaneous Bachelor\'s and Master\'s degrees in Computer Science.',
    },
  ]

  return (
    <div className="container-section content-section">
      {/* Extended section gradient */}
      <div className="section-gradient"></div>
      
      <div className="mb-12 text-center">
        <motion.h2 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="heading-lg mb-5"
        >
          Incoming Software Engineer at <span className="text-gradient">Lenovo</span> <br />and Computer Science Graduate Student
        </motion.h2>
        
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 text-gray-300 mb-8"
        >
          <div className="flex items-center gap-2">
            <MdEmail className="text-brown-400" />
            <span>ryanmikula3@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-brown-400" />
            <span>Raleigh, NC</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg text-gray-300 leading-relaxed text-center"
        >
          <p className="mb-5">
            I'm an Incoming Software Engineer at Lenovo and currently pursuing a Master of Computer Science degree 
            at NC State University. With experience spanning enterprise Java applications, cloud platforms, and game development,
            I combine technical expertise with creative problem-solving to build efficient, scalable solutions.
          </p>
        </motion.div>
      </div>

      {/* Highlights */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-2xl font-bold text-cream-100 text-center mb-8"
      >
        Highlights
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            icon={achievement.icon}
            title={achievement.title}
            description={achievement.description}
            delay={index}
          />
        ))}
      </div>
    </div>
  )
} 