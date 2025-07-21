// src/pages/AccountSettingsPage.tsx
import React, { useState } from 'react';
import { Mail, Loader, CheckCircle, AlertCircle, User, Lock, Settings, CreditCard, Bell, ChevronDown, Crown, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleNetwork from '../components/ParticleNetwork';

const AccountSettingsPage: React.FC = () => {
  const { user, isLoading, requestEmailChange } = useAuth();
  const [newEmail, setNewEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  // Example state for changing password (API call needs to be implemented in AuthContext)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

  const handleEmailChangeRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMessage('');
    setEmailError('');

    if (!newEmail || !/\S+@\S+\.\S+/.test(newEmail)) {
      setEmailError('Please enter a valid new email address.');
      return;
    }
    if (user && newEmail === user.email) {
      setEmailError('New email cannot be the same as your current email.');
      return;
    }

    try {
      await requestEmailChange(newEmail);
      setEmailMessage(`A verification link has been sent to ${newEmail}. Please check your inbox to complete the change.`);
      setNewEmail(''); // Clear input
    } catch (err: any) {
      setEmailError(err.message || 'Failed to send email change request.');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage('');
    setPasswordError('');

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError('All password fields are required.');
      return;
    }
    if (newPassword.length < 8) { // Assuming API requires minimum 8 characters
      setPasswordError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (currentPassword === newPassword) {
      setPasswordError('New password cannot be the same as the current password.');
      return;
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found. Please log in.');

        const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update password.');
        }
        setPasswordMessage(data.message);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    } catch (err: any) {
        setPasswordError(err.message || 'Failed to update password. Please try again.');
    }
  };


  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <ParticleNetwork />
      <Navbar />
      <div className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12 relative z-10">
        <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>

        {/* Change Email Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Mail className="h-6 w-6 text-indigo-400" />
            <span>Change Email Address</span>
          </h2>
          <p className="text-gray-300 mb-4">
            Your current email: <span className="font-semibold text-white">{user?.email || 'N/A'}</span>
          </p>
          <form onSubmit={handleEmailChangeRequest} className="space-y-4">
            <div>
              <label htmlFor="newEmail" className="block text-sm font-bold text-gray-300 mb-2">
                New Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors duration-200" />
                <input
                  type="email"
                  id="newEmail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300"
                  placeholder="Enter your new email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {emailMessage && (
              <div className="flex items-center space-x-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <CheckCircle className="h-5 w-5" />
                <span>{emailMessage}</span>
              </div>
            )}
            {emailError && (
              <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <AlertCircle className="h-5 w-5" />
                <span>{emailError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Sending Request...</span>
                </>
              ) : (
                <span>Request Email Change</span>
              )}
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Lock className="h-6 w-6 text-cyan-400" />
            <span>Change Password</span>
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-bold text-gray-300 mb-2">
                Current Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-200" />
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                  placeholder="Enter current password"
                  required
                  autoComplete="current-password"
                />
                 <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 p-1"
                  >
                    {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-bold text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-200" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                  placeholder="Enter new password"
                  required
                  autoComplete="new-password"
                />
                 <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 p-1"
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-bold text-gray-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-200" />
                <input
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                  placeholder="Confirm new password"
                  required
                  autoComplete="new-password"
                />
                 <button
                    type="button"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 p-1"
                  >
                    {showConfirmNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
              </div>
            </div>

            {passwordMessage && (
              <div className="flex items-center space-x-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <CheckCircle className="h-5 w-5" />
                <span>{passwordMessage}</span>
              </div>
            )}
            {passwordError && (
              <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <AlertCircle className="h-5 w-5" />
                <span>{passwordError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </form>
        </div>


      </div>
      <Footer />
    </div>
  );
};

export default AccountSettingsPage;