'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function VideoScrollTextPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const textContainer = textContainerRef.current;

    if (!video || !container || !textContainer) return;

    const ctx = gsap.context(() => {
      const handleLoadedMetadata = () => {
        video.currentTime = 0;
        video.pause();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=4000',
            scrub: true,
            pin: true,
          },
        });

        // Animate video playback 
        tl.to(video, {
          currentTime: video.duration,
          ease: 'none',
        }, 0);

        // Animate the text container
        tl.to(textContainer, {
            y: () => -(textContainer.offsetHeight + window.innerHeight),
            ease: 'none',
        }, 0);
      };
      
      if (video.readyState >= 1) {
        handleLoadedMetadata();
      } else {
        video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-black">
      <div
        ref={containerRef}
        className="h-screen bg-black flex items-center justify-center relative overflow-hidden"
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


        <div
          ref={textContainerRef}
          className="absolute w-full"
          style={{ top: '100vh' }} 
        >
            <div className="flex flex-col py-24 px-12 lg:px-96 text-white">
               
                <p className="text-lg max-w-lg">
                    Hope is the thing with feathers —
                </p>
                <p className="text-lg max-w-lg ">
                    That perches in the soul —
                </p>
                <p className="text-lg max-w-lg ">
                    And sings the tune without the words —
                </p>
                <p className="text-lg max-w-lg pb-12">
                    And never stops — at all —
                </p>
                <p className="text-lg max-w-lg ">
                    And sweetest — in the Gale — is heard —
                </p>
                <p className="text-lg max-w-lg ">
                    And sore must be the storm —
                </p>
                <p className="text-lg max-w-lg ">
                    That could abash the little Bird
                </p>
                <p className="text-lg max-w-lg pb-12">
                    That kept so many warm —
                </p>
                <p className="text-lg max-w-lg ">
                    I've heard it in the chillest land —
                </p>
                <p className="text-lg max-w-lg ">
                    And on the strangest Sea —
                </p>
                <p className="text-lg max-w-lg ">
                    Yet — never — in Extremity,
                </p>
                <p className="text-lg max-w-lg pb-12">
                    It asked a crumb — of Me.
                </p>
                <p className="text-md max-w-lg">
                "Hope is the Thing with Feathers"
                by Emily Dickinson
                </p>
            </div>
        </div>

      </div>
      
      {/* Fin screen */}
      <div className="h-screen bg-white flex items-center justify-center">
        <h1 className="text-4xl font-bold text-black">Fin</h1>
      </div>
    </div>
  );
}