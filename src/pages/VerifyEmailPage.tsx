// src/pages/VerifyEmailPage.tsx
import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, ArrowLeft, RotateCcw, Loader, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleNetwork from '../components/ParticleNetwork';

const VerifyEmailPage: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('Verifying your email...');
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0); // Initialize to 0 so resend is active immediately if no token or error
  const [resendError, setResendError] = useState(''); // Specific error for resend
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verificationToken = searchParams.get('token');
  const { isLoading: authLoading, /* login, */ } = useAuth(); // Assuming login is available for auto-login after verification. Removed login as it's not directly used for auto-login here.

  // Countdown timer for resend button
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isResending) {
      setIsResending(false); // Stop resending state when countdown finishes
    }
    return () => clearTimeout(timer);
  }, [countdown, isResending]);

  // Handle initial verification based on URL token
  useEffect(() => {
    const handleInitialVerification = async () => {
      if (verificationToken) {
        setVerificationMessage('Verifying your email...');
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';
        try {
          const response = await fetch(`${API_BASE_URL}/auth/verify-email?token=${verificationToken}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();

          if (response.ok) {
            setVerificationMessage(data.message || 'Email verified successfully!');
            setIsVerified(true);
            // Optional: Auto-login user or redirect to login.
            // For now, redirect to dashboard after a delay.
            setTimeout(() => {
              navigate('/dashboard'); // Or '/login' if you prefer they log in
            }, 3000);
          } else {
            setVerificationMessage(data.message || 'Email verification failed. Invalid or expired link.');
            setIsVerified(false); // Keep showing the unverified state with error
          }
        } catch (error) {
          console.error('Error during email verification:', error);
          setVerificationMessage('An error occurred during verification. Please try again.');
          setIsVerified(false);
        }
      } else {
        // No token in URL, prompt user to check email
        setVerificationMessage('Please check your email for a verification link to activate your account.');
        setIsVerified(false);
      }
    };

    handleInitialVerification();
  }, [verificationToken, navigate]);

  const handleResendEmail = async () => {
    // You would typically need the user's email to resend.
    // For this example, we assume you might have the email from localStorage
    // or you could prompt the user to re-enter it.
    // Replace "user@example.com" with actual logic to get the unverified email.
    const emailToResend = localStorage.getItem('unverifiedEmail') || 'user@example.com'; // Example
    setResendError('');
    setIsResending(true);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';
    try {
        const response = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailToResend }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to resend email.');
        }
        setVerificationMessage(data.message || 'New verification link sent to your email.');
        setCountdown(60); // Reset countdown
    } catch (error: any) {
        setResendError(error.message || 'Failed to resend email. Please try again later.');
    } finally {
        setIsResending(false);
    }
  };

  // If already verified, show success screen
  if (isVerified) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
        <ParticleNetwork />
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md w-full text-center animate-fade-in shadow-2xl">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6 animate-pulse" />
            <h1 className="text-2xl font-bold text-white mb-4">Email Verified!</h1>
            <p className="text-gray-300 mb-6">
              {verificationMessage}
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400 mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Otherwise, show the unverified email page
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <ParticleNetwork />
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md w-full animate-fade-in shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-indigo-500/20 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
              <Mail className="h-10 w-10 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
            <p className="text-gray-300">
              {verificationMessage}
            </p>
          </div>

          {/* Email sent to - Placeholder, ideally from user context or registration */}
          <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
            <p className="text-sm text-gray-400">Email possibly sent to:</p>
            <p className="text-white font-medium">user@example.com</p> {/* Replace with actual user email if available */}
          </div>

          {/* Actions */}
          <div className="space-y-4">
            {/* This button can be for users who click the link outside and then come back */}
            <button
              onClick={() => { navigate('/dashboard'); }} // Assume dashboard if they think they're verified
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Go to Dashboard (if verified)
            </button>

            {resendError && (
                <div className="flex items-center space-x-2 text-red-400 justify-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-center">{resendError}</span>
                </div>
            )}

            <button
              onClick={handleResendEmail}
              disabled={isResending || countdown > 0}
              className="w-full bg-white/10 backdrop-blur-sm text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
            >
              {isResending || authLoading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : countdown > 0 ? (
                <span>Resend in {countdown}s</span>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4" />
                  <span>Resend Email</span>
                </>
              )}
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Help text */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-gray-400 text-sm">
              Didn't receive the email? Check your spam folder or contact{' '}
              <a href="/support" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                support
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyEmailPage;