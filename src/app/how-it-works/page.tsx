'use client';

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { 
  ShieldCheckIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  XMarkIcon, 
  Bars3Icon,
  ClockIcon,
  BookOpenIcon,
  VideoCameraIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HowItWorks() {
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

  const collaborationSteps = [
    {
      title: "Government Partnership Framework",
      description: "Formalized through MoUs with state education boards for curriculum alignment and certification",
      icon: ShieldCheckIcon,
      image: "/images/collaborations/map.jpg",
      details: [
        "Signed agreements with 12 state education boards",
        "Curriculum mapping with NCERT standards",
        "Teacher certification programs"
      ]
    },
    {
      title: "AI Integration",
      description: "Enhancing the national platform with personalized learning pathways",
      icon: ChartBarIcon,
      image: "/images/collaborations/ai.jpg",
      details: [
        "API integration",
        "AI-powered content recommendations",
        "Real-time progress tracking"
      ]
    },
    {
      title: "Teacher Empowerment Program",
      description: "Training government teachers as digital learning facilitators",
      icon: AcademicCapIcon,
      image: "/images/collaborations/teacher.jpg",
      details: [
        "500+ master trainers certified",
        "Monthly upskilling workshops",
        "Digital pedagogy certification"
      ]
    },
    {
      title: "Rural Implementation Network",
      description: "Leveraging Anganwadi centers and rural schools as hubs",
      icon: GlobeAltIcon,
      image: "/images/collaborations/rural.jpg",
      details: [
        "10,000+ Anganwadi centers onboarded",
        "Low-bandwidth optimized content",
        "Community education volunteers"
      ]
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
            src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=3876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Students learning"
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
              How We Work With <span className="text-yellow-300">The Government</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoading ? 0 : 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Our nationwide partnership framework transforming education through technology
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
                href="#collaboration"
                className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-all duration-300 group"
              >
                Explore Our Model
                <ChevronDownIcon className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Government Collaboration Section */}
      <section id="collaboration" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Our <span className="text-indigo-600">Government Collaboration</span> Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured partnership model aligned with National Education Policy 2023
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {collaborationSteps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-200"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    delay: index * 0.2,
                    duration: 0.6
                  }
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                    <step.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {step.details.map((detail, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-start text-gray-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ 
                          opacity: 1, 
                          x: 0,
                          transition: {
                            delay: index * 0.2 + i * 0.1 + 0.3
                          }
                        }}
                        viewport={{ once: true }}
                      >
                        <span className="inline-block w-1 h-1 mt-3 mr-2 bg-indigo-600 rounded-full"></span>
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ 
                      opacity: 1,
                      transition: {
                        delay: index * 0.2 + 0.5
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    <a
                      href="#"
                      className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                    >
                      Learn more about this initiative
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Model Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Our <span className="text-indigo-600">Implementation Model</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we're scaling across India with government support
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="relative h-96 mb-12 rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/collaborations/map1.jpg"
                alt="India implementation map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-2">Nationwide Rollout Strategy</h3>
                <p className="text-lg opacity-90">Phase-wise implementation across 28 states and 8 UTs</p>
              </motion.div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Policy Alignment",
                  description: "Direct integration with NEP 2023 digital education framework",
                  icon: ShieldCheckIcon,
                  stats: "100% NEP compliance"
                },
                {
                  title: "Teacher Network",
                  description: "Government teachers trained as digital learning facilitators",
                  icon: UserGroupIcon,
                  stats: "50,000+ teachers onboarded"
                },
                {
                  title: "Infrastructure Synergy",
                  description: "Leveraging existing government school infrastructure",
                  icon: AcademicCapIcon,
                  stats: "75,000+ schools covered"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: index * 0.2 + 0.4,
                      duration: 0.6
                    }
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg mb-4 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <p className="text-indigo-600 font-semibold">{item.stats}</p>
                </motion.div>
              ))}
            </div>
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
              Ready to <span className="text-yellow-300">Transform</span> Education Together?
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Join thousands of educators and students using ShikshaMitra
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
                  href="/login"
                  className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-all duration-300 shadow-lg"
                >
                  ShikshaMitra Login
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
                <a
                  href="#"
                  className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 shadow-lg"
                >
                  Partnership Inquiry
                </a>
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