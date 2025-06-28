'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ChartBarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ClockIcon,
  BookOpenIcon,
  UserGroupIcon,
  VideoCameraIcon,
  IdentificationIcon,
  AcademicCapIcon,
  XMarkIcon, 
  Bars3Icon,
  ArrowRightIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function FeaturesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Loading delay effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const HeroSection = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br"> {/*from-indigo-600 via-violet-600 to-purple-700 */}
        <motion.div 
          className="absolute inset-0"
          style={{ y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 0.2 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Students learning"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10" />
        
        <div className="container mx-auto px-4 relative z-20 text-center">
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
              ShikshaMitra <span className="text-yellow-300">Features</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoading ? 0 : 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Discover powerful tools transforming education for students across India
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isLoading ? 0 : 1, 
                y: isLoading ? 20 : 0 
              }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-12"
            >
              <Link
                href="#features"
                className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-all duration-300 group"
              >
                Explore Features
                <ChevronDownIcon className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 flex justify-center pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isLoading ? 0 : 1, 
            y: isLoading ? 20 : 0 
          }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <ChevronDownIcon className="h-8 w-8 text-white opacity-70" />
          </motion.div>
        </motion.div>
      </section>
    );
  };

  const features = [
    {
      title: "AI-Driven Performance Monitoring",
      description: "Track and enhance student progress with intelligent AI insights for personalized learning growth.",
      icon: ChartBarIcon,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      extendedDesc: "Our AI system analyzes learning patterns, identifies strengths and weaknesses, and provides personalized recommendations to optimize each student's learning journey."
    },
    {
      title: "Parent Monitoring Dashboard",
      description: "Complete child safety with real-time monitoring and activity alerts for parents.",
      icon: ShieldCheckIcon,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      extendedDesc: "Parents receive detailed reports on their child's progress, time spent learning, and areas needing attention, all through an intuitive dashboard interface."
    },
    {
      title: "Accessible & Free Education",
      description: "Quality learning at no cost, supported by government initiatives for every child's future.",
      icon: AcademicCapIcon,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      extendedDesc: "We partner with educational institutions and government bodies to provide premium educational content completely free of charge to students across India."
    },
    {
      title: "Nationwide Learning Network",
      description: "Empowering students across India with quality education and seamless learning resources.",
      icon: GlobeAltIcon,
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      extendedDesc: "Our platform connects students from rural and urban areas alike, creating a unified educational ecosystem with localized content in multiple regional languages."
    },
    {
      title: "24/7 Academic Support",
      description: "Round-the-clock student support to assist with any queries or concerns.",
      icon: ClockIcon,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      extendedDesc: "Students can access live tutors, discussion forums, and AI-powered assistance at any time of day, ensuring help is always available when needed."
    },
    {
      title: "Regional Support System",
      description: "Providing full tutoring and nutritional support, tailored to your region.",
      icon: UserGroupIcon,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      extendedDesc: "Our regional centers provide localized support including native language tutors, culturally relevant learning materials, and nutritional guidance specific to each area."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Father of 9-Year-Old Twins",
      quote: "ShikshaMitra has greatly enhanced my children's learning with personalized support and real-time progress tracking.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "10th Grade Student",
      quote: "The support from ShikshaMitra has been amazing. They've made my board exam journey smoother and more manageable.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=3888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Father of 6-Year-Old",
      quote: "I'm thankful for ShikshaMitra's nutritional support for my son. It has made a significant difference in his development.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
                <object
                  data="/logo.svg"
                  type="image/svg+xml"
                  className="h-full w-full"
                  aria-label="ShikshaMitra Logo"
                >
                  ShikshaMitra Logo
                </object>
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
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
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
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign Up  
              </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
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
                className="md:hidden overflow-hidden bg-white/10 backdrop-blur-md rounded-lg mt-2 mb-2"
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
                        className="block w-full py-3 px-4 text-white bg-white/10 hover:bg-white/20 rounded-lg text-center font-medium"
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
                        href="/track"
                        className="block w-full py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-center font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Need Help?
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
      <HeroSection />

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Comprehensive <span className="text-indigo-600">Learning Features</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Explore the powerful tools and resources designed to transform education for students across India
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const [ref, inView] = useInView({
                threshold: 0.1,
                triggerOnce: true
              });

              return (
                <motion.div 
                  key={index}
                  ref={ref}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                  initial={{ opacity: 0, y: 50, scale: 0.95, rotate: -2 }}
                  animate={inView ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotate: 0,
                    transition: { 
                      delay: index * 0.15,
                      duration: 0.8,
                      type: "spring",
                      damping: 10,
                      stiffness: 100
                    } 
                  } : {}}
                  whileHover={{ 
                    y: -10,
                    transition: { 
                      duration: 0.3,
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }
                  }}
                >
                  <div className="h-48 relative overflow-hidden">
                    <motion.div
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={inView ? { 
                        scale: 1, 
                        opacity: 1,
                        transition: { 
                          delay: index * 0.15 + 0.3, 
                          duration: 1,
                          ease: [0.2, 0.8, 0.4, 1] 
                        }
                      } : {}}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    <motion.div 
                      className="absolute top-4 right-4 w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={inView ? { 
                        scale: 1, 
                        rotate: 0,
                        transition: { 
                          delay: index * 0.15 + 0.5, 
                          type: "spring",
                          stiffness: 300,
                          damping: 10
                        }
                      } : {}}
                      whileHover={{
                        rotate: [0, 10, -10, 0],
                        transition: { duration: 0.6 }
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { 
                          scale: 1,
                          transition: { 
                            delay: index * 0.15 + 0.7,
                            type: "spring"
                          }
                        } : {}}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <motion.h3 
                      className="text-xl font-bold mb-3 text-gray-900"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          delay: index * 0.15 + 0.4,
                          duration: 0.6
                        }
                      } : {}}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.15 + 0.5,
                          duration: 0.6
                        }
                      } : {}}
                    >
                      {feature.description}
                    </motion.p>
                    
                    <motion.button
                      className="flex items-center text-indigo-600 font-medium group"
                      onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                      initial={{ opacity: 0 }}
                      animate={inView ? { 
                        opacity: 1,
                        transition: { 
                          delay: index * 0.15 + 0.6,
                          duration: 0.6
                        }
                      } : {}}
                      whileHover={{ 
                        x: 5,
                        transition: { 
                          duration: 0.3,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      <span className="group-hover:underline">Learn more</span>
                      <motion.span
                        animate={{
                          x: [0, 5, 0],
                          transition: {
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </motion.span>
                    </motion.button>
                    
                    <AnimatePresence>
                      {activeFeature === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: 1, 
                            height: 'auto',
                            transition: {
                              duration: 0.5,
                              ease: "easeInOut"
                            }
                          }}
                          exit={{ 
                            opacity: 0, 
                            height: 0,
                            transition: {
                              duration: 0.3,
                              ease: "easeInOut"
                            }
                          }}
                          className="overflow-hidden pt-4"
                        >
                          <motion.p 
                            className="text-gray-600 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: 1,
                              transition: { delay: 0.2 }
                            }}
                          >
                            {feature.extendedDesc}
                          </motion.p>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1,
                              transition: { delay: 0.3 }
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Link
                              href="/signup"
                              className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                            >
                              Get Started
                            </Link>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              What <span className="text-indigo-600">Parents & Students</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our community about their experiences with ShikshaMitra
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const [ref, inView] = useInView({
                threshold: 0.1,
                triggerOnce: true
              });

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: index * 0.2,
                      duration: 0.6,
                      ease: "backOut"
                    }
                  } : {}}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <div className="flex items-center mb-6">
                    <motion.div
                      className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-indigo-100"
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.2, type: "spring" }}
                    >
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.2 + 0.3 }}
                    >
                      <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </motion.div>
                  </div>
                  <motion.p
                    className="text-gray-600 italic mb-6"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.4 }}
                  >
                    "{testimonial.quote}"
                  </motion.p>
                  <motion.div
                    className="flex"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { value: "50K+", label: "Students Empowered" },
              { value: "100+", label: "Cities Covered" },
              { value: "24/7", label: "Support Available" },
              { value: "95%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 + 0.2 }
                }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-5xl font-bold mb-2"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: index * 0.1 + 0.3
                  }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.p>
                <motion.p 
                  className="text-xl opacity-90"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.9 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to <span className="text-yellow-300">Transform</span> Education?
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Join thousands of students and parents using ShikshaMitra for better learning outcomes
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
                  Sign Up Now
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
                  href="/login"
                  className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 shadow-lg"
                >
                  Login
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="flex items-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/logo.svg"
                    alt="ShikshaMitra"
                    width={180}
                    height={50}
                    className="brightness-0 invert"
                  />
                </motion.div>
              </Link>
              <motion.p 
                className="mt-4 text-gray-400 max-w-xs"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Empowering India's future through accessible education for all.
              </motion.p>
            </div>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/guides" className="text-gray-400 hover:text-white transition-colors">Guides</Link></li>
                  <li><Link href="/webinars" className="text-gray-400 hover:text-white transition-colors">Webinars</Link></li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
                  <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
                  <li><Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</Link></li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/twitter" className="text-gray-400 hover:text-white transition-colors">Twitter</Link></li>
                  <li><Link href="/facebook" className="text-gray-400 hover:text-white transition-colors">Facebook</Link></li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
          <motion.div 
            className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p>© 2025 ShikshaMitra. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}

// Star icon component for ratings
function StarIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}