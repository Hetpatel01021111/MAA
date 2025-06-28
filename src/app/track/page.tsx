'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon,
  LightBulbIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NeedHelpPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const pathname = usePathname();
  const ref = useRef(null);
  const chatEndRef = useRef(null);
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

  // Scroll to bottom of chat when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content: query };
    setChatHistory(prev => [...prev, userMessage]);
    setQuery('');
    setIsTyping(true);
    
    try {
      // Call DeepSeek API
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [...chatHistory, userMessage],
          temperature: 0.7,
          max_tokens: 1000
        })
      });
      
      const data = await response.json();
      if (data.choices && data.choices[0].message) {
        const aiMessage = data.choices[0].message;
        setChatHistory(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please check your API key and try again.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const helpTopics = [
    {
      icon: LightBulbIcon,
      title: "Getting Started",
      description: "Learn how to set up your account and navigate the platform",
      questions: [
        "How do I create an account?",
        "What are the system requirements?",
        "How do I reset my password?"
      ]
    },
    {
      icon: SparklesIcon,
      title: "Healthcare Features",
      description: "Explore all the powerful healthcare features available to you",
      questions: [
        "How does the health monitoring work?",
        "Can I customize my care plan?",
        "What medical integrations are available?"
      ]
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Troubleshooting",
      description: "Solutions to common problems and issues",
      questions: [
        "Why can't I log in?",
        "The app isn't loading, what should I do?",
        "How do I report a bug?"
      ]
    },
    {
      icon: QuestionMarkCircleIcon,
      title: "Account & Billing",
      description: "Manage your subscription and payment methods",
      questions: [
        "How do I upgrade my plan?",
        "Where can I download my invoices?",
        "What's your refund policy?"
      ]
    }
  ];

  // Skeleton Loading Components
  const SkeletonText = ({ className = '' }) => (
    <div className={`bg-gray-200 rounded-full animate-pulse ${className}`}></div>
  );

  const SkeletonBox = ({ className = '' }) => (
    <div className={`bg-gray-200 rounded-lg animate-pulse ${className}`}></div>
  );

  return (
    <>
      <main className="min-h-screen">
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="h-14 w-[200px] flex items-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    MAA
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                {isLoading ? (
                  Array(6).fill(0).map((_, i) => (
                    <SkeletonText key={i} className="w-20 h-10" />
                  ))
                ) : (
                  [
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
                  ))
                )}
              </div>

              {/* CTA Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                {isLoading ? (
                  <>
                    <SkeletonText className="w-20 h-10" />
                    <SkeletonText className="w-24 h-12" />
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              {isLoading ? (
                <SkeletonBox className="w-10 h-10 md:hidden" />
              ) : (
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
              )}
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
          {isLoading ? (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          ) : (
            <motion.div 
              className="absolute inset-0 z-0"
              style={{ y: yBg }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1 }}
            >
              <Image
                src="https://images.pexels.com/photos/5905841/pexels-photo-5905841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Healthcare support - people communicating"
                fill
                className="object-cover"
              />
            </motion.div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            {isLoading ? (
              <div className="space-y-6 max-w-3xl mx-auto">
                <SkeletonText className="h-12 w-3/4 mx-auto" />
                <SkeletonText className="h-6 w-2/3 mx-auto" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-6 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  Need <span className="text-yellow-300">Help?</span>
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  Our AI assistant and support resources are here to help you
                </motion.p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Help Topics Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center mb-16">
                <SkeletonText className="h-10 w-1/3 mx-auto mb-4" />
                <SkeletonText className="h-6 w-1/2 mx-auto" />
              </div>
            ) : (
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Quick <span className="text-indigo-600">Help Topics</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Browse our most frequently requested help categories
                </p>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <SkeletonBox className="w-12 h-12 mb-6" />
                    <SkeletonText className="h-6 w-3/4 mb-2" />
                    <SkeletonText className="h-4 w-full mb-4" />
                    <div className="space-y-2">
                      <SkeletonText className="h-4 w-full" />
                      <SkeletonText className="h-4 w-5/6" />
                      <SkeletonText className="h-4 w-4/5" />
                    </div>
                  </div>
                ))
              ) : (
                helpTopics.map((topic, index) => (
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
                      <topic.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{topic.title}</h3>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <div className="space-y-2">
                      {topic.questions.map((question, qIndex) => (
                        <button
                          key={qIndex}
                          onClick={() => setQuery(question)}
                          className="block w-full text-left text-indigo-600 hover:text-indigo-800 hover:underline text-sm"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* AI Assistant Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {isLoading ? (
                <div className="space-y-6">
                  <SkeletonText className="h-10 w-3/4" />
                  <SkeletonText className="h-6 w-full" />
                  <SkeletonText className="h-6 w-5/6" />
                  <div className="space-y-4">
                    {Array(2).fill(0).map((_, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <SkeletonBox className="w-6 h-6 rounded-full" />
                        <SkeletonText className="h-4 w-3/4" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold mb-6 text-gray-900">
                    AI <span className="text-indigo-600">Support Assistant</span>
                  </h2>
                  <p className="text-xl text-gray-600 mb-6">
                    Get instant answers to your questions with our AI-powered assistant. 
                    Ask anything about our platform and get detailed responses.
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
                        Provides <strong>instant responses</strong> 24/7
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
                        Understands <strong>complex questions</strong> about our platform
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {isLoading ? (
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-[500px]">
                  <div className="space-y-4 h-full flex flex-col">
                    <div className="flex-grow space-y-4">
                      {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="flex space-x-3">
                          <SkeletonBox className="w-8 h-8 rounded-full" />
                          <SkeletonText className="h-16 w-3/4 rounded-lg" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <SkeletonText className="h-4 w-1/3" />
                      <SkeletonText className="h-12 w-full rounded-lg" />
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                >
                  <div className="flex flex-col h-[500px]">
                    {/* Chat messages */}
                    <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                      {chatHistory.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-gray-500">
                          <p>Ask me anything about MAA...</p>
                        </div>
                      ) : (
                        chatHistory.map((message, index) => (
                          <div 
                            key={index} 
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[80%] rounded-lg p-4 ${
                                message.role === 'user' 
                                  ? 'bg-indigo-600 text-white' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <p className="whitespace-pre-wrap">{message.content}</p>
                            </div>
                          </div>
                        ))
                      )}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 text-gray-800 rounded-lg p-4 max-w-[80%]">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* API Key Input */}
                    {showApiKeyInput && (
                      <div className="mb-4">
                        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                          DeepSeek API Key <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          id="apiKey"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all mb-2"
                          placeholder="Enter your DeepSeek API key"
                        />
                        <p className="text-xs text-gray-500">
                          Your API key is used only for this session and is not stored.
                        </p>
                      </div>
                    )}

                    {/* Chat input */}
                    <form onSubmit={handleSubmit} className="mt-auto">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="Type your question here..."
                          disabled={isTyping}
                        />
                        <button
                          type="submit"
                          disabled={isTyping || !query.trim()}
                          className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
                        >
                          <ArrowRightIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </form>

                    {/* API Key Toggle */}
                    <div className="mt-2 text-right">
                      <button
                        onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        {showApiKeyInput ? 'Hide API Key' : 'Set API Key'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center mb-16">
                <SkeletonText className="h-10 w-1/3 mx-auto mb-4" />
                <SkeletonText className="h-6 w-1/2 mx-auto" />
              </div>
            ) : (
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
                  Quick answers to common questions about MAA
                </p>
              </motion.div>
            )}

            <div className="max-w-3xl mx-auto space-y-6">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="w-full flex justify-between items-center p-6">
                      <SkeletonText className="h-6 w-3/4" />
                      <SkeletonBox className="w-5 h-5" />
                    </div>
                  </div>
                ))
              ) : (
                [
                  {
                    question: "How can I reset my password?",
                    answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password."
                  },
                  {
                    question: "What healthcare services do you provide?",
                    answer: "We provide comprehensive maternal healthcare services including prenatal monitoring, virtual consultations, health tracking, and personalized care plans."
                  },
                  {
                    question: "How do I cancel my subscription?",
                    answer: "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period."
                  },
                  {
                    question: "Is there a mobile app available?",
                    answer: "Yes! Our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store."
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
                        answer.classList.toggle('hidden');
                      }}
                    >
                      <h3 className="text-xl font-medium text-gray-900">{faq.question}</h3>
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 transform transition-transform" />
                    </button>
                    <div id={`answer-${index}`} className="hidden px-6 pb-6 pt-0 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="mt-12 text-center">
              {isLoading ? (
                <SkeletonText className="h-12 w-40 mx-auto rounded-full" />
              ) : (
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
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
          <div className="container mx-auto px-4 text-center">
            {isLoading ? (
              <div className="space-y-8 max-w-2xl mx-auto">
                <SkeletonText className="h-12 w-3/4 mx-auto" />
                <SkeletonText className="h-6 w-5/6 mx-auto" />
                <div className="flex flex-wrap justify-center gap-4">
                  <SkeletonText className="h-12 w-40 rounded-full" />
                  <SkeletonText className="h-12 w-32 rounded-full" />
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-8">
                  Still Need <span className="text-yellow-300">Help?</span>
                </h2>
                <p className="text-xl mb-12 max-w-2xl mx-auto">
                  Our human support team is available to help with more complex issues
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
                      Contact Support
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
                      Platform Guide
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}