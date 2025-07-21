// src/pages/LoginRedirectPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';

const LoginRedirectPage: React.FC = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(true);

  // When the modal closes, redirect back to home or a previous page.
  const handleCloseModal = () => {
    setShowAuthModal(false);
    navigate('/'); // Redirect to home after modal closes
  };

  useEffect(() => {
    // If for some reason modal is not shown or closed immediately,
    // ensure a redirect happens to prevent a blank page.
    if (!showAuthModal) {
      navigate('/');
    }
  }, [showAuthModal, navigate]);


  return (
    <>
      {showAuthModal && (
        <AuthModal initialMode="login" onClose={handleCloseModal} />
      )}
      {/* You might want a loading spinner or some text here while modal renders */}
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Only show loading text if modal isn't visible (e.g. if it closes quickly) */}
        {!showAuthModal && <p>Redirecting...</p>}
      </div>
    </>
  );
};

export default LoginRedirectPage;