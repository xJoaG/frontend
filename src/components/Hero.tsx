import React, { useState, useEffect } from 'react';
import { ArrowRight, PlayCircle, Users, BookOpen, Award, Sparkles, Zap, Globe, Crown, Star, Code, Cpu, Rocket, Brain } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Learners', color: 'from-blue-400 to-cyan-400' },
    { icon: BookOpen, value: '1000+', label: 'Expert Courses', color: 'from-green-400 to-emerald-400' },
    { icon: Award, value: '98%', label: 'Success Rate', color: 'from-yellow-400 to-orange-400' },
  ];

  const floatingElements = [
    { icon: Code, delay: '0s', duration: '20s', color: 'text-blue-400' },
    { icon: Cpu, delay: '2s', duration: '25s', color: 'text-purple-400' },
    { icon: Brain, delay: '4s', duration: '18s', color: 'text-green-400' },
    { icon: Rocket, delay: '6s', duration: '22s', color: 'text-pink-400' },
    { icon: Zap, delay: '8s', duration: '19s', color: 'text-yellow-400' },
    { icon: Crown, delay: '10s', duration: '24s', color: 'text-indigo-400' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic gradient background that responds to mouse */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.04) 0%, rgba(139, 92, 246, 0.02) 25%, rgba(15, 23, 42, 1) 50%)`
        }}
      />
      
      {/* Advanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-[2]">
        {/* Floating code elements */}
        {floatingElements.map((element, i) => (
          <div
            key={i}
            className={`absolute ${element.color} opacity-20`}
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`,
              animation: `floatComplex ${element.duration} ease-in-out infinite`,
              animationDelay: element.delay,
              transform: `translateZ(${i * 10}px)` // 3D depth
            }}
          >
            <element.icon className="w-8 h-8" />
          </div>
        ))}
        
        {/* Matrix-style code rain */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 font-mono text-xs"
              style={{
                left: `${i * 5}%`,
                animation: `codeRain ${8 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <div key={j} className="mb-2">
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Geometric shapes with 3D transforms */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float3D ${12 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`
            }}
          >
            {i % 4 === 0 ? (
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-xl" />
            ) : i % 4 === 1 ? (
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rotate-45 blur-lg" />
            ) : i % 4 === 2 ? (
              <div className="w-12 h-24 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full blur-lg" />
            ) : (
              <div className="w-14 h-14 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-lg blur-lg" />
            )}
          </div>
        ))}
      </div>

      {/* Holographic grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-[3]" />

      {/* Content */}
      <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center space-y-12">
          {/* Enhanced logo and badge */}
          <div className="inline-flex items-center space-x-6 glass-morphism rounded-full px-8 py-4 border border-white/30 shadow-2xl animate-fade-in hover:scale-105 transition-all duration-500">
            <div className="relative">
              <img 
                src="/src/assets/craiyon_215426_image.png" 
                alt="C++ Hub Logo" 
                className="w-12 h-12 rounded-lg shadow-lg animate-pulse"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-lg blur-lg animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-bold text-xl">C++ Hub</span>
              <Code className="h-6 w-6 text-blue-400 animate-bounce" />
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current animate-pulse" />
              <span className="text-yellow-400 font-bold">Next-Gen</span>
            </div>
          </div>

          {/* Revolutionary main heading with advanced typography */}
          <div className="space-y-8 animate-slide-up">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.85] tracking-tight relative">
              <span className="inline-block text-white">
                Master
              </span>
              <br />
              <span className="block text-gradient-primary bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_100%]"> 
                C++ Programming
              </span>
              <br />
              <span className="inline-block animate-text-glow">
                Like Never Before
              </span>
              
              {/* Floating code snippets */}
              <div className="absolute -top-10 -right-10 opacity-20 animate-float">
                <div className="bg-black/50 rounded-lg p-4 font-mono text-green-400 text-sm border border-green-400/30">
                  <div>{'#include <iostream>'}</div>
                  <div>{'using namespace std;'}</div>
                  <div>{'int main() {'}</div>
                  <div className="ml-4">{'cout << "Hello C++!";'}</div>
                  <div>{'}'}</div>
                </div>
              </div>
            </h1>
            
            <p className="text-2xl lg:text-3xl text-gray-200 max-w-5xl mx-auto leading-relaxed font-light animate-fade-in-delay">
              Experience the future of programming education with our 
              <span className="text-gradient-secondary font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> AI-powered interactive platform.</span>
              <br />
              From beginner to expert, unlock your coding potential.
            </p>
          </div>

          {/* Next-gen CTA buttons with advanced effects */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <button className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 text-white text-xl px-12 py-6 rounded-2xl font-bold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:scale-110 transform-gpu">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative flex items-center space-x-3 z-10">
                <Rocket className="h-6 w-6 group-hover:animate-bounce" />
                <span>Start Coding Journey</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>
            
            <button className="group glass-morphism text-white text-xl px-12 py-6 rounded-2xl font-bold hover:bg-white/20 transition-all duration-500 hover:scale-105 border border-white/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center space-x-3 z-10">
                <PlayCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                <span>Watch Demo</span>
              </div>
            </button>
          </div>

          {/* Enhanced stats with 3D effects */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.9s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center group perspective-1000">
                <div className="glass-morphism rounded-3xl p-8 border border-white/30 shadow-2xl card-hover transform-gpu transition-all duration-700 hover:rotate-y-12 hover:scale-110 relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <div className={`p-4 bg-gradient-to-r ${stat.color} rounded-2xl shadow-xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 transform-gpu`}>
                        <stat.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.value}
                    </div>
                    <p className="text-gray-300 font-semibold text-lg group-hover:text-white transition-colors duration-300">
                      {stat.label}
                    </p>
                  </div>

                  {/* Particle effects on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-2 h-2 bg-gradient-to-r ${stat.color} rounded-full animate-ping`}
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${20 + i * 10}%`,
                          animationDelay: `${i * 200}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Advanced trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-12 pt-20 pb-8 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <div className="flex items-center space-x-3 text-gray-300 glass-morphism rounded-full px-8 py-4 hover:scale-105 transition-all duration-300 border border-white/20 group">
              <Brain className="h-6 w-6 text-cyan-400 group-hover:animate-pulse" />
              <span className="font-semibold text-lg">AI-Powered Learning</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 glass-morphism rounded-full px-8 py-4 hover:scale-105 transition-all duration-300 border border-white/20 group">
              <Award className="h-6 w-6 text-green-400 group-hover:animate-bounce" />
              <span className="font-semibold text-lg">Industry Certified</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 glass-morphism rounded-full px-8 py-4 hover:scale-105 transition-all duration-300 border border-white/20 group">
              <Users className="h-6 w-6 text-blue-400 group-hover:animate-pulse" />
              <span className="font-semibold text-lg">Global Community</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator with C++ theme */}
      {scrollY < 100 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-[10]">
          <div className="glass-morphism rounded-full p-4 border border-white/30 group hover:scale-110 transition-all duration-300">
            <div className="w-8 h-12 border-2 border-cyan-400/60 rounded-full flex justify-center relative overflow-hidden">
              <div className="w-2 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-2 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced CSS animations */}
      <style jsx>{`
        @keyframes floatComplex {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          25% { 
            transform: translateY(-30px) translateX(15px) rotate(90deg) scale(1.1);
          }
          50% { 
            transform: translateY(-20px) translateX(-10px) rotate(180deg) scale(0.9);
          }
          75% { 
            transform: translateY(-40px) translateX(20px) rotate(270deg) scale(1.05);
          }
        }

        @keyframes codeRain {
          0% { 
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% { 
            opacity: 1;
          }
          90% { 
            opacity: 1;
          }
          100% { 
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes float3D {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          33% { 
            transform: translateY(-20px) rotateX(120deg) rotateY(120deg) rotateZ(120deg);
          }
          66% { 
            transform: translateY(-10px) rotateX(240deg) rotateY(240deg) rotateZ(240deg);
          }
        }

        @keyframes text-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes text-glow {
          0%, 100% { 
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
          }
          50% { 
            text-shadow: 0 0 25px rgba(255, 255, 255, 0.5), 0 0 35px rgba(99, 102, 241, 0.3);
          }
        }

        .animate-text-shimmer {
          animation: text-shimmer 3s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease-in-out 0.3s both;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-gpu {
          transform: translateZ(0);
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
};

export default Hero;