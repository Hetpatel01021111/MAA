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
  ChevronDownIcon,
  HeartIcon,
  DevicePhoneMobileIcon
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
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br">
        <motion.div 
          className="absolute inset-0"
          style={{ y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 0.2 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Maternal healthcare"
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
              MAA <span className="text-yellow-300">Features</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoading ? 0 : 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Discover powerful tools transforming maternal healthcare for mothers across India
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
      title: "AI-Driven Health Monitoring",
      description: "Track and enhance maternal health with intelligent AI insights for personalized pregnancy care.",
      icon: ChartBarIcon,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      extendedDesc: "Our AI system analyzes health patterns, identifies risks, and provides personalized recommendations to optimize each mother's health journey."
    },
    {
      title: "Family Health Monitoring",
      description: "Complete family safety with real-time health monitoring and medical alerts for mothers and babies.",
      icon: ShieldCheckIcon,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      extendedDesc: "Families receive detailed reports on maternal health progress, baby development, and areas needing attention, all through an intuitive dashboard interface."
    },
    {
      title: "Accessible & Affordable Healthcare",
      description: "Quality maternal care at affordable prices, supported by government healthcare initiatives.",
      icon: HeartIcon,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      extendedDesc: "We partner with healthcare institutions and government bodies to provide premium maternal care completely accessible to mothers across India."
    },
    {
      title: "Nationwide Healthcare Network",
      description: "Empowering mothers across India with quality healthcare and seamless medical resources.",
      icon: GlobeAltIcon,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      extendedDesc: "Our platform connects mothers from rural and urban areas alike, creating a unified healthcare ecosystem with localized care in multiple regional languages."
    },
    {
      title: "24/7 Medical Support",
      description: "Round-the-clock medical support to assist mothers with any health queries or concerns.",
      icon: ClockIcon,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      extendedDesc: "Mothers can access live medical consultations, discussion forums, and AI-powered health assistance at any time of day, ensuring help is always available when needed."
    },
    {
      title: "Regional Healthcare Support",
      description: "Providing comprehensive medical care and nutritional support, tailored to your region.",
      icon: UserGroupIcon,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      extendedDesc: "Our regional centers provide localized support including native language consultations, culturally relevant care plans, and nutritional guidance specific to each area."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "New Mother",
      quote: "MAA has greatly enhanced my pregnancy journey with personalized care and real-time health monitoring.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5
    },
    {
      name: "Anita Patel",
      role: "Expecting Mother",
      quote: "The support from MAA has been amazing. They've made my pregnancy journey smoother and more manageable.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=3888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5
    },
    {
      name: "Sunita Gupta",
      role: "Mother of Two",
      quote: "I'm thankful for MAA's comprehensive healthcare support. It has made a significant difference in my family's health.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=3888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                className="h-14 w-[200px] flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className={`text-2xl font-bold transition-colors ${
                  isScrolled ? 'text-indigo-600' : 'text-white'
                }`}>
                  MAA
                </div>
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
              Comprehensive <span className="text-indigo-600">Healthcare Features</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Explore the powerful tools and resources designed to transform maternal healthcare for mothers across India
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
              What <span className="text-indigo-600">Mothers</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our community about their experiences with MAA
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
              { value: "500K+", label: "Mothers Served" },
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
              Ready to <span className="text-yellow-300">Transform</span> Your Healthcare?
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Join thousands of mothers using MAA for better healthcare outcomes
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
                  <div className="text-2xl font-bold text-white">
                    MAA
                  </div>
                </motion.div>
              </Link>
              <motion.p 
                className="mt-4 text-gray-400 max-w-xs"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Empowering India's mothers through accessible healthcare for all.
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
                  <li><Link href="/guides" className="text-gray-400 hover:text-white transition-colors">Health Guides</Link></li>
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
            <p>© 2025 MAA. All rights reserved.</p>
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