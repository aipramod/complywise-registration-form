import React from 'react';
import RegistrationForm from './components/RegistrationForm';

// Create a simple Particles component
const Particles = () => {
  // Define 20 particles with random positions and animations
  const particles = Array.from({ length: 20 }).map((_, index) => {
    const size = Math.floor(Math.random() * 4) + 2; // Random size between 2-6px
    const top = `${Math.random() * 100}%`;
    const left = `${Math.random() * 100}%`;
    const animationDuration = `${Math.random() * 20 + 15}s`; // Random duration
    const animationDelay = `${Math.random() * 10}s`; // Random delay
    
    return (
      <div
        key={index}
        className="absolute rounded-full bg-white opacity-30"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top,
          left,
          animation: `float ${animationDuration} ease-in-out infinite`,
          animationDelay,
        }}
      />
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles}
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center p-4 animate-gradient-x relative">
      {/* Grid background */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full grid-bg opacity-20"></div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pulse-glow"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pulse-glow"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 pulse-glow"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-60 h-60 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      <Particles />
      <RegistrationForm />
    </div>
  );
}

export default App; 