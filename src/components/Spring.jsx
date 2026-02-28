import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

const Spring = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  // Scale the window mask massively to fill the screen
  const scaleWindow = useTransform(scrollYProgress, [0, 0.8], [1, 40]);

  // ─── 커튼 방식 흰색 마스크 ───────────────────────────────────────────────
  // box-shadow + scale 조합의 GPU 컴포지팅 버그를 완전히 우회.
  // scaleWindow 값에서 픽셀 크기를 직접 계산 → 4개의 흰색 div가 커튼처럼 걷힘.
  //   scale=1  → windowHalf=250px  → 커튼이 500px 창문 주위를 꽉 채움
  //   scale=40 → windowHalf=10000px → 커튼이 화면 밖으로 완전히 밀려남
  // GPU 레이어 충돌 없음, 역스크롤 시 아티팩트 없음.
  const windowHalfPx = useTransform(scaleWindow, (s) => s * 250);
  const curtainTopH = useMotionTemplate`calc(50% - ${windowHalfPx}px)`;
  const curtainBottomT = useMotionTemplate`calc(50% + ${windowHalfPx}px)`;
  const curtainLeftW = useMotionTemplate`calc(50% - ${windowHalfPx}px)`;
  const curtainRightL = useMotionTemplate`calc(50% + ${windowHalfPx}px)`;

  // Fade out the UI elements as we zoom
  const opacityUi = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Reveal "Fill Your Year." text as window zooms in
  const opacityWinterText = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const yWinterText = useTransform(scrollYProgress, [0.4, 0.7], [50, 0]);

  // Subtle typography parallax
  const yTextLeft = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const yTextRight = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="h-[800vh] relative bg-transparent py-0"
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden flex items-center justify-center">
        {/* "Fill Your Year." — 줌인 후 배경 위에 나타나는 텍스트 (z-1) */}
        <motion.div
          className="absolute z-[1] inset-0 flex items-center justify-center font-primary font-bold text-[4rem] text-white tracking-wider drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] pointer-events-none"
          style={{ opacity: opacityWinterText, y: yWinterText }}
        >
          A year of Records.
        </motion.div>

        {/* ── 흰색 커튼 4개 (z-2) ──────────────────────────────────────────
            각 커튼의 크기/위치가 scaleWindow 에서 직접 계산됨.
            scale 커질수록 커튼이 화면 밖으로 밀려 배경이 드러남.
            box-shadow 없이 순수 div → GPU 아티팩트 없음.
        */}
        {/* 상단 커튼 */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-[#fff] pointer-events-none z-[2]"
          style={{ height: curtainTopH }}
        />
        {/* 하단 커튼 */}
        <motion.div
          className="absolute left-0 w-full bg-[#fff] pointer-events-none z-[2]"
          style={{ top: curtainBottomT, bottom: 0 }}
        />
        {/* 좌측 커튼 */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#fff] pointer-events-none z-[2]"
          style={{ width: curtainLeftW }}
        />
        {/* 우측 커튼 */}
        <motion.div
          className="absolute top-0 h-full bg-[#fff] pointer-events-none z-[2]"
          style={{ left: curtainRightL, right: 0 }}
        />

        {/* ── 창틀 프레임 (z-3) ─────────────────────────────────────────────
            scale만 담당. box-shadow 없음. 안쪽 내부는 bg-transparent.
            커튼 위에 렌더링되어 창문 테두리 표현.
        */}
        <motion.div
          className="w-[500px] h-[500px] bg-transparent absolute z-[3] origin-center border-[20px] border-[#ffffff] flex items-center justify-center pointer-events-none"
          style={{
            scale: scaleWindow,
            boxShadow: `
              0 8px 40px rgba(0,0,0,0.30),
              0 2px 8px rgba(0,0,0,0.15),
              inset 0 0 40px rgba(0,0,0,0.20)
            `,
          }}
        >
          {/* 내부 창살 (가로/세로) - 줌인될수록 fade out */}
          <motion.div
            style={{ opacity: opacityUi }}
            className="absolute top-1/2 left-0 w-full h-[12px] bg-[#ffffff] -translate-y-1/2 shadow-[0_5px_15px_rgba(0,0,0,0.15)] z-10 pointer-events-none"
          />
          <motion.div
            style={{ opacity: opacityUi }}
            className="absolute top-0 left-1/2 w-[12px] h-full bg-[#ffffff] -translate-x-1/2 shadow-[5px_0_15px_rgba(0,0,0,0.15)] z-10 pointer-events-none"
          />
        </motion.div>

        {/* ── UI 레이어 (z-4) ───────────────────────────────────────────────
            제목 텍스트, 설명 등. 커튼/창틀 위에 렌더링.
        */}
        <motion.div
          style={{ opacity: opacityUi }}
          className="absolute top-0 left-0 w-full h-full z-[4] pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] text-bg-dark/80 font-primary font-light text-3xl tracking-[0.2em] font-semibold">
            Four Seasons
          </div>

          <motion.div
            style={{ y: yTextLeft }}
            className="absolute top-[30%] -translate-y-1/2 left-[5%] z-10"
          >
            <h1 className="text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.9] tracking-[-0.05em] text-bg-dark mb-0">
              Capturing
            </h1>
            <h1 className="text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.9] tracking-[-0.05em] text-bg-dark">
              moments
            </h1>
          </motion.div>

          <motion.div
            style={{ y: yTextRight }}
            className="absolute top-[70%] -translate-y-1/2 right-[5%] z-10 text-right"
          >
            <h1 className="text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.9] tracking-[-0.05em] text-bg-dark mb-0">
              Creating
            </h1>
            <h1 className="text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.9] tracking-[-0.05em] text-bg-dark">
              memories
            </h1>
          </motion.div>

          <div className="absolute bottom-8 left-0 right-0 px-16 grid grid-cols-[1fr_auto_1fr] items-end z-20 pointer-events-auto">
            <div className="flex flex-col text-bg-dark">
              <h3 className="text-[2.5rem] leading-[1.1] mb-8">
                A Journey
                <br />
                Through
                <br />
                The Year
              </h3>
              <hr className="w-[50px] border-none border-t border-bg-dark/20 mb-6" />
              <p className="text-[0.85rem] max-w-[300px] leading-[1.4] mb-0 opacity-80 font-medium">
                Explore a curated collection of photography and projects
                inspired by the changing of the seasons, crafted to evoke
                emotion and convey a narrative.
              </p>
            </div>
            <div className="flex flex-col items-end font-primary text-[0.75rem] font-semibold tracking-[0.1em] text-bg-dark">
              <hr className="w-full border-none border-t border-bg-dark/20 mb-6" />
              <div className="flex justify-end gap-4 w-full mt-4">
                <span>↓↓</span>
                <span>SCROLL DOWN</span>
                <span>TO EXPLORE THE GALLERY</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Spring;
