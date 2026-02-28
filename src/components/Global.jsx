import React from "react";

const Global = () => {
  return (
    <section className="bg-transparent text-text-inverse pt-40 pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-16 md:gap-0 bg-black/30 backdrop-blur-md p-12 rounded-3xl border border-white/10">
          <h2 className="text-[clamp(3rem,7vw,6rem)] mb-0 font-medium leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            A year.
            <br />
            Projects.
          </h2>
          <div className="flex flex-col items-start md:items-end">
            <span className="text-[clamp(4rem,8vw,8rem)] font-medium leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              0+
            </span>
            <span className="font-secondary uppercase tracking-[0.1em] opacity-90 mt-2 mb-2 font-bold drop-shadow-lg">
              Projects Completed
            </span>
          </div>
        </div>

        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-y border-white/20 py-8 whitespace-nowrap overflow-hidden flex">
          <div className="inline-flex items-center animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            <span className="text-5xl mx-8 font-light">JAVASCRIPT</span>
            <span className="text-2xl">•</span>
            <span className="text-5xl mx-8 font-light">HTML</span>
            <span className="text-2xl">•</span>
            <span className="text-5xl mx-8 font-light">CSS</span>
            <span className="text-2xl">•</span>
            <span className="text-5xl mx-8 font-light">React</span>
            <span className="text-2xl">•</span>
            <span className="text-5xl mx-8 font-light">PYTHON</span>
            <span className="text-2xl">•</span>
            <span className="text-5xl mx-8 font-light">NEXT.JS</span>
            <span className="text-2xl">•</span>
            <span className="text-5xl mx-8 font-light">
              COMPUTER ARCHITECTURE
            </span>
            <span className="text-2xl">•</span>
          </div>
          {/* Duplicate for seamless infinite marquee */}
          <div className="inline-flex items-center animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            <span className="text-5xl mx-8 font-light">JAVASCRIPT</span>
            <span className="text-2xl">•</span>
            <span className="text-5xl mx-8 font-light">HTML</span>
            <span className="text-2xl">•</span>
            <span className="text-5xl mx-8 font-light">CSS</span>
            <span className="text-2xl">•</span>
            <span className="text-5xl mx-8 font-light">React</span>
            <span className="text-2xl">•</span>
            <span className="text-5xl mx-8 font-light">PYTHON</span>
            <span className="text-2xl">•</span>
            <span className="text-5xl mx-8 font-light">NEXT.JS</span>
            <span className="text-2xl">•</span>
            <span className="text-5xl mx-8 font-light">
              COMPUTER ARCHITECTURE
            </span>
            <span className="text-2xl">•</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Global;
