import React from 'react';
import { motion } from 'framer-motion';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step Circle */}
          <div className="relative">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                index < currentStep
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500'
                  : index === currentStep
                  ? 'bg-white/20 border-2 border-indigo-400'
                  : 'bg-gray-700'
              }`}
              animate={{
                scale: index === currentStep ? 1.1 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              {index < currentStep ? (
                <motion.svg
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              ) : (
                <span className="text-xs font-medium text-white">
                  {index + 1}
                </span>
              )}
            </motion.div>
            
            {/* Step Label */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-max">
              <span className={`text-xs ${
                index <= currentStep ? 'text-indigo-200' : 'text-gray-500'
              }`}>
                {step}
              </span>
            </div>
          </div>

          {/* Connector Line (except for last item) */}
          {index < steps.length - 1 && (
            <div className="relative flex-grow mx-2 my-3.5">
              <div className="h-0.5 bg-gray-700 absolute w-full"></div>
              <motion.div
                className="h-0.5 bg-indigo-500 absolute"
                initial={{ width: index < currentStep ? '100%' : '0%' }}
                animate={{ width: index < currentStep ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator; 