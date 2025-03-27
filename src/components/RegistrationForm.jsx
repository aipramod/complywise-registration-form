import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaIndustry, FaUsers, FaExclamationCircle } from 'react-icons/fa';

// Component imports
import FormInput from './FormInput';
import CustomCheckbox from './CustomCheckbox';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import StepIndicator from './StepIndicator';

// Step names
const steps = ['Account Info', 'Company Details', 'Review'];

// Form validation schemas for each step
const schema1 = yup.object().shape({
  fullName: yup.string().required('Please enter your full name'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
});

const schema2 = yup.object().shape({
  companyName: yup.string().required('Please enter your company name'),
  industry: yup.string().required('Please select your industry'),
  companySize: yup.string().required('Please select your company size'),
});

const schema3 = yup.object().shape({
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms to continue')
    .required(),
});

// Combined schema based on current step
const getSchema = (step) => {
  switch (step) {
    case 0:
      return schema1;
    case 1:
      return schema1.concat(schema2);
    case 2:
      return schema1.concat(schema2).concat(schema3);
    default:
      return schema1;
  }
};

// Animation variants
const fadeVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize form with React Hook Form
  const methods = useForm({
    resolver: yupResolver(getSchema(currentStep)),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isValid },
  } = methods;

  // Get password value for strength meter
  const password = watch('password');

  // Handle step navigation
  const goToNextStep = async () => {
    const isStepValid = await trigger();
    
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    setShowSuccess(true);
  };

  // Industry options
  const industries = [
    { value: '', label: 'Select Industry', disabled: true },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'technology', label: 'Technology' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail' },
    { value: 'other', label: 'Other' },
  ];

  // Company size options
  const companySizes = [
    { value: '', label: 'Company Size', disabled: true },
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501+', label: '501+ employees' },
  ];

  return (
    <div className="w-full lg:w-1/2 max-w-md mx-auto animate-float">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-300">
            Join thousands of companies managing compliance with ease
          </p>
        </div>

        {/* Step Indicator */}
        {!showSuccess && <StepIndicator steps={steps} currentStep={currentStep} />}

        {/* Form Provider */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {showSuccess ? (
                /* Success Message */
                <motion.div
                  key="success"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeVariants}
                  transition={{ duration: 0.3 }}
                  className="text-center py-8"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 260,
                          damping: 20,
                          delay: 0.1,
                        }}
                        className="w-8 h-8 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </div>
                  </div>
                  <h3 className="text-2xl text-white font-bold mb-2">
                    Registration Successful!
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Thank you for creating an account with ComplyWise.
                  </p>
                  <p className="text-gray-300 mb-8">
                    We've sent a verification email to your inbox. Please verify
                    your email to continue.
                  </p>
                  <a
                    href="/"
                    className="inline-block py-4 px-8 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
                    text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Go to Login
                  </a>
                </motion.div>
              ) : currentStep === 0 ? (
                /* Step 1: Account Information */
                <motion.div
                  key="step1"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                  style={{ marginBottom: '2rem' }}
                >
                  <FormInput
                    name="fullName"
                    label="Full Name"
                    icon={FaUser}
                    validation={{
                      required: 'Please enter your full name',
                    }}
                  />

                  <FormInput
                    name="email"
                    label="Email Address"
                    type="email"
                    icon={FaEnvelope}
                    validation={{
                      required: 'Please enter your email',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address',
                      },
                    }}
                  />

                  <FormInput
                    name="password"
                    label="Create Password"
                    type="password"
                    icon={FaLock}
                    validation={{
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    }}
                  />

                  {/* Password Strength Meter */}
                  <PasswordStrengthMeter password={password} />

                  {/* Next Button */}
                  <motion.button
                    type="button"
                    onClick={goToNextStep}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
                      text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                      focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    whileTap={{ scale: 0.98 }}
                  >
                    Next Step
                  </motion.button>
                </motion.div>
              ) : currentStep === 1 ? (
                /* Step 2: Company Details */
                <motion.div
                  key="step2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                  style={{ marginBottom: '2rem' }}
                >
                  <FormInput
                    name="companyName"
                    label="Company Name"
                    icon={FaBuilding}
                    validation={{
                      required: 'Please enter your company name',
                    }}
                  />

                  {/* Industry Dropdown */}
                  <div className="relative mb-8">
                    <div className={`relative ${errors.industry ? 'error' : ''}`}>
                      <select
                        {...methods.register('industry', {
                          required: 'Please select your industry',
                        })}
                        className={`w-full h-14 px-4 text-white bg-white/5 rounded-lg border outline-none transition-all appearance-none
                          ${
                            errors.industry
                              ? 'border-red-400 focus:border-red-500'
                              : 'border-gray-600/50 focus:border-purple-500/50'
                          }
                          focus:bg-white/10`}
                      >
                        {industries.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <label
                        className={`absolute top-4 left-4 flex items-center gap-2 ${
                          errors.industry ? 'text-red-300' : 'text-indigo-100'
                        }`}
                      >
                        <FaIndustry className="text-sm input-icon" />
                        <span className="font-medium">Industry</span>
                      </label>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <div className="text-purple-300">▼</div>
                      </div>

                      <AnimatePresence>
                        {errors.industry && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="error-message"
                          >
                            <FaExclamationCircle className="mr-1 inline" />
                            {errors.industry?.message}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Company Size Dropdown */}
                  <div className="relative mb-8">
                    <div className={`relative ${errors.companySize ? 'error' : ''}`}>
                      <select
                        {...methods.register('companySize', {
                          required: 'Please select your company size',
                        })}
                        className={`w-full h-14 px-4 text-white bg-white/5 rounded-lg border outline-none transition-all appearance-none
                          ${
                            errors.companySize
                              ? 'border-red-400 focus:border-red-500'
                              : 'border-gray-600/50 focus:border-purple-500/50'
                          }
                          focus:bg-white/10`}
                      >
                        {companySizes.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <label
                        className={`absolute top-4 left-4 flex items-center gap-2 ${
                          errors.companySize ? 'text-red-300' : 'text-indigo-100'
                        }`}
                      >
                        <FaUsers className="text-sm input-icon" />
                        <span className="font-medium">Company Size</span>
                      </label>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <div className="text-purple-300">▼</div>
                      </div>

                      <AnimatePresence>
                        {errors.companySize && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="error-message"
                          >
                            <FaExclamationCircle className="mr-1 inline" />
                            {errors.companySize?.message}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 mt-6">
                    <motion.button
                      type="button"
                      onClick={goToPrevStep}
                      className="w-1/2 py-4 bg-gray-700 hover:bg-gray-600
                        text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                      whileTap={{ scale: 0.98 }}
                    >
                      Previous
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={goToNextStep}
                      className="w-1/2 py-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
                        text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                        focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      whileTap={{ scale: 0.98 }}
                    >
                      Next Step
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                /* Step 3: Review & Submit */
                <motion.div
                  key="step3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                  style={{ marginBottom: '2rem' }}
                >
                  <div className="p-4 rounded-lg bg-white/5 space-y-3">
                    <h3 className="text-white font-medium">Account Details</h3>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Full Name:</span>
                      <span className="text-white">{watch('fullName')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Email:</span>
                      <span className="text-white">{watch('email')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Company:</span>
                      <span className="text-white">{watch('companyName')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Industry:</span>
                      <span className="text-white">
                        {industries.find((i) => i.value === watch('industry'))?.label || 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Company Size:</span>
                      <span className="text-white">
                        {companySizes.find((s) => s.value === watch('companySize'))?.label || 'Not specified'}
                      </span>
                    </div>
                  </div>

                  {/* Terms & Privacy Checkbox */}
                  <CustomCheckbox
                    name="termsAccepted"
                    validation={{
                      required: 'You must accept the terms to continue',
                    }}
                  >
                    I agree to the{' '}
                    <a href="#" className="text-purple-400 hover:text-purple-300">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-purple-400 hover:text-purple-300">
                      Privacy Policy
                    </a>
                  </CustomCheckbox>

                  {/* Newsletter Checkbox */}
                  <CustomCheckbox name="newsletterSubscription">
                    Send me updates about compliance news and product features
                  </CustomCheckbox>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 mt-6">
                    <motion.button
                      type="button"
                      onClick={goToPrevStep}
                      className="w-1/2 py-4 bg-gray-700 hover:bg-gray-600
                        text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                      whileTap={{ scale: 0.98 }}
                    >
                      Previous
                    </motion.button>
                    <motion.button
                      type="submit"
                      className={`w-1/2 py-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
                        text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                        focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800
                        ${!isValid && 'opacity-70 cursor-not-allowed'}`}
                      whileTap={{ scale: isValid ? 0.98 : 1 }}
                      disabled={!isValid}
                    >
                      Complete Registration
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </FormProvider>

        {/* Login Link */}
        {!showSuccess && (
          <div className="text-center text-gray-300 mt-8">
            Already have an account?{' '}
            <a href="/" className="text-purple-400 hover:text-purple-300 font-medium">
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm; 