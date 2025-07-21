import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader, Sparkles, Shield, Crown, Camera, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
// No direct import of useNavigate needed here as AuthContext handles navigation after successful auth

interface AuthModalProps {
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('premium');
  const [selectedAvatar, setSelectedAvatar] = useState<number>(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, register, isLoading } = useAuth();

  const plans = [
    {
      id: 'free',
      name: 'Free Explorer',
      icon: User,
      price: '$0',
      features: ['5 Free Courses', 'Basic Support', 'Community Access'],
      color: 'from-gray-500 to-gray-600',
      bgColor: 'from-gray-500/10 to-gray-600/10'
    },
    {
      id: 'premium',
      name: 'Premium Coder',
      icon: Crown,
      price: '$29/mo',
      features: ['Unlimited Courses', 'AI Tutor COSMOS', 'Priority Support', 'Certificates', 'Advanced Projects'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10',
      popular: true
    }
  ];

  const avatarOptions = [
    'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) { // Updated to 8 characters as per backend Joi schema
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, formData.name);
      }
      onClose(); // Close modal on successful login/registration, AuthContext handles navigation
    } catch (error: any) { // Catching 'any' for simpler error handling of message property
      setErrors({ submit: error.message || 'Authentication failed. Please try again.' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ email: '', password: '', name: '' });
    setSelectedAvatar(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Floating particles - only show when modal is open */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Beautiful Modal */}
      <div className="relative glass-morphism rounded-3xl border border-white/20 w-full max-w-md p-8 shadow-2xl animate-fade-in overflow-hidden">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-green-500/15 blur-xl -z-10"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-all duration-200 p-2 hover:bg-white/10 rounded-full z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-xl">
            {isLogin ? (
              <Shield className="h-8 w-8 text-white" />
            ) : (
              <Crown className="h-8 w-8 text-white" />
            )}
          </div>
          <h2 className="text-3xl font-black text-white mb-3">
            {isLogin ? 'Welcome Back!' : 'Join C++ Hub'}
          </h2>
          <p className="text-gray-300 text-lg">
            {isLogin ? 'Continue your coding journey' : 'Start your programming adventure'}
          </p>
        </div>

        {/* Plan Selection for Registration */}
        {!isLogin && (
          <div className="mb-8">
            <h3 className="text-white font-bold text-lg mb-4 text-center">Choose Your Plan</h3>
            <div className="grid grid-cols-2 gap-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button" // Important: Prevent form submission
                  onClick={() => setSelectedPlan(plan.id as 'free' | 'premium')}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'border-blue-400 bg-blue-500/20 scale-105'
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${plan.color} mb-2`}>
                      <plan.icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-white font-bold">{plan.name}</h4>
                    <p className="text-gray-300 font-semibold text-sm">{plan.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Avatar Selection for Registration */}
        {!isLogin && (
          <div className="mb-8">
            <h3 className="text-white font-bold text-lg mb-4 text-center flex items-center justify-center space-x-2">
              <Camera className="h-5 w-5" />
              <span>Choose Your Avatar</span>
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {avatarOptions.map((avatar, index) => (
                <button
                  key={index}
                  type="button" // Important: Prevent form submission
                  onClick={() => setSelectedAvatar(index)}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedAvatar === index
                      ? 'ring-3 ring-blue-400 scale-110'
                      : 'hover:scale-105'
                  }`}
                >
                  <img
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className="w-full h-16 object-cover"
                  />
                  {selectedAvatar === index && (
                    <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
                      <Check className="h-6 w-6 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="animate-slide-up">
              <label className="block text-sm font-bold text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                  placeholder="Enter your full name"
                  autoComplete="name" // Added for browser autofill
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-2 animate-fade-in">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                placeholder="Enter your email"
                autoComplete="email" // Added for browser autofill
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-2 animate-fade-in">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                placeholder="Enter your password"
                autoComplete={isLogin ? "current-password" : "new-password"} // Added for browser autofill
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 p-1"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-2 animate-fade-in">{errors.password}</p>
            )}
          </div>

          {/* Add a Forgot Password link here */}
          {isLogin && (
            <div className="text-right">
              <a
                href="/forgot-password" // Link to the new ForgotPasswordPage
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>
          )}

          {errors.submit && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 animate-fade-in">
              <p className="text-red-400 text-sm text-center">{errors.submit}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-lg transition-all duration-300 hover:scale-105"
          >
            {isLoading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                {!isLogin && selectedPlan === 'premium' && <Crown className="h-5 w-5" />}
                <span>{isLogin ? 'Sign In' : `Start ${selectedPlan === 'premium' ? 'Premium' : 'Free'}`}</span>
                <Sparkles className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        {/* Toggle */}
        <div className="text-center mt-8">
          <p className="text-gray-300 text-lg">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={toggleMode}
              className="text-blue-400 hover:text-blue-300 font-bold transition-colors duration-200 underline decoration-2 underline-offset-2"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-center space-x-3 text-gray-400 text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span className="font-semibold">Secure & Encrypted</span>
            {/* Removed Zap icon here, it was previously there but often paired with features not security */}
          </div>
          <p className="text-center text-gray-400 text-sm">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-semibold">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-semibold">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;