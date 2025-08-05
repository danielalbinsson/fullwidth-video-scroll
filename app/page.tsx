'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function VideoScrollTextPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainer1Ref = useRef<HTMLDivElement>(null);
  const textContainer2Ref = useRef<HTMLDivElement>(null);
  const textContainer3Ref = useRef<HTMLDivElement>(null);
  const textContainer4Ref = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const textContainer1 = textContainer1Ref.current;
    const textContainer2 = textContainer2Ref.current;
    const textContainer3 = textContainer3Ref.current;
    const textContainer4 = textContainer4Ref.current;

    if (!video || !container || !textContainer1 || !textContainer2 || !textContainer3 || !textContainer4) return;

    const ctx = gsap.context(() => {
      const handleLoadedMetadata = () => {
        video.currentTime = 0;
        video.pause();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=600',
            scrub: true,
            pin: true,
          },
        });

        // Animate video playback 
        tl.to(video, {
          currentTime: video.duration,
          ease: 'none',
        }, 0);

        // Animate the text containers with stagger
        tl.to(textContainer1, {
            y: () => -(textContainer1.offsetHeight + window.innerHeight - 280),
            ease: 'expo.out',
        }, 0.04);

        tl.to(textContainer2, {
            y: () => -(textContainer2.offsetHeight + window.innerHeight - 280),
            ease: 'expo.out',
        }, 0.08);

        tl.to(textContainer3, {
            y: () => -(textContainer3.offsetHeight + window.innerHeight - 280),
            ease: 'expo.out',
        }, 0.1);

        tl.to(textContainer4, {
            y: () => -(textContainer4.offsetHeight + window.innerHeight - 100),
            ease: 'expo.out',
        }, 0.12);
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
          className="absolute w-full"
          style={{ top: '100vh' }} 
        >
            <div ref={textContainer1Ref} className="text-xl flex flex-col py-8 px-12 lg:px-96 text-white">
               
                <p className="pb-4 max-w-lg">
                    Hope is the thing with feathers —
                </p>
                <p className="pb-4 max-w-lg ">
                    That perches in the soul —
                </p>
                <p className="pb-4 max-w-lg ">
                    And sings the tune without the words —
                </p>
                <p className="max-w-lg pb-4">
                    And never stops — at all —
                </p>

                </div>

                <div ref={textContainer2Ref} className="text-xl flex flex-col py-8 px-12 lg:px-96 text-white">

                <p className="pb-4 max-w-lg ">
                    And sweetest — in the Gale — is heard —
                </p>
                <p className="pb-4 max-w-lg ">
                    And sore must be the storm —
                </p>
                <p className="pb-4 max-w-lg ">
                    That could abash the little Bird
                </p>
                <p className="max-w-lg pb-4">
                    That kept so many warm —
                </p>
                </div>

                <div ref={textContainer3Ref} className="text-xl flex flex-col py-8 px-12 lg:px-96 text-white">
                <p className="pb-4 max-w-lg ">
                    I've heard it in the chillest land —
                </p>
                <p className="pb-4 max-w-lg ">
                    And on the strangest Sea —
                </p>

                <p className="pb-4 max-w-lg ">
                    Yet — never — in Extremity,
                </p>
                <p className="pb-4 max-w-lg">
                    It asked a crumb — of Me.
                </p>
                </div>

                <div ref={textContainer4Ref} className="text-xl flex flex-col py-0 px-12 lg:px-96 text-white">
                <p className="text-md max-w-lg">
                "Hope is the Thing with Feathers"
                by Emily Dickinson
                </p>
            </div>
        </div>

      </div>
      
      {/* Fin screen */}
      <div className="h-screen bg-white flex items-center justify-center">
        <h1 className="text-6xl font-bold text-black">Fin</h1>
      </div>
    </div>
  );
}