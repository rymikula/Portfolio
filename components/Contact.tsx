'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError('')

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'hello@example.com',
      link: 'mailto:hello@example.com',
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'San Francisco, CA',
      link: null,
    },
  ]

  const socialLinks = [
    {
      icon: <FaLinkedin size={22} />,
      label: 'LinkedIn',
      link: 'https://linkedin.com',
    },
    {
      icon: <FaGithub size={22} />,
      label: 'GitHub',
      link: 'https://github.com',
    },
    {
      icon: <FaTwitter size={22} />,
      label: 'Twitter',
      link: 'https://twitter.com',
    },
  ]

  return (
    <div className="container-section" id="contact">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h2 className="heading-lg">Get In Touch</h2>
        <p className="mt-4 text-lg text-neutral-300 max-w-3xl mx-auto">
          Interested in working together or have a question? Feel free to reach out using 
          the form below or through my social media channels.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-1 space-y-8"
        >
          <div className="space-y-6">
            <h3 className="heading-md">Contact Information</h3>
            
            {/* Contact details */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="text-secondary text-xl mt-1">{item.icon}</div>
                  <div>
                    <p className="font-medium text-neutral-200">{item.label}</p>
                    {item.link ? (
                      <a href={item.link} className="text-secondary hover:text-secondary-light transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-neutral-300">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">Connect With Me</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-dark-400 rounded-md border border-dark-300 text-secondary hover:text-secondary-light hover:border-secondary transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-2"
        >
          <div className="bg-dark-400 rounded-lg border border-dark-300 p-6 md:p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-secondary mb-2">Message Sent!</h3>
                <p className="text-neutral-300">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-200 mb-1">
                      Name <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-dark-300 border border-dark-200 text-white rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary"
                      required
                    />
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-200 mb-1">
                      Email <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-dark-300 border border-dark-200 text-white rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary"
                      required
                    />
                  </div>
                  
                  {/* Subject Field - Full Width */}
                  <div className="md:col-span-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-200 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-dark-300 border border-dark-200 text-white rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary"
                    />
                  </div>
                  
                  {/* Message Field - Full Width */}
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-200 mb-1">
                      Message <span className="text-secondary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 bg-dark-300 border border-dark-200 text-white rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary"
                      required
                    />
                  </div>
                </div>
                
                {/* Error Message */}
                {formError && (
                  <div className="mt-4 text-red-500 text-sm">{formError}</div>
                )}
                
                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto button-primary flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 