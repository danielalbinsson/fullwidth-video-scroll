'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function VideoScrollPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;
    
    // Using gsap.context for easier cleanup in React
    const ctx = gsap.context(() => {
      const handleLoadedMetadata = () => {
        // Set initial video state
        video.currentTime = 0;
        video.pause();

        // The master timeline for the scroll-based animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: `+=${video.duration * 250}`,
            scrub: true,
            pin: true,
          },
        });

        // mapping the timeline to the video's duration
        tl.to(video, {
          currentTime: video.duration,
          ease: 'none',
        });
      };

      if (video.readyState >= 1) {
        // check if the video metadata is loaded
        handleLoadedMetadata();
      } else {
        video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
      }
    }, mainRef); 

    // Cleanup function - cleans up all GSAP animations and ScrollTriggers within the context
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-black">
      {/* Video container - This element will be pinned */}
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
      
      {/* Next screen - Will only become visible after the pinning ends */}
      <div className="h-screen bg-white flex items-center justify-center">
        <h1 className="text-6xl font-bold text-black">Fin</h1>
      </div>
    </div>
  );
}