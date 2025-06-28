'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormState, useFormStatus } from 'react-dom';
import {
  HeartIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  CalendarIcon,
  BellIcon,
  CogIcon,
  ArrowTrendingUpIcon,
  ExclamationCircleIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import ProgressTracker from '@/components/ProgressTracker';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  trend?: number;
  color: string;
}

interface ProgressBarProps {
  value: number;
  color: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  const StatCard = ({ icon: Icon, title, value, trend, color }: StatCardProps) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon className="h-8 w-8 text-gray-600 mr-3" />
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
        {trend && (
          <div className="flex items-center text-green-500">
            <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">{trend}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );

  const ProgressBar = ({ value, color }: ProgressBarProps) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">MAA Healthcare Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <BellIcon className="h-6 w-6 text-gray-600" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <Link href="/settings">
                <CogIcon className="h-6 w-6 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Priya!</h2>
          <p className="text-gray-600">Here's your health overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={HeartIcon}
            title="Health Score"
            value="92%"
            trend={5}
            color="border-red-500"
          />
          <StatCard
            icon={CalendarIcon}
            title="Next Appointment"
            value="2 Days"
            color="border-blue-500"
          />
          <StatCard
            icon={ChartBarIcon}
            title="Weekly Progress"
            value="85%"
            trend={12}
            color="border-green-500"
          />
          <StatCard
            icon={ClockIcon}
            title="Medication Adherence"
            value="98%"
            trend={3}
            color="border-purple-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress Tracker */}
          <div className="lg:col-span-2">
            <ProgressTracker />
          </div>

          {/* Right Column - Quick Actions & Alerts */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <DevicePhoneMobileIcon className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-indigo-700">Schedule Consultation</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <ChartBarIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-green-700">Log Health Data</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <HeartIcon className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-purple-700">View Care Plan</span>
                </motion.button>
              </div>
            </div>

            {/* Health Alerts */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Health Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
                  <ExclamationCircleIcon className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Medication Reminder</p>
                    <p className="text-xs text-yellow-600">Take your prenatal vitamins</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                  <CalendarIcon className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Upcoming Checkup</p>
                    <p className="text-xs text-blue-600">Dr. Sharma - Jan 25, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 bg-green-50 rounded-lg">
                  <ShieldCheckIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Health Milestone</p>
                    <p className="text-xs text-green-600">Week 20 - Anatomy scan due</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Blood pressure logged</span>
                  </div>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Consultation completed</span>
                  </div>
                  <span className="text-xs text-gray-500">1d ago</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Care plan updated</span>
                  </div>
                  <span className="text-xs text-gray-500">3d ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Child Health Monitoring Section */}
        <div className="mt-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Child Health Monitoring</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Early Diagnosis</h4>
                <p className="text-sm text-gray-600 mb-3">AI-powered screening for common childhood conditions</p>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                  Schedule Screening →
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Growth Tracking</h4>
                <p className="text-sm text-gray-600 mb-3">Monitor your child's development milestones</p>
                <button className="text-green-600 text-sm font-medium hover:text-green-800">
                  View Progress →
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Vaccination Schedule</h4>
                <p className="text-sm text-gray-600 mb-3">Stay up-to-date with immunizations</p>
                <button className="text-purple-600 text-sm font-medium hover:text-purple-800">
                  Check Schedule →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? 'Signing in...' : 'Sign in'}
    </button>
  );
}