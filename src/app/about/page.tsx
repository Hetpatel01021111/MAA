'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import {
  AcademicCapIcon,
  ChartBarIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
    }, 1500); // 1.5 second delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const milestones = [
    {
      year: "2025",
      title: "Founded with Vision",
      description: "ShikshaMitra was conceptualized to address India's education crisis through technology",
      icon: AcademicCapIcon
    },
    {
      year: "2025",
      title: "First Pilot Program",
      description: "Launched in 50 schools across Gujarat with government partnership",
      icon: ChartBarIcon
    },
    {
      year: "2026",
      title: "National Expansion",
      description: "Scaled to 5 states with 500,000+ students onboarded",
      icon: GlobeAltIcon
    },
    {
      year: "2026",
      title: "AI Integration",
      description: "Implemented personalized learning algorithms across platform",
      icon: ShieldCheckIcon
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Priya Sharma",
      role: "Education Director",
      bio: "Former NCERT curriculum designer with 15 years experience in pedagogical innovation",
      image: "/team-priya.jpg"
    },
    {
      name: "Rajesh Patel",
      role: "Technology Lead",
      bio: "AI/ML specialist from IIT Bombay focused on adaptive learning systems",
      image: "/team-rajesh.jpg"
    },
    {
      name: "Ananya Gupta",
      role: "Government Relations",
      bio: "Policy expert bridging technology solutions with NEP 2023 implementation",
      image: "/team-ananya.jpg"
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
              src="https://images.pexels.com/photos/9783353/pexels-photo-9783353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Students learning with technology"
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
                Transforming Education <span className="text-yellow-300">Through Innovation</span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                ShikshaMitra is revolutionizing learning in India with AI-powered personalized education
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
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
                Our <span className="text-indigo-600">Story</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                How we're addressing India's education challenges through technology
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="prose prose-lg text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <p>
                  Founded in 2023, ShikshaMitra emerged as a response to India's growing education crisis. 
                  With <strong>55% of 10-year-olds unable to read simple texts</strong> (ASER 2023) and 
                  <strong> 25% of rural schools lacking electricity</strong> (NITI Aayog 2022), we recognized 
                  the urgent need for scalable, technology-driven solutions.
                </p>
                
                <p>
                  Our initiative aligns with the National Education Policy 2023's vision for digital learning, 
                  but goes further by addressing the <strong>implementation gaps</strong> in existing platforms 
                  like DIKSHA. We combine AI-powered personalization with gamification to create engaging, 
                  effective learning experiences for India's 260 million students.
                </p>
                
                <p>
                  Starting with a pilot program in Gujarat, we've grown to serve <strong>500,000+ students</strong> 
                  across multiple states. Our goal is to achieve a <strong>30% improvement in foundational literacy</strong> 
                  by 2026, potentially adding $90 billion annually to India's GDP by 2030 through better education outcomes.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
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
                  Our <span className="text-indigo-600">Mission</span>
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  To democratize quality education through innovative technology that adapts to each learner's needs
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">
                      Bridge the learning gap for India's 260 million students
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">
                      Leverage AI to provide personalized learning pathways
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">
                      Partner with government to scale impact nationwide
                    </p>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/7666429/pexels-photo-7666429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Students using ShikshaMitra platform"
                    width={800}
                    height={450}
                    className="object-cover"
                  />
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 group"
                  >
                    Learn how our technology works
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Milestones Section */}
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
                Our <span className="text-indigo-600">Journey</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Key milestones in our mission to transform education in India
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-100 transform -translate-x-1/2"></div>
              
              <div className="space-y-12 md:space-y-0">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    className="relative md:flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        delay: index * 0.2,
                        duration: 0.6
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    {/* Left side (even) or right side (odd) */}
                    <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                      <div className={`p-6 bg-white rounded-2xl shadow-lg border border-gray-100 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                            <milestone.icon className="w-6 h-6 text-indigo-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Year */}
                    <div className="hidden md:flex w-24 h-24 mx-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-xl font-bold z-10">
                      {milestone.year}
                    </div>
                    
                    {/* Empty div for alignment */}
                    <div className="hidden md:block md:w-5/12"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Meet Our <span className="text-indigo-600">Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate educators, technologists, and policy experts working together
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: index * 0.2,
                      duration: 0.6
                    }
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-64 relative overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1 text-gray-900">{member.name}</h3>
                    <p className="text-indigo-600 mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
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
                  href="/careers"
                  className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all group"
                >
                  Join Our Team
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl font-bold mb-4">
                Our <span className="text-yellow-300">Impact</span>
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Measuring success through tangible improvements in learning outcomes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: "50K+", label: "Students Empowered", icon: UserGroupIcon },
                { value: "50", label: "Pilot Schools", icon: AcademicCapIcon },
                { value: "30%", label: "Literacy Improvement", icon: ChartBarIcon },
                { value: "10+", label: "States Covered", icon: GlobeAltIcon }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      delay: index * 0.1 + 0.2,
                      duration: 0.6
                    }
                  }}
                  viewport={{ once: true }}
                >
                  <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-5xl font-bold mb-2">{stat.value}</p>
                  <p className="text-xl opacity-90">{stat.label}</p>
                </motion.div>
              ))}
            </div>
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
                    href="/contact"
                    className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-all duration-300 shadow-lg"
                  >
                    Join With Us
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