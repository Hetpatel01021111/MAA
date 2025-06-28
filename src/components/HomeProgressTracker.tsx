import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HomeProgressTracker = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  const metrics = [
    {
      label: 'Daily Health Goals',
      targetValue: 85,
      color: 'from-blue-400 to-blue-600',
      icon: '🎯',
      description: 'Average daily health goal completion rate'
    },
    {
      label: 'Health Checkups',
      targetValue: 92,
      color: 'from-purple-400 to-purple-600',
      icon: '🏥',
      description: 'Success rate in health assessments'
    },
    {
      label: 'Care Plan Progress',
      targetValue: 78,
      color: 'from-emerald-400 to-emerald-600',
      icon: '💊',
      description: 'Overall care plan completion'
    },
    {
      label: 'Health Monitoring',
      targetValue: 88,
      color: 'from-amber-400 to-amber-600',
      icon: '⭐',
      description: 'Health metrics tracked by mothers'
    },
    {
      label: 'Monthly Consultations',
      targetValue: 95,
      color: 'from-rose-400 to-rose-600',
      icon: '📅',
      description: 'Average monthly consultation attendance'
    },
    {
      label: 'Wellness Streak',
      targetValue: 82,
      color: 'from-indigo-400 to-indigo-600',
      icon: '🔥',
      description: 'Average wellness tracking streak'
    }
  ];

  useEffect(() => {
    if (inView) {
      metrics.forEach((metric) => {
        let startTime = Date.now();
        const duration = 2000; // 2 seconds animation

        const animate = () => {
          const currentTime = Date.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function for smooth animation
          const easeOutQuad = (t: number) => t * (2 - t);
          const easedProgress = easeOutQuad(progress);

          setAnimatedValues((prev) => ({
            ...prev,
            [metric.label]: Math.round(easedProgress * metric.targetValue)
          }));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      });
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Track Your Health Journey
          </h2>
          <p className="text-xl text-gray-300">
            Real-time insights into your maternal healthcare progress
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-gray-800 rounded-2xl p-6 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl border border-gray-700">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-10 rounded-lg blur-xl group-hover:opacity-20 transition-opacity`} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{metric.icon}</span>
                      <span className="text-2xl font-bold text-white">
                        {(animatedValues[metric.label] || 0)}%
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {metric.label}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {metric.description}
                    </p>
                    <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${metric.color}`}
                        initial={{ width: '0%' }}
                        animate={inView ? { width: `${animatedValues[metric.label] || 0}%` } : {}}
                        transition={{ duration: 2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProgressTracker;