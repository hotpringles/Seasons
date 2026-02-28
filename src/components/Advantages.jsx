import React, { useState } from "react";

const advantagesList = [
  {
    id: 1,
    title: "Individual Project",
    text: "Specializing in golden hour and natural lighting setups to capture authentic moments.",
  },
  {
    id: 2,
    title: "Individual Project",
    text: "Finding unique angles and perspectives to tell compelling visual stories.",
  },
  {
    id: 3,
    title: "Team Project",
    text: "Every project is crafted to evoke emotion and convey a powerful narrative.",
  },
];

const Advantages = () => {
  const [active, setActive] = useState(1);

  return (
    <section className="bg-transparent py-32 text-text-primary">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
            <h2 className="mb-12 text-[clamp(2rem,5vw,4rem)] font-medium leading-none drop-shadow-lg">
              Featured
              <br />
              Projects
            </h2>
            {advantagesList.map((item) => (
              <div
                key={item.id}
                className={`border-t border-white/20 py-8 cursor-pointer transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] last:border-b ${active === item.id ? "active-adv" : ""}`}
                onClick={() => setActive(item.id)}
              >
                <h3
                  className={`text-[2rem] mb-0 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] drop-shadow-md ${active === item.id ? "text-white" : "text-white/50"}`}
                >
                  {item.title}
                </h3>
                <div
                  className={`overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${active === item.id ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="mt-4 mb-0 font-secondary text-base opacity-90 drop-shadow-md text-white/90">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-[400px] lg:h-[600px] bg-black/40 backdrop-blur-md rounded-[20px] overflow-hidden flex items-center justify-center border border-white/10 shadow-xl">
            <div className="font-secondary text-white text-center p-8">
              <p>
                Visual for {advantagesList.find((a) => a.id === active)?.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
