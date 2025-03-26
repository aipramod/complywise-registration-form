# ComplyWise React Registration Form

A modern, multi-step registration form built with React, featuring enhanced error handling, animations, and accessibility features.

## Features

### 1. Component-Based Structure
- Reusable form components (FormInput, CustomCheckbox, etc.)
- Clean separation of concerns with specialized components
- Modular design for easy maintenance and extension

### 2. Advanced Form Handling
- Form state management with React Hook Form
- Schema-based validation with Yup
- Step-by-step validation with field-specific error messages

### 3. Enhanced User Experience
- Animated transitions between form steps
- Interactive password strength meter with real-time feedback
- Animated error messages with improved visibility
- Smooth micro-interactions and hover effects

### 4. Accessibility Improvements
- Proper form labeling and ARIA attributes
- Keyboard navigation support
- Clear error states with descriptive messages
- Visual feedback for all interactions

### 5. Modern Design
- Responsive layout for all devices
- Glass morphism effects with backdrop blur
- Gradient animations and subtle motion
- Consistent color scheme and typography

## Technologies Used

- React
- React Hook Form
- Yup validation
- Framer Motion for animations
- TailwindCSS for styling
- React Icons

## Why This Approach Is Better

### 1. Better Code Organization
- Component-based architecture allows for reusable UI elements
- Clear separation of validation logic from UI components
- Easier to test individual components

### 2. Improved Error Handling
- Contextual error messages that appear next to the relevant field
- Animated error states with better visibility
- Form-wide validation rules that can reference multiple fields

### 3. Enhanced User Experience
- Real-time validation feedback as users type
- Step-by-step form completion with validation at each step
- Animated transitions that guide users through the process

### 4. More Robust Validation
- Schema-based validation ensures consistency
- Custom validation rules for complex scenarios
- Cross-field validation (e.g., password confirmation)

### 5. Better Accessibility
- Proper semantic markup and ARIA attributes
- Keyboard navigation support
- Screen reader announcements for error states

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Project Structure

```
src/
├── components/
│   ├── CustomCheckbox.jsx
│   ├── FormInput.jsx
│   ├── PasswordStrengthMeter.jsx
│   ├── RegistrationForm.jsx
│   └── StepIndicator.jsx
├── App.jsx
├── index.css
└── index.js
``` 