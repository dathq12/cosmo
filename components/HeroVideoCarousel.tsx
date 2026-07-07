"use client";

import { useEffect, useRef, useState } from "react";

const heroVideos = [
  "/assets/jinro-kv-01.mp4",
  "/assets/jinro-kv-02.mp4",
  "/assets/jinro-kv-03.mp4"
];

export function HeroVideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      if (index === activeIndex) {
        video.currentTime = 0;
        void video.play();
        return;
      }

      video.pause();
      video.currentTime = 0;
    });
  }, [activeIndex]);

  return (
    <div className="hero__backdrop hero-video" aria-hidden="true">
      {heroVideos.map((src, index) => (
        <video
          key={src}
          ref={(element) => {
            videoRefs.current[index] = element;
          }}
          className={`hero-video__item ${index === activeIndex ? "is-active" : ""}`}
          src={src}
          autoPlay={index === 0}
          muted
          playsInline
          preload={index === 0 ? "auto" : "metadata"}
          controls={false}
          disablePictureInPicture
          onEnded={() => setActiveIndex((current) => (current + 1) % heroVideos.length)}
          onContextMenu={(event) => event.preventDefault()}
        />
      ))}
    </div>
  );
}
