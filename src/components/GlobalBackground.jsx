import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import springBg from "../assets/spring-bg.png";
import summerBg from "../assets/summer-bg.png";
import autumnBg from "../assets/autumn-bg.png";
import winterBg from "../assets/winter-bg.png";

const GlobalBackground = () => {
  const { scrollYProgress } = useScroll({ layoutEffect: false });

  // 총 4x800vh = 3200vh. 각 섹션이 정확히 25%씩 차지.
  // Spring:   0.00 ~ 0.25
  // Summer:   0.25 ~ 0.50
  // Autumn:   0.50 ~ 0.75
  // Adv+Global (Winter): 0.75 ~ 1.00

  // Spring Opacity: 0~0.20 동안 fully 보임, 0.20~0.25에서 Summer로 crossfade
  const springOpacity = useTransform(
    scrollYProgress,
    [0, 0.20, 0.25],
    [1, 1, 1],
  );
  // Spring Parallax: Spring 섹션(0~0.25) 동안 배경 위→아래 패닝
  const springY = useTransform(scrollYProgress, [0, 0.25], ["0%", "100%"]);
  const springScale = useTransform(scrollYProgress, [0, 0.003], [0.65, 1]);
  // Summer Opacity: 0.20~0.25에서 fade in, 0.45~0.50에서 Autumn으로 crossfade
  const summerOpacity = useTransform(
    scrollYProgress,
    [0.20, 0.25, 0.45, 0.50],
    [0, 1, 1, 0],
  );
  // Summer Parallax: Summer 섹션(0.25~0.50) 동안 배경 위→아래 패닝
  const summerY = useTransform(scrollYProgress, [0.25, 0.50], ["0%", "100%"]);

  // Autumn Opacity: 0.45~0.50에서 fade in, 0.70~0.75에서 Winter로 crossfade
  const autumnOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.50, 0.70, 0.75, 0.8],
    [0, 1, 1, 0.5, 0],
  );
  // Autumn Parallax: Autumn 섹션(0.50~0.75) 동안 배경 위→아래 패닝
  const autumnY = useTransform(scrollYProgress, [0.50, 0.75], ["0%", "100%"]);

  // Winter Opacity: 0.70~0.75에서 fade in, 1.0까지 유지 (Advantages + Global 전체)
  const winterOpacity = useTransform(
    scrollYProgress,
    [0.70, 0.75, 1],
    [0, 1, 1],
  );
  // Winter Parallax: Winter 섹션(0.75~1.0) 동안 배경 위→아래 패닝
  const winterY = useTransform(scrollYProgress, [0.75, 1], ["0%", "100%"]);

  return (
    <div className="fixed inset-0 w-screen h-screen z-[-50] bg-black overflow-hidden pointer-events-none">
      {/* Spring Background */}
      <motion.div
        className="absolute inset-0 bg-[length:100%_auto] bg-no-repeat w-full h-full"
        style={{
          scale: springScale,
          backgroundImage: `url(${springBg})`,
          opacity: springOpacity,
          backgroundPositionY: springY,
          willChange: "transform",
        }}
      />

      {/* Summer Background */}
      <motion.div
        className="absolute inset-0 bg-[length:100%_auto] bg-no-repeat w-full h-full"
        style={{
          backgroundImage: `url(${summerBg})`,
          opacity: summerOpacity,
          backgroundPositionY: summerY,
          willChange: "transform",
        }}
      />

      {/* Autumn Background */}
      <motion.div
        className="absolute inset-0 bg-[length:100%_auto] bg-no-repeat w-full h-full"
        style={{
          backgroundImage: `url(${autumnBg})`,
          opacity: autumnOpacity,
          backgroundPositionY: autumnY,
          willChange: "transform",
        }}
      />

      {/* Winter Background */}
      <motion.div
        className="absolute inset-0 bg-[length:100%_auto] bg-no-repeat w-full h-full"
        style={{
          backgroundImage: `url(${winterBg})`,
          opacity: winterOpacity,
          backgroundPositionY: winterY,
          willChange: "transform",
        }}
      />

      {/* Global subtle dark overlay to ensure white text is always readable over bright skies/snow - doesn't move */}
      <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none z-10"></div>
    </div>
  );
};

export default GlobalBackground;
