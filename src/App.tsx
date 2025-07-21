// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import SupportPage from './pages/SupportPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';   // New: For initiating password reset
import ResetPasswordPage from './pages/ResetPasswordPage';     // New: For setting new password after reset link
import AccountSettingsPage from './pages/AccountSettingsPage'; // New: For changing email and other user settings
import LoginRedirectPage from './pages/LoginRedirectPage';     // New: Optional page to handle direct /login access

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/settings" element={<AccountSettingsPage />} /> {/* Route for account settings */}
            <Route path="/login" element={<LoginRedirectPage />} /> {/* Route to handle direct /login access, opens AuthModal */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;