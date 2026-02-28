import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

const text = `Welcome to my portfolio.\n
I’m grateful to share this year-long journey—from spring through winter—with you.\n
I hope you enjoy exploring these projects as much as I enjoyed creating them.`;

const Word = ({ children, progress, range }) => {
  // Map the scroll progress for this specific word to a percentage.
  // We go from -20 to 120 so the gradient's soft edge completely enters and exits the word smoothly.
  const fillPct = useTransform(progress, range, [-20, 120]);

  // Create a linear gradient that acts as our color source.
  // It transitions from solid white to dimmed white over a 30% area, creating a soft glowing edge.
  const bgImage = useMotionTemplate`linear-gradient(to right, rgba(255,255,255,1) calc(${fillPct}% - 15%), rgba(255,255,255,0.15) calc(${fillPct}% + 15%))`;

  return (
    <motion.span
      style={{
        backgroundImage: bgImage,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        display: "inline-block",
        marginRight: "0.25em",
        paddingBottom: "0.1em", // 글자 아래(j, y 등) 잘림 방지
      }}
    >
      {children}
    </motion.span>
  );
};

const Summer = () => {
  const part1Ref = useRef(null);
  const part2Ref = useRef(null);

  const { scrollYProgress: part1ProgressRaw } = useScroll({
    target: part1Ref,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: part2Progress } = useScroll({
    target: part2Ref,
    offset: ["start center", "center center"],
  });

  // Smooth the text reveal
  const part1Progress = useSpring(part1ProgressRaw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Fade in the bottom bar smoothly as it comes into view
  const opacityPart2 = useTransform(part2Progress, [0, 0.5], [0, 1]);

  const lines = text.split("\n");
  const totalWords = text.split(/[\s\n]+/).filter((w) => w.length > 0).length;

  return (
    <section className="bg-transparent text-white py-0 relative">
      {/* 1. 처음 380vh: 글자들이 하얗게 채워지는 구간 */}
      <div ref={part1Ref} className="h-[380vh] relative w-full">
        <div className="sticky top-0 h-screen flex flex-col justify-center p-16 overflow-hidden">
          <div className="max-w-[1800px] mx-auto w-full h-full flex flex-col justify-center">
            <div className="absolute top-20 left-16 flex items-start">
              <div className="flex items-center gap-8">
                <div className="font-primary text-xs font-bold tracking-[0.1em] leading-[1.4] uppercase">
                  <span>Developed</span>
                  <br />
                  <span>
                    BY JHCHOI
                    <br />
                    2026
                  </span>
                </div>
              </div>
            </div>

            <h2 className="font-secondary text-[clamp(1.5rem,3.5vw,4rem)] font-medium tracking-[-0.03em] max-w-[50%]">
              {lines.map((line, lineIndex) => {
                const wordsInLine = line.split(" ").filter((w) => w.length > 0);
                const previousWordsCount = lines
                  .slice(0, lineIndex)
                  .reduce(
                    (acc, l) =>
                      acc + l.split(" ").filter((w) => w.length > 0).length,
                    0,
                  );

                return (
                  <span key={lineIndex} className="block mb-2 last:mb-0">
                    {wordsInLine.map((word, wordIndex) => {
                      const globalIndex = previousWordsCount + wordIndex;
                      const start = (globalIndex / totalWords) * 0.8;
                      const end = start + (1 / totalWords) * 0.8;
                      return (
                        <Word
                          key={globalIndex}
                          progress={part1Progress}
                          range={[start, end]}
                        >
                          {word}
                        </Word>
                      );
                    })}
                  </span>
                );
              })}
            </h2>
          </div>
        </div>
      </div>

      {/* 2. 다음 420vh: Discover My 버튼 영역이 화면 중앙에 나타나 고정되는 구간 */}
      <div ref={part2Ref} className="h-[420vh] relative w-full">
        <div className="sticky top-0 h-screen flex items-center justify-center p-16 overflow-hidden">
          <motion.div
            style={{ opacity: opacityPart2 }}
            className="w-full max-w-[1800px] grid grid-cols-1 md:grid-cols-3 items-center border-t border-white/20 p-12 bg-black/30 backdrop-blur-sm rounded-3xl shadow-xl"
          >
            <div className="flex flex-col gap-6">
              <h4 className="text-3xl font-medium leading-[1.2] mb-0 text-white">
                Discover All
              </h4>
              <div className="flex gap-4">
                <button className="px-8 py-4 rounded-full border-none bg-white text-bg-primary font-bold cursor-pointer transition-transform hover:scale-105">
                  Projects
                </button>
                <button className="w-14 h-14 rounded-full border-none bg-white text-bg-primary flex items-center justify-center cursor-pointer transition-transform hover:scale-105 text-xl font-bold">
                  →
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:col-start-3 md:items-end md:text-right">
              <h4 className="text-3xl font-medium leading-[1.3] mb-0 text-white md:text-right">
                Stories Told
                <br />
                Through Programming
              </h4>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Summer;
