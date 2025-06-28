'use client';

import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Mathematics',
      data: [65, 72, 78, 75, 82, 85],
      borderColor: 'rgb(99, 102, 241)',
      tension: 0.4,
    },
    {
      label: 'Science',
      data: [70, 75, 72, 80, 85, 88],
      borderColor: 'rgb(34, 197, 94)',
      tension: 0.4,
    },
    {
      label: 'English',
      data: [80, 82, 85, 82, 88, 90],
      borderColor: 'rgb(249, 115, 22)',
      tension: 0.4,
    },
  ],
};

const attendanceData = {
  labels: ['Present', 'Absent', 'Late'],
  datasets: [
    {
      data: [85, 10, 5],
      backgroundColor: [
        'rgb(34, 197, 94)',
        'rgb(239, 68, 68)',
        'rgb(234, 179, 8)',
      ],
    },
  ],
};

export default function StudentAnalytics() {
  return (
    <div className="space-y-8">
      {/* Performance Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-xl font-bold mb-6">Performance Trends</h2>
        <div className="h-80">
          <Line
            data={performanceData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }}
          />
        </div>
      </motion.div>

      {/* Attendance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-xl font-bold mb-6">Attendance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64">
            <Doughnut
              data={attendanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
              }}
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <span className="text-green-700">Present</span>
              <span className="font-bold text-green-700">85%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <span className="text-red-700">Absent</span>
              <span className="font-bold text-red-700">10%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <span className="text-yellow-700">Late</span>
              <span className="font-bold text-yellow-700">5%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-lg font-semibold mb-2">Average Grade</h3>
          <div className="text-3xl font-bold text-indigo-600">A-</div>
          <p className="text-gray-500 text-sm mt-2">Top 15% of class</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-lg font-semibold mb-2">Study Hours</h3>
          <div className="text-3xl font-bold text-green-600">156</div>
          <p className="text-gray-500 text-sm mt-2">This semester</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-lg font-semibold mb-2">Assignments</h3>
          <div className="text-3xl font-bold text-orange-600">45/48</div>
          <p className="text-gray-500 text-sm mt-2">Completed</p>
        </motion.div>
      </div>
    </div>
  );
} 