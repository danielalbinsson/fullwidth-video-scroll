'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function VideoScrollPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Wait for video metadata to load
    const handleLoadedMetadata = () => {
      // Set video properties
      video.currentTime = 0;
      video.pause();

      // Create ScrollTrigger for video playback
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5, // Smooth scrubbing with slight delay for better performance
          onUpdate: (self) => {
            // Calculate video time based on scroll progress
            const progress = self.progress;
            const duration = video.duration || 0;
            
            if (duration > 0) {
              video.currentTime = progress * duration;
            }
          }
        }
      });
    };

    if (video.readyState >= 1) {
      // Video metadata already loaded
      handleLoadedMetadata();
    } else {
      // Wait for metadata to load
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Video container - scrollable */}
      <div 
        ref={containerRef}
        className="h-screen bg-black flex items-center justify-center overflow-hidden"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src="/birds.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Fin screen - scrollable page */}
      <div className="h-screen bg-white flex items-center justify-center">
        <h1 className="text-6xl font-bold text-black">Fin</h1>
      </div>
    </div>
  );
} 