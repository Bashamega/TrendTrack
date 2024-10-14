"use client";

import React from "react";
import heroImage from "@/assets/heroImagev2.svg";
import Image from "next/image";

const Hero: React.FC = () => {
  const scrollToRepoControls = () => {
    const repoControlsSection = document.getElementById("repo-controls");
    if (repoControlsSection) {
      const yOffset = -20; // Adjust this value to fine-tune the scroll position
      const y =
        repoControlsSection.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="hero bg-slate-900 p-2 h-auto md:min-h-screen md:h-[390px]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image
          src={heroImage}
          alt="hero-image"
          className="w-full h-[390px] max-w-md rounded-lg shadow-2xl object-cover"
        />
        <div className="flex-1 pe-16">
          <h1 className="text-3xl md:text-5xl font-bold">
            Stay Ahead of GitHub Trends
          </h1>
          <p className="py-8 text-sm md:text-base">
            Discover the top trending repositories with TrendTrack! The ultimate
            platform for developers, tech enthusiasts, and curious minds.
            Explore fresh ideas, cutting-edge tools, and innovative projects
            that are all in one user-friendly place. Stay updated daily and see
            what is shaping the future of tech.
          </p>
          <button
            className="btn btn-primary w-1/2"
            onClick={scrollToRepoControls}
          >
            Check Trends
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
