import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { PROFILE } from '../../constants';
import { api } from '../../services/api';

const Hero: React.FC = () => {
  const [profile, setProfile] = useState(PROFILE);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    api.getProfile().then(setProfile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Normalize to -1 to 1 for rotation logic
    setMousePos({ 
      x: (x - 0.5) * 2, 
      y: (y - 0.5) * 2 
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isAvailable = profile.availability === 'Available' || profile.availability === 'Open to Offers';

  return (
    <section 
      id="about" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50 dark:bg-slate-950 group/hero"
    >
      
      {/* Dynamic Background Spotlight */}
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover/hero:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x * 50 + 50}% ${mousePos.y * 50 + 50}%, rgba(16, 185, 129, 0.05), transparent 40%)`
        }}
      />

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Animated Blob */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary-500 opacity-20 blur-[100px] dark:opacity-10 animate-blob"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 flex flex-col justify-center animate-fade-in-up">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm w-fit mb-6 hover:shadow-md transition-shadow cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAvailable ? 'bg-primary-400' : 'bg-yellow-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isAvailable ? 'bg-primary-500' : 'bg-yellow-500'}`}></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                {profile.availability}
              </span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300 mb-2">
              Hi, I'm <span className="text-primary-600 dark:text-primary-400 font-bold">{profile.name}</span>
            </h2>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
              Backend <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-[length:200%_auto] animate-gradient">
                Architect.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed font-light">
              {profile.bio.split('.')[0]}. I build the <span className="text-slate-900 dark:text-white font-medium relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary-500/50">invisible engines</span> that power modern SaaS businesses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#projects"
                onClick={scrollToProjects}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg shadow-lg text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                View Selected Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-slate-200 dark:border-slate-800 text-base font-semibold rounded-lg text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <Download className="mr-2 h-5 w-5" />
                Resume
              </a>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center gap-8">
              <div className="flex flex-col group/stat cursor-default">
                <span className="text-3xl font-bold text-slate-900 dark:text-white font-mono group-hover/stat:text-primary-600 transition-colors">5+</span>
                <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Years Exp.</span>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-slate-800"></div>
              <div className="flex flex-col group/stat cursor-default">
                <span className="text-3xl font-bold text-slate-900 dark:text-white font-mono group-hover/stat:text-primary-600 transition-colors">20+</span>
                <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Projects Delivered</span>
              </div>
            </div>
          </div>

          {/* Right Side: Profile Image with 3D Effect */}
          <div className="order-1 lg:order-2 relative h-full min-h-[400px] flex items-center justify-center perspective-[1000px]">
            <div 
              className="relative w-full max-w-md aspect-square bg-slate-200 dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-100 ease-out group/image"
              style={{
                transform: `rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -5}deg) translateZ(20px)`,
                boxShadow: `${-mousePos.x * 20}px ${mousePos.y * 20}px 50px rgba(0,0,0,0.2)`
              }}
            >
               
               {/* Image Container */}
               <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
                  <img 
                    src="/umesh.png" 
                    alt={profile.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/image:scale-105"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
               </div>

            </div>
            
            {/* Decorative Elements behind the image */}
            <div className="absolute -z-10 -right-10 -bottom-10 w-2/3 h-2/3 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -z-10 -left-10 -top-10 w-2/3 h-2/3 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;