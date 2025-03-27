import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PasswordStrengthMeter = ({ password }) => {
  const [strength, setStrength] = useState(0);
  const [label, setLabel] = useState('Weak');
  const [color, setColor] = useState('bg-red-500');
  const [textColor, setTextColor] = useState('text-red-400');
  
  useEffect(() => {
    if (!password) {
      setStrength(0);
      setLabel('Weak');
      setColor('bg-red-500');
      setTextColor('text-red-400');
      return;
    }

    // Calculate password strength
    let currentStrength = 0;
    
    // Check length
    if (password.length >= 8) currentStrength += 1;
    
    // Check for mixed case
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) currentStrength += 1;
    
    // Check for numbers
    if (password.match(/\d/)) currentStrength += 1;
    
    // Check for special characters
    if (password.match(/[^a-zA-Z\d]/)) currentStrength += 1;
    
    // Update state based on strength
    setStrength(currentStrength);
    
    switch (currentStrength) {
      case 0:
        setLabel('Weak');
        setColor('bg-red-500');
        setTextColor('text-red-400');
        break;
      case 1:
        setLabel('Fair');
        setColor('bg-orange-500');
        setTextColor('text-orange-400');
        break;
      case 2:
        setLabel('Good');
        setColor('bg-yellow-500');
        setTextColor('text-yellow-400');
        break;
      case 3:
        setLabel('Strong');
        setColor('bg-blue-500');
        setTextColor('text-blue-400');
        break;
      case 4:
        setLabel('Very Strong');
        setColor('bg-green-500');
        setTextColor('text-green-400');
        break;
      default:
        setLabel('Weak');
        setColor('bg-red-500');
        setTextColor('text-red-400');
    }
  }, [password]);

  const getWidth = () => {
    switch (strength) {
      case 0: return '10%';
      case 1: return '25%';
      case 2: return '50%';
      case 3: return '75%';
      case 4: return '100%';
      default: return '10%';
    }
  };

  // Password criteria list
  const criteria = [
    { label: 'At least 8 characters', met: password?.length >= 8 },
    { label: 'Uppercase & lowercase letters', met: password?.match(/[a-z]/) && password?.match(/[A-Z]/) },
    { label: 'At least one number', met: password?.match(/\d/) },
    { label: 'At least one special character', met: password?.match(/[^a-zA-Z\d]/) }
  ];

  return (
    <div className="mt-2 space-y-3" style={{ marginTop: '1.5rem', marginBottom: '3rem', display: 'block' }}>
      <div className="flex mb-1">
        <span className="text-xs text-gray-300">Password Strength:</span>
        <span className={`text-xs ml-auto ${textColor}`} id="passwordStrength">{label}</span>
      </div>
      <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color} transition-all duration-300`} 
          animate={{ width: getWidth() }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />
      </div>
      
      {/* Password criteria checklist */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        {criteria.map((item, index) => (
          <div key={index} className="flex items-center text-xs">
            <motion.div
              animate={{ scale: item.met ? 1 : 0.8, opacity: item.met ? 1 : 0.6 }}
              className={`w-3 h-3 rounded-full mr-2 ${item.met ? 'bg-green-400' : 'bg-gray-600'}`}
            />
            <span className={item.met ? 'text-gray-200' : 'text-gray-400'}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter; 