import React from 'react';
import { motion } from 'framer-motion';

interface TrackingMetric {
  label: string;
  value: number;
  color: string;
  icon: string;
  description?: string;
}

const ProgressTracker = () => {
  const metrics: TrackingMetric[] = [
    {
      label: 'Daily Health Goals',
      value: 85,
      color: 'bg-blue-500',
      icon: '🎯',
      description: 'Today\'s health goal completion'
    },
    {
      label: 'Health Checkups',
      value: 92,
      color: 'bg-purple-500',
      icon: '🏥',
      description: '23 out of 25 checkups completed'
    },
    {
      label: 'Care Plan Progress',
      value: 78,
      color: 'bg-emerald-500',
      icon: '💊',
      description: '15/20 care modules completed'
    },
    {
      label: 'Health Monitoring',
      value: 88,
      color: 'bg-amber-500',
      icon: '⭐',
      description: 'Advanced health tracking level'
    },
    {
      label: 'Monthly Consultations',
      value: 95,
      color: 'bg-rose-500',
      icon: '📅',
      description: '19 out of 20 consultations'
    },
    {
      label: 'Wellness Streak',
      value: 82,
      color: 'bg-indigo-500',
      icon: '🔥',
      description: '7 days wellness streak'
    }
  ];

  return (
    <div className="w-full p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="mr-2">📊</span>
        Health Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex flex-col items-center p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
          >
            <div className="relative w-28 h-28">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-gray-700 stroke-current"
                  strokeWidth="8"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                />
                <motion.circle
                  className={`stroke-current ${metric.color}`}
                  strokeWidth="8"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: metric.value / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <text
                  x="50"
                  y="45"
                  textAnchor="middle"
                  className="text-2xl"
                >
                  {metric.icon}
                </text>
                <text
                  x="50"
                  y="65"
                  textAnchor="middle"
                  className="text-xl font-bold"
                  fill="white"
                >
                  {metric.value}%
                </text>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{metric.label}</h3>
            <p className="text-sm text-gray-400 mt-1">{metric.description}</p>
            <motion.div
              className={`mt-3 h-1 w-full rounded-full ${metric.color} opacity-50`}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;