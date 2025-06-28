'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  BookOpenIcon,
  UserGroupIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: HomeIcon },
  { name: 'Courses', href: '/dashboard/courses', icon: BookOpenIcon },
  { name: 'Teachers', href: '/dashboard/teachers', icon: UserGroupIcon },
  { name: 'Schedule', href: '/dashboard/schedule', icon: CalendarIcon },
  { name: 'Messages', href: '/dashboard/messages', icon: ChatBubbleLeftIcon },
  { name: 'Grades', href: '/dashboard/grades', icon: AcademicCapIcon },
  { name: 'Progress', href: '/dashboard/progress', icon: ChartBarIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav
      className={`bg-white shadow-sm transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-indigo-600">ShikshaMitra</span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isCollapsed
                    ? 'M13 5l7 7-7 7M5 5l7 7-7 7'
                    : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'
                }
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-6 h-6" />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <UserGroupIcon className="w-6 h-6 text-indigo-600" />
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium text-gray-700">Student Portal</p>
                <p className="text-xs text-gray-500">Grade 10</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 