'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Loading delay effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: EnvelopeIcon,
      title: "Email Us",
      description: "Our team will get back to you within 24 hours",
      details: "contact@shikshamitra.org",
      link: "mailto:contact@shikshamitra.org"
    },
    {
      icon: PhoneIcon,
      title: "Call Us",
      description: "Mon-Fri from 9am to 5pm IST",
      details: "+91 98765 43210",
      link: "tel:+919876543210"
    },
    {
      icon: MapPinIcon,
      title: "Visit Us",
      description: "Come say hello at our headquarters",
      details: "EduTech Park, Sector 62, Noida, Uttar Pradesh 201309",
      link: "https://maps.google.com/?q=EduTech+Park,+Sector+62,+Noida"
    },
    {
      icon: ClockIcon,
      title: "Working Hours",
      description: "Our standard operating times",
      details: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 3:00 PM",
      link: null
    }
  ];

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Image
                src="/logo.svg"
                alt="ShikshaMitra Logo"
                width={200}
                height={60}
              />
            </motion.div>
            <motion.div
              className="mt-8 h-1 w-48 bg-gray-200 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen">
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <motion.div 
                  className="h-14 w-[200px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/logo.svg"
                    alt="ShikshaMitra Logo"
                    width={200}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                {[
                  ['Home', '/'],
                  ['Features', '/features'],
                  ['How It Works', '/how-it-works'],
                  ['About', '/about'],
                  ['Need Help?', '/track'],
                  ['Contact', '/contact'],
                ].map(([label, href]) => (
                  <motion.div
                    key={href}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={href}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        isScrolled
                          ? pathname === href
                            ? 'bg-indigo-100 text-indigo-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                          : pathname === href
                            ? 'bg-white/20 text-white font-semibold'
                            : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/login"
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      isScrolled 
                        ? 'text-indigo-600 hover:text-indigo-500' 
                        : 'text-white hover:text-indigo-200'
                    }`}
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signup"
                    className={`inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white ${
                      isScrolled ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-white/20 hover:bg-white/30'
                    } transition-colors`}
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`md:hidden overflow-hidden rounded-lg mt-2 mb-2 ${
                    isScrolled ? 'bg-white shadow-lg' : 'bg-white/10 backdrop-blur-md'
                  }`}
                >
                  <div className="px-4 py-2 space-y-2">
                    {[
                      ['Home', '/'],
                      ['Features', '/features'],
                      ['How It Works', '/how-it-works'],
                      ['About', '/about'],
                      ['Need Help?', '/track'],
                      ['Contact', '/contact'],
                    ].map(([label, href]) => (
                      <motion.div
                        key={label}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href={href}
                          className={`block py-3 px-4 rounded-lg transition-colors ${
                            pathname === href
                              ? 'bg-indigo-600 text-white font-medium'
                              : isScrolled 
                                ? 'text-gray-700 hover:bg-gray-100'
                                : 'text-white hover:bg-white/10'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {label}
                        </Link>
                      </motion.div>
                    ))}
                    <div className="pt-2 space-y-2">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href="/login"
                          className={`block w-full py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                            isScrolled
                              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Login
                        </Link>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href="/signup"
                          className="block w-full py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-center font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Hero Section */}
        <section 
          ref={ref}
          className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br"
        >
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: yBg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 0.2 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Image
              src="https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Contact us - people communicating"
              fill
              className="object-cover"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: isLoading ? 0 : 1, 
                y: isLoading ? 40 : 0 
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Let's <span className="text-yellow-300">Connect</span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                We'd love to hear from you! Reach out for support, or just to say hello.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                How to <span className="text-indigo-600">Reach Us</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Multiple ways to get in touch with our team
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: index * 0.1,
                      duration: 0.6
                    }
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                    <method.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <div className="text-gray-700 whitespace-pre-line">
                    {method.details}
                  </div>
                  {method.link && (
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="mt-4"
                    >
                      <a 
                        href={method.link} 
                        className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800"
                      >
                        Contact us
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  Send Us a <span className="text-indigo-600">Message</span>
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Have questions about our platform? Want to partner with us? Fill out the form and our team will get back to you shortly.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">
                      Typically respond within <strong>24 hours</strong> on business days
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">
                      All inquiries are handled by our <strong>dedicated team</strong>
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="What's this about?"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Your message here..."
                      ></textarea>
                    </div>
                    <div>
                      <motion.button
                        type="submit"
                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ChatBubbleBottomCenterTextIcon className="w-5 h-5 mr-2" />
                        Send Message
                      </motion.button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Frequently <span className="text-indigo-600">Asked Questions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Quick answers to common questions about ShikshaMitra
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How can my school join ShikshaMitra?",
                  answer: "Schools can apply through our partnership portal. We work with both government and private schools across India. The process includes a needs assessment, infrastructure review, and teacher training program."
                },
                {
                  question: "What technology requirements are needed to use your platform?",
                  answer: "Our platform works on any device with internet access, including low-end smartphones. For schools, we recommend at least one device per 5 students. We've optimized our solution to work even in low-bandwidth conditions."
                },
                {
                  question: "Do you offer support in regional languages?",
                  answer: "Yes! Currently we support 8 Indian languages including Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, and Malayalam. We're continuously adding more language support based on demand."
                },
                {
                  question: "How does ShikshaMitra ensure student data privacy?",
                  answer: "We comply with India's Digital Personal Data Protection Act 2023. All student data is encrypted, and we never share personal information with third parties without explicit consent. Our platform has received ISO 27001 certification for information security."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: index * 0.1,
                      duration: 0.6
                    }
                  }}
                  viewport={{ once: true }}
                >
                  <button
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      const answer = document.getElementById(`answer-${index}`);
                      answer?.classList.toggle('hidden');
                    }}
                  >
                    <h3 className="text-xl font-medium text-gray-900">{faq.question}</h3>
                    <ChevronDownIcon className="w-5 h-5 text-gray-500 transform transition-transform" />
                  </button>
                  <div id={`answer-${index}`} className="hidden px-6 pb-6 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/faq"
                  className="inline-flex items-center px-8 py-3 border border-indigo-600 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-all group"
                >
                  View All FAQs
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-0 bg-gray-50">
          <div className="container mx-auto px-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl border border-gray-200"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d667.8317509130618!2d72.35730333405213!3d23.58493335191761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c418b7e5e9091%3A0x4f59dd2078a52687!2sSardardham%2C%20H%2F274%2C%20Road%20No.%2018%2C%20V.%20I.%20P.%20Nagar%2C%20Mehsana%2C%20Gujarat%20384002%2C%20India!5e1!3m2!1sen!2sae!4v1744465344181!5m2!1sen!2sae"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="ShikshaMitra Headquarters Location"
              ></iframe>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">
                Ready to <span className="text-yellow-300">Transform</span> Education With Us?
              </h2>
              <p className="text-xl mb-12 max-w-2xl mx-auto">
                Whether you're an educator, policymaker, or technology partner, join our mission
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href="/signup"
                    className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-all duration-300 shadow-lg"
                  >
                    Join Our Network
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 shadow-lg"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}