import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import DeviceCompatibility from '../components/DeviceCompatibility';
import Courses from '../components/Courses';
import Stats from '../components/Stats';
import PricingSection from '../components/PricingSection';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import ParticleNetwork from '../components/ParticleNetwork';
import TutorWidget from '../components/TutorWidget';

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleNetwork />
      <Navbar />
      <Hero />
      <Features />
      <DeviceCompatibility />
      <Stats />
      <Courses />
      <PricingSection />
      <Testimonials />
      <CTA />
      <Footer />
      <TutorWidget />
    </div>
  );
};

export default HomePage;