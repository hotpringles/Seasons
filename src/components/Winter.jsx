import Advantages from "./Advantages";
import Global from "./Global";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

// 각 블록에 fade-in 애니메이션을 붙이는 래퍼
const StickyBlock = ({ children, height = "400vh" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  // 화면에 들어올 때 (start end → start start) 빠르게 fade in
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={ref} style={{ height }} className="relative">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <motion.div style={{ opacity, y }} className="w-full">
          {children}
        </motion.div>
      </div>
    </div>
  );
};

const Winter = () => {
  return (
    <section className="bg-transparent text-white py-0 relative">
      {/* 첫 번째 구간: Advantages (400vh 동안 sticky) */}
      <StickyBlock height="400vh">
        <Advantages />
      </StickyBlock>

      {/* 두 번째 구간: Global (400vh 동안 sticky) */}
      <StickyBlock height="400vh">
        <Global />
      </StickyBlock>
    </section>
  );
};

export default Winter;
