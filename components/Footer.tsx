'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaTwitter, FaHeart } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    {
      icon: <FaLinkedin size={20} />,
      label: 'LinkedIn',
      link: 'https://linkedin.com',
    },
    {
      icon: <FaGithub size={20} />,
      label: 'GitHub',
      link: 'https://github.com',
    },
    {
      icon: <FaTwitter size={20} />,
      label: 'Twitter',
      link: 'https://twitter.com',
    },
  ]

  const footerLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Skills', path: '#skills' },
    { name: 'Projects', path: '#projects' },
    { name: 'Experience', path: '#experience' },
    { name: 'Contact', path: '#contact' },
  ]

  return (
    <footer className="bg-dark-600 text-white">
      <div className="container-section py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link href="#home" className="font-sans text-2xl font-bold text-white">
              Portfolio
            </Link>
            <p className="text-neutral-400 mt-2">
              A professional software developer creating beautiful, 
              functional, and user-friendly applications.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-dark-500 rounded-md hover:bg-secondary hover:text-white transition-all"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-secondary">Stay Updated</h3>
            <p className="text-neutral-400 mb-4">
              Subscribe to my newsletter for the latest projects and articles.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-grow px-4 py-2 rounded-l-md bg-dark-400 text-white border border-dark-300 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary-light text-white px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-dark-500 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © {currentYear} Your Name. All rights reserved.
          </p>
          <p className="text-neutral-400 text-sm mt-2 md:mt-0">
            Made with <FaHeart className="inline-block mx-1 text-secondary" /> using Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
} 