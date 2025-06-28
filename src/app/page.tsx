'use client';

import { useState, useEffect } from "react";
import ImageWithFallback from "@/components/ImageWithFallback";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HomeProgressTracker from "@/components/HomeProgressTracker";

import {
  TruckIcon,
  GlobeAsiaAustraliaIcon,
  CalculatorIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Ensure component is mounted before accessing pathname
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
      {
        image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1289&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Pregnant woman receiving healthcare"
      },
      {
        image: "https://images.unsplash.com/photo-1576696058573-12b47c49559e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Mother and baby healthcare consultation"
      },
      {
        image: "https://plus.unsplash.com/premium_photo-1663099956579-cbb3e6f85316?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Digital maternal healthcare technology"
      }
    ];

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }, [slides.length]);

    return (
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
        {/* Background Images Slideshow */}
        {slides.map((slide, index) => (
          <motion.div
            key={slide.image}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1.05 : 1
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
            <ImageWithFallback
              src={slide.image}
              alt={slide.alt}
              fill
              quality={90}
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
              placeholder="blur"
            />
          </motion.div>
        ))}

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Because Every Mother
              </span>{' '}
              <span className="text-white">
                Deserves The Best Care
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Empower your maternal journey with MAA's comprehensive healthcare platform—access quality medical resources, track your pregnancy progress in real-time, and connect with expert healthcare providers for the best care.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link 
                href="#calculate"
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link 
                href="#features"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>
    );
  };

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Don't render navigation links until component is mounted
  const navigationLinks = mounted ? [
    ['Home', '/'],
    ['Features', '/features'],
    ['How It Works', '/how-it-works'],
    ['About', '/about'],
    ['Need Help?', '/track'],
    ['Contact', '/contact'],
  ] : [];

  return (
    <main className="min-h-screen custom-scrollbar">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="h-14 w-[200px] flex items-center">
                <div className={`text-2xl font-bold transition-colors ${
                  isScrolled ? 'text-indigo-600' : 'text-white'
                }`}>
                  MAA
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className={`px-3 py-2 rounded-md transition-colors ${
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
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
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
              <Link
                href="/signup"
                className={`inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white ${
                  isScrolled ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-white/20 hover:bg-white/30'
                } transition-colors`}
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            className={`md:hidden overflow-hidden rounded-lg mt-2 mb-2 ${
              isScrolled ? 'bg-white shadow-lg' : 'bg-white/10 backdrop-blur-md'
            }`}
          >
            <div className="px-4 py-2 space-y-2">
              {navigationLinks.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className={`block py-2 px-4 rounded-lg transition-colors ${
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
              ))}
              <div className="pt-2 space-y-2">
                <Link
                  href="/login"
                  className={`block w-full py-2 px-4 rounded-lg text-center font-medium transition-colors ${
                    isScrolled
                      ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-center font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />
      <HomeProgressTracker />
      
      {/* Why MAA Section */}
      <section className="py-20 bg-white" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Why Choose MAA?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of maternal healthcare with our innovative platform. We combine technology with expert medical guidance to transform your pregnancy journey.
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">AI-Driven Health Monitoring</h3>
              <p className="text-gray-600">
              Track and enhance maternal health with intelligent AI insights for personalized pregnancy care.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-violet-100 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Family Health Monitoring</h3>
              <p className="text-gray-600">
              Complete family safety with real-time health monitoring and medical alerts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Accessible & Affordable Healthcare</h3>
              <p className="text-gray-600">
                Quality maternal care at affordable prices, supported by government healthcare initiatives.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-violet-100 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Nationwide Healthcare Network</h3>
              <p className="text-gray-600">
                Empowering mothers across India with quality healthcare and seamless medical resources.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">24/7 Medical Support</h3>
              <p className="text-gray-600">
                Round-the-clock medical support to assist you with any health queries or concerns.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-violet-100 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Personalized Care Plans</h3>
              <p className="text-gray-600">
              Providing personalized maternal care plans tailored to your specific needs and health conditions.
              </p>
            </div>
          </div>

          {/* Additional Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Feature 7 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Prenatal Care Monitoring</h3>
              <p className="text-gray-600">
                Comprehensive prenatal monitoring with regular checkups, health tracking, and expert guidance throughout your pregnancy.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Virtual Consultations</h3>
              <p className="text-gray-600">
                Access expert medical consultations from the comfort of your home with our telemedicine platform.
              </p>
            </div>

            {/* Feature 9 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-red-100 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm-6 2h12a2 2 0 012 2v5H4v-5a2 2 0 012-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Secure Health Records</h3>
              <p className="text-gray-600">
                We maintain secure digital health records with verified medical history for comprehensive care.
              </p>
            </div>
          </div>
              
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Link 
              href="/signup"
              className="inline-block bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-violet-700 transition-all transform hover:scale-105"
            >
              Join MAA Today
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Voices from Our Healthcare Community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our valued patients have to say about MAA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Priya Sharma</h4>
                  <p className="text-gray-600">New Mother</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                MAA has greatly enhanced my pregnancy journey with personalized care and real-time health monitoring.
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Anita Patel</h4>
                  <p className="text-gray-600">Expecting Mother</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                The support from MAA has been amazing. They've been there for me every step of the way, making my pregnancy journey smoother and more manageable.
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Sunita Gupta</h4>
                  <p className="text-gray-600">Mother of Two</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
              As a mother, I'm thankful for MAA's comprehensive healthcare support. It has made a significant difference in my family's overall health and well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied mothers who trust MAA for their healthcare needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Get Started Now
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>    

      {/* Feedback Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-5"></div>
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-20"
          >
            <div className="w-32 h-32 bg-gradient-to-r from-indigo-400/20 to-violet-400/20 rounded-full blur-xl"></div>
          </motion.div>
          <motion.div
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.3, 1],
              y: [0, 20, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-20"
          >
            <div className="w-40 h-40 bg-gradient-to-r from-violet-400/20 to-indigo-400/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4z"/>
                </svg>
              </div>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
            >
              Your Voice Matters
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Help us improve your healthcare experience
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/80 rounded-2xl shadow-xl p-8 backdrop-blur-sm"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-gray-900 bg-gray-50/50"
                    placeholder="Your name"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-gray-900 bg-gray-50/50"
                    placeholder="Your email"
                  />
                </motion.div>
              </div>
              <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-gray-900 h-32 bg-gray-50/50"
                  placeholder="Share your experience with us"
                ></textarea>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(79, 70, 229, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg"
              >
                <motion.span className="inline-block"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Send Feedback
                </motion.span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-violet-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
              x: [-10, 10, -10]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -left-20 top-1/2 transform -translate-y-1/2"
          >
            <div className="w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
          </motion.div>
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.3, 1],
              x: [10, -10, 10]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -right-20 top-1/2 transform -translate-y-1/2"
          >
            <div className="w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Stay Updated with MAA
              <br />
              <span className="text-2xl font-normal mt-2 block text-indigo-100">
                Get the latest healthcare updates and exclusive features
              </span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <motion.div 
              className="flex flex-col md:flex-row gap-4 p-2 bg-white/10 backdrop-blur-sm rounded-lg"
              whileHover={{ boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900  placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgb(249, 250, 251)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                <motion.span 
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center"
                >
                  Subscribe Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H6"/>
                  </svg>
                </motion.span>
              </motion.button>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-indigo-100 mt-4 text-sm"
            >
              By subscribing, you agree to our Terms of Service and Privacy Policy
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-navy-900 text-white">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="text-2xl font-bold text-white">
                MAA
              </div>
              <p className="text-gray-400">
                Introducing MAA, an Indian maternal healthcare platform dedicated to supporting mothers in optimizing their health journey.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 5.16c-.94.42-1.95.7-3 .82v.63c0 7-5.37 15.06-15.19 15.06-3.02 0-5.83-.87-8.2-2.37.42.05.84.07 1.27.07 2.5 0 4.79-.85 6.6-2.28-2.33-.04-4.3-1.58-4.98-3.69.32.06.65.1.99.1.48 0 .94-.06 1.38-.18-2.43-.49-4.26-2.63-4.26-5.21v-.07c.72.4 1.54.64 2.41.67-1.43-.96-2.37-2.58-2.37-4.43 0-.98.26-1.89.72-2.68 2.62 3.22 6.54 5.33 10.96 5.55-.09-.4-.14-.81-.14-1.23 0-2.98 2.42-5.4 5.4-5.4 1.55 0 2.95.66 3.93 1.71.98-.19 1.9-.55 2.73-1.04-.32 1-.99 1.84-1.87 2.37.87-.1 1.69-.34 2.46-.67-.57.84-1.3 1.58-2.14 2.17z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm-6 2h12a2 2 0 012 2v5H4v-5a2 2 0 012-2z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Health Guidelines</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-emerald-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="text-gray-400">Mehasana, Gujarat (India)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-emerald-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-gray-400">info@maa.com</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-emerald-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-gray-400">+971-0504681209</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="py-8 border-t border-gray-800 text-center text-gray-400">
            <p>Copyright 2025 MAA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}