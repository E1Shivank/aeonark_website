import { useEffect, useRef } from 'react';

interface TwinklingStarsProps {
  className?: string;
}

export default function TwinklingStars({ className = "" }: TwinklingStarsProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create stars
    const numberOfStars = 80;
    const stars: HTMLDivElement[] = [];

    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.className = 'twinkling-star';
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 2 + 0.5;
      
      // Random animation delay
      const delay = Math.random() * 4;
      
      // Random animation duration
      const duration = Math.random() * 3 + 2;
      
      star.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        background: white;
        border-radius: 50%;
        animation: twinkle ${duration}s ease-in-out ${delay}s infinite;
        opacity: 0;
        box-shadow: 0 0 6px rgba(255,255,255,0.6);
      `;
      
      stars.push(star);
      mountRef.current.appendChild(star);
    }

    // Create meteors
    const numberOfMeteors = 3;
    const meteors: HTMLDivElement[] = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      const meteor = document.createElement('div');
      meteor.className = 'meteor';
      
      // Random starting position
      const startX = Math.random() * 100;
      const startY = Math.random() * 30; // Start from top area
      
      // Random animation delay
      const delay = Math.random() * 10;
      
      // Random animation duration
      const duration = Math.random() * 3 + 2;
      
      meteor.style.cssText = `
        position: absolute;
        left: ${startX}%;
        top: ${startY}%;
        width: 2px;
        height: 2px;
        background: linear-gradient(45deg, #fff, transparent);
        border-radius: 50%;
        animation: meteor ${duration}s linear ${delay}s infinite;
        opacity: 0;
      `;
      
      meteors.push(meteor);
      mountRef.current.appendChild(meteor);
    }

    // Add CSS keyframes for twinkling and meteors
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1); }
      }
      
      @keyframes meteor {
        0% { 
          opacity: 0; 
          transform: translate(0, 0) scale(0);
        }
        10% { 
          opacity: 1; 
          transform: translate(0, 0) scale(1);
        }
        90% { 
          opacity: 1; 
          transform: translate(300px, 200px) scale(1);
          box-shadow: 0 0 10px rgba(255,255,255,0.8), -20px -10px 20px rgba(255,255,255,0.3);
        }
        100% { 
          opacity: 0; 
          transform: translate(320px, 220px) scale(0);
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      if (mountRef.current) {
        stars.forEach(star => {
          if (mountRef.current?.contains(star)) {
            mountRef.current.removeChild(star);
          }
        });
        meteors.forEach(meteor => {
          if (mountRef.current?.contains(meteor)) {
            mountRef.current.removeChild(meteor);
          }
        });
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}