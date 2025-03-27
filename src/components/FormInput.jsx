import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { FaExclamationCircle } from 'react-icons/fa';

const FormInput = ({
  name,
  label,
  type = 'text',
  icon: Icon,
  placeholder,
  validation,
  autoComplete = 'off',
}) => {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();

  // Check if this field has an error and has been touched
  const hasError = !!errors[name];
  const isTouched = !!touchedFields[name];

  return (
    <div className="relative mb-8" style={{ marginBottom: '4rem' }}>
      <div className={`relative floating-input ${hasError ? 'error' : ''}`}>
        <input
          {...register(name, validation)}
          type={type}
          id={name}
          className={`w-full h-14 px-4 text-white bg-white/5 rounded-lg border outline-none transition-all duration-200
            ${
              hasError
                ? 'border-red-400 focus:border-red-500'
                : 'border-gray-600/50 focus:border-purple-500/50'
            }
            focus:bg-white/10`}
          placeholder={placeholder || label}
          autoComplete={autoComplete}
        />
        <label
          htmlFor={name}
          className={`flex items-center gap-2 ${
            hasError ? 'text-red-300' : 'text-indigo-100'
          }`}
        >
          {Icon && <Icon className="text-sm input-icon" />}
          <span className="font-medium">{label}</span>
        </label>

        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="error-message"
              style={{ bottom: '-2.5rem' }}
            >
              <FaExclamationCircle className="mr-1 inline" />
              {errors[name]?.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FormInput; 