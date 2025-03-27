# ComplyWise Registration Form

A modern multi-step registration form built with React, Tailwind CSS, and Framer Motion.

![ComplyWise Registration Form](https://github.com/your-username/complywise-registration/raw/main/screenshots/preview.png)

## Features

- ✅ Multi-step form with validation
- ✅ Modern UI with glassmorphism effects
- ✅ Animated transitions between steps
- ✅ Password strength meter with real-time feedback
- ✅ Responsive design that works on all devices
- ✅ Form validation with Yup and React Hook Form
- ✅ Custom checkbox and input components
- ✅ Interactive step indicator

## Technologies Used

- React
- Tailwind CSS for styling
- Framer Motion for animations
- React Hook Form for form management
- Yup for validation schema
- React Icons for UI icons

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/complywise-registration.git
   cd complywise-registration
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

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
├── App.css
├── index.css
└── index.js
```

## How It Works

The registration form is split into 3 main steps:

1. **Account Information**
   - Full Name
   - Email
   - Password (with strength validation)

2. **Company Details**
   - Company Name
   - Industry
   - Company Size

3. **Review & Submit**
   - Review all information
   - Accept terms and conditions
   - Submit registration

Each step includes validation that must be passed before proceeding to the next step.

## Customization

You can customize the form by modifying the following:

- **Colors**: Edit the gradient colors in `App.jsx` and component styles
- **Validation Rules**: Modify the Yup schemas in `RegistrationForm.jsx`
- **Form Fields**: Add or remove fields in each step of the form
- **Animations**: Adjust animation parameters in Framer Motion components

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern SaaS applications
- React and Tailwind CSS communities for excellent documentation
