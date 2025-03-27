import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationCircle, FaCheck } from 'react-icons/fa';

const CustomCheckbox = ({ name, label, validation, children }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const hasError = !!errors[name];
  const isChecked = watch(name);

  return (
    <div className="mt-4">
      <label className="custom-checkbox text-gray-300 flex items-start">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id={name}
            {...register(name, validation)}
            className="absolute opacity-0 w-0 h-0"
          />
          <div
            className={`inline-block w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${
              isChecked
                ? 'bg-gradient-to-r from-purple-600 to-blue-500 border-transparent'
                : 'bg-white/10 border-purple-300'
            }`}
          >
            <AnimatePresence>
              {isChecked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaCheck className="text-white text-xs" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex-1">{children || label}</div>
      </label>
      
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-white text-sm mt-2 bg-red-400/50 p-2 rounded-md"
          >
            <FaExclamationCircle className="mr-1 inline" style={{ color: '#ffeded' }} />
            {errors[name]?.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCheckbox; 