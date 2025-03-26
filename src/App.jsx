import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import RegistrationForm from './components/RegistrationForm';

// CSS for Tailwind
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 animate-gradient-x flex items-center justify-center p-4 md:p-8">
      {/* Left Section (Hidden on Mobile) */}
      <div className="hidden lg:block lg:w-1/2 p-12">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <motion.div
              className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
            >
              <FaShieldAlt className="text-4xl text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">ComplyWise</h1>
          <p className="text-xl text-gray-300 mb-8">
            Your complete compliance management solution for modern businesses.
          </p>

          <div className="space-y-6 text-left bg-white/5 backdrop-blur-md p-6 rounded-xl">
            <motion.div
              className="flex items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex-shrink-0 mt-1">
                <FaCheckCircle className="text-purple-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">
                  Streamlined Compliance
                </h3>
                <p className="text-gray-300">
                  Manage all your regulatory requirements in one place
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex-shrink-0 mt-1">
                <FaCheckCircle className="text-purple-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">
                  Real-time Updates
                </h3>
                <p className="text-gray-300">
                  Stay current with regulatory changes as they happen
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex-shrink-0 mt-1">
                <FaCheckCircle className="text-purple-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">
                  Risk Management
                </h3>
                <p className="text-gray-300">
                  Identify and mitigate compliance risks before they become issues
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <RegistrationForm />
    </div>
  );
};

export default App; 