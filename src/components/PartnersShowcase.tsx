'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const partners = [
  {
    name: 'FedEx',
    logo: '/partners/fedex.svg',
    description: 'Global logistics leader'
  },
  {
    name: 'DHL',
    logo: '/partners/dhl.svg',
    description: 'International shipping expert'
  },
  {
    name: 'Blue Dart',
    logo: '/partners/bluedart.svg',
    description: 'India\'s premier courier'
  },
  {
    name: 'DTDC',
    logo: '/partners/dtdc.svg',
    description: 'Nationwide delivery network'
  },
  {
    name: 'Delhivery',
    logo: '/partners/delhivery.svg',
    description: 'Tech-driven logistics'
  },
  {
    name: 'India Post',
    logo: '/partners/indiapost.svg',
    description: 'Government postal service'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export default function PartnersShowcase() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="partners">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1586528116493-da8b772f0c7d?w=1920&q=80"
          alt="Logistics Background"
          fill
          style={{ objectFit: 'cover', opacity: 0.05 }}
        />
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-500 to-navy-900 bg-clip-text text-transparent">
            Our Trusted Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We collaborate with the world's leading logistics providers to ensure reliable delivery
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-8">
                <div className="h-20 relative mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-gray-600">{partner.description}</p>
              </div>
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Verified Partner</span>
                  <svg
                    className="w-5 h-5 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-8">
            Want to become a delivery partner?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-navy-900 text-white px-8 py-3 rounded-full hover:bg-navy-800 transition-colors shadow-lg"
          >
            Partner with Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}