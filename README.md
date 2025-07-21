# C++ Hub - Educational Platform

A modern, interactive educational platform built with React, TypeScript, and Tailwind CSS featuring 3D elements and AI-powered learning experiences.

## Features

- 🎨 Modern UI with glass morphism design
- 🌟 Interactive 3D elements using Spline
- 🤖 AI tutor widget (COSMOS)
- 📱 Responsive design for all devices
- 🎯 Course management system
- 💳 Pricing plans and subscription management
- 🏆 Achievement and progress tracking
- 📊 Analytics dashboard
- 🔐 Authentication system (requires backend implementation)

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **3D Graphics**: Spline, @splinetool/react-spline
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Styling**: PostCSS, Autoprefixer

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cpp-hub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Authentication Setup

⚠️ **Important**: This project currently has placeholder authentication functions. To enable real user authentication, you need to:

1. **Set up a backend service** (e.g., Node.js with Express, Python with FastAPI, etc.)
2. **Implement authentication endpoints** for login, register, and logout
3. **Update the AuthContext** in `src/context/AuthContext.tsx` to connect to your backend
4. **Add proper error handling** and validation

### Example Backend Integration

```typescript
// In src/context/AuthContext.tsx
const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) throw new Error('Login failed');
    
    const data = await response.json();
    setUser(data.user);
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthModal.tsx   # Authentication modal
│   ├── Hero.tsx        # Landing page hero section
│   ├── Navbar.tsx      # Navigation component
│   ├── TutorWidget.tsx # AI tutor chat widget
│   └── ...
├── context/            # React context providers
│   └── AuthContext.tsx # Authentication state management
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── DashboardPage.tsx # User dashboard
│   └── ...
├── assets/             # Static assets
└── styles/             # CSS and styling files
```

## Key Components

### AuthModal
Interactive authentication modal with:
- Login/Register forms
- Plan selection for registration
- Avatar selection
- Form validation
- Glass morphism design

### TutorWidget (COSMOS AI)
AI-powered learning assistant featuring:
- Interactive chat interface
- Animated AI avatar
- Quick suggestion buttons
- C++ programming focus
- Real-time responses

### Hero Section
Landing page hero with:
- Animated background elements
- Interactive statistics
- Call-to-action buttons
- Responsive design

## Customization

### Styling
- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for theme customization
- Component-specific styles are in individual component files

### 3D Elements
- Spline scenes are embedded via URLs
- Replace scene URLs in components to use custom 3D models
- Optimize 3D assets for web performance

### Content
- Update course data in `src/components/Courses.tsx`
- Modify pricing plans in `src/components/PricingSection.tsx`
- Customize testimonials in `src/components/Testimonials.tsx`

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify, Vercel, or similar platforms

The built files will be in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Note**: This is a frontend-only implementation. Backend services for authentication, course management, and user data persistence need to be implemented separately.