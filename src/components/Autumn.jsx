import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

const Autumn = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const revealProgress = useTransform(scrollYProgress, [0.05, 0.5], [0, 1]);
  const floatingProgress = useTransform(scrollYProgress, [0.05, 0.5], [50, 0]);
  return (
    <section
      ref={containerRef}
      className="h-[800vh] relative bg-transparent text-bg-primary"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden mb-[100vh]">
        {/* Contents Container */}
        <motion.div
          style={{ opacity: revealProgress, y: floatingProgress }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Right Content */}
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[300px] z-10 p-8 bg-white/60 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl">
            <h2 className="text-4xl font-medium text-bg-dark leading-tight">
              Frontend
            </h2>
            <p className="text-sm font-bold uppercase tracking-wider text-bg-dark">
              developer who brings ideas to life
            </p>

            <div className="border-t border-black/20 pt-6 mb-12">
              <p className="text-xs font-bold uppercase tracking-wider mb-0 text-bg-dark">
                Description For
                <br />
                what's fronted
              </p>
            </div>

            <p className="text-sm font-secondary opacity-80 leading-relaxed text-bg-dark font-medium">
              ################# ################# #################
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Autumn;
