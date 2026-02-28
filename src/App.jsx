import React from "react";
import "./index.css";

// Components
import Spring from "./components/Spring";
import Summer from "./components/Summer";
import Autumn from "./components/Autumn";
import Winter from "./components/Winter";

import GlobalBackground from "./components/GlobalBackground";

function App() {
  return (
    <div className="app-container">
      {/* The Global Seamless Seasonal Background Canvas */}
      <GlobalBackground />

      {/* Detailed Navigation */}
      <nav className="px-16 py-8 flex justify-between items-center fixed top-0 left-0 right-0 z-50 font-secondary text-[1rem] font-semibold tracking-wider">
        <div className="flex gap-8">
          <div class="group h-8 overflow-hidden inline-block text-white rounded-2lg cursor-pointer">
            <div class="flex flex-col transition-transform duration-500 group-hover:-translate-y-8">
              <a
                href="#"
                className="h-8 px-2 text-white align-middle no-underline"
              >
                Photos
              </a>

              <a
                href="#"
                class="h-8 px-2 rounded-2xl text-white flex items-center justify-center no-underline font-bold bg-black/30 backdrop-blur-sm"
              >
                Photos
              </a>
            </div>
          </div>
          <div class="group h-8 overflow-hidden inline-block text-white rounded-2lg cursor-pointer">
            <div class="flex flex-col transition-transform duration-500 group-hover:-translate-y-8">
              <a
                href="#"
                className="h-8 px-2 text-white align-middle no-underline"
              >
                Projects
              </a>

              <a
                href="#"
                class="h-8 px-2 rounded-2xl text-white flex items-center justify-center no-underline font-bold bg-black/30 backdrop-blur-sm"
              >
                Projects
              </a>
            </div>
          </div>
          <div class="group h-8 overflow-hidden inline-block text-white rounded-2lg cursor-pointer">
            <div class="flex flex-col transition-transform duration-500 group-hover:-translate-y-8">
              <a
                href="#"
                className="h-8 px-2 text-white align-middle no-underline"
              >
                Records
              </a>

              <a
                href="#"
                class="h-8 px-2 rounded-2xl text-white flex items-center justify-center no-underline font-bold bg-black/30 backdrop-blur-sm"
              >
                Records
              </a>
            </div>
          </div>
          <div class="group h-8 overflow-hidden inline-block text-white rounded-2lg cursor-pointer">
            <div class="flex flex-col transition-transform duration-500 group-hover:-translate-y-8">
              <a
                href="#"
                className="h-8 px-2 text-white align-middle no-underline"
              >
                About
              </a>

              <a
                href="#"
                class="h-8 px-2 rounded-2xl text-white flex items-center justify-center no-underline font-bold bg-black/30 backdrop-blur-sm"
              >
                About
              </a>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <a
            href="https://github.com/hotpringles"
            target="_blank"
            className="text-white no-underline"
          >
            GitHub: @hotpringles
          </a>
        </div>
      </nav>

      <Spring />
      <Summer />
      <Autumn />
      <Winter />
    </div>
  );
}

export default App;
