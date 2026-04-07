import { useEffect, useRef, useState } from "react";
import { clamp } from "./helpers";

const INSIGHTS = [
  {
    id: 1,
    title: "The Middle-mile has the highest risk concentration of any segment",
    body: "Truck drivers operate across multiple states, making criminal and accident records harder to track. Local police checks often miss interstate cases. Add direct access to high-value goods, and the middle-mile becomes one of the most risk-prone segments of the gig economy.",
  },
  {
    id: 2,
    title: "Higher age corresponds to higher risk",
    body: "Despite being older on average, truck drivers exhibit the highest risk rates, indicating that risk correlates more with operational factors mentioned above than age alone.",
  },
  {
    id: 3,
    title: "External hiring agencies often take verification shortcuts",
    body: "Many drivers are hired through contractors or informal hubs with minimal documentation. Identity and license checks are sometimes limited to verbal assurances rather than robust background screening. This increases the chances of red flags emerging later.",
  },
  {
    id: 4,
    title: "High-risk delivery partners compromise customer safety",
    body: "Delivery partners interact with customers daily. In regions like Maharashtra, where risk rates cross 7%, the probability of fraud, theft, or misconduct rises. Every instance can directly affect customer trust.",
  },
  {
    id: 5,
    title: "Shorter onboarding cycles often result in weaker verification systems",
    body: "During peak seasons, thousands of delivery partners are onboarded rapidly. The focus is often shifted to speed over safety. As a result, companies skip deeper verification.",
  },
  {
    id: 6,
    title: "The nature of dark stores may contribute to lower risk",
    body: "Dark store employees operate in supervised locations with no direct customer interaction. Their relatively younger age also reduces the likelihood of criminal involvement. Many companies also conduct mandatory PCC verifications for these employees.",
  },
];

export default function StoryDataSection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Desktop scroll
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      const total = el.offsetHeight - window.innerHeight;
      setProgress(clamp(scrolled / (total * 0.95), 0, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const webActiveIdx = Math.min(Math.floor(progress * INSIGHTS.length), INSIGHTS.length - 1);
  const webNextIdx = (webActiveIdx + 1) % INSIGHTS.length;

  const handleMobileTap = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIdx(prev => (prev + 1) % INSIGHTS.length);
      setAnimating(false);
    }, 300);
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-16px); }
        }

        /* MOBILE block: visible only below 768px */
        .story-mobile {
          display: none;
        }
        @media (max-width: 767px) {
          .story-mobile { display: block; }
          .story-desktop { display: none !important; }
        }
      `}</style>

      {/* ── MOBILE ── plain div, no height, no sticky, no scroll container */}
      <div className="story-mobile" style={{
        background: "radial-gradient(ellipse at 20% 50%, #14080a 0%, #0d0d0d 50%, #080a14 100%)",
        padding: "32px 20px 32px",
        fontFamily: "'Inter', sans-serif",
      }}>
        <h2 style={{
          fontWeight: 700, color: "white",
          fontSize: "40px", lineHeight: 1.1,
          textAlign: "center", margin: "0 0 10px",
        }}>
          The Story Behind <br /> the Data
        </h2>

        <p style={{
          fontSize: "13px", color: "rgba(255,255,255,0.55)",
          lineHeight: 1.75, textAlign: "center", margin: "0 0 20px",
        }}>
          After analyzing all the numbers, we identified a few observations
          across the segments of truck drivers, delivery partners, and dark
          store employees.
        </p>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          {INSIGHTS.map((_, i) => (
            <div key={i} style={{
              width: activeIdx === i ? 28 : 8, height: 8, borderRadius: 4,
              background: activeIdx === i ? "#e53e3e" : "rgba(255,255,255,0.2)",
              transition: "all 0.4s ease",
            }} />
          ))}
        </div>

        {/* Active card */}
        <div onClick={handleMobileTap} style={{
          animation: animating ? "fadeSlideOut 0.3s ease forwards" : "fadeSlideIn 0.45s ease forwards",
          cursor: "pointer",
        }}>
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderLeft: "3px solid #e53e3e",
            borderRadius: 12,
            padding: "20px 18px 20px 20px",
            marginBottom: 12,
          }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, color: "white", margin: "0 0 10px", lineHeight: 1.4 }}>
              {INSIGHTS[activeIdx].title}
            </h3>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>
              {INSIGHTS[activeIdx].body}
            </p>
          </div>

          <div style={{ paddingLeft: 4, opacity: 0.35 }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "white", margin: 0, lineHeight: 1.4 }}>
              {INSIGHTS[(activeIdx + 1) % INSIGHTS.length].title}
            </h3>
          </div>
        </div>

        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", textAlign: "center", margin: "16px 0 0" }}>
          Tap to see next insight
        </p>
      </div>

      {/* ── DESKTOP: tall sticky scroll container, hidden on mobile via CSS ── */}
      <div
        className="story-desktop max-md:overflow-hidden"
        ref={sectionRef}
        style={{
          height: isMobile ? 0 : `${100 * (INSIGHTS.length + 1)}vh`,
          position: "relative",
        }}
      >
        <div
          className="sticky top-0 flex flex-col items-center justify-center overflow-hidden"
          style={{
            height: isMobile ? "50vh" : "100vh",
            background: "radial-gradient(ellipse at 20% 50%, #14080a 0%, #0d0d0d 50%, #080a14 100%)",
          }}
        >
          <div className="w-full max-w-[1200px] px-[6vw] flex flex-row items-stretch box-border">

            {/* Left Panel */}
            <div className="w-[38%] shrink-0 pr-[5vw] flex flex-col justify-between pt-2 pb-2">
              <div>
                <h2
                  className="font-bold text-white mb-6"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "120px",
                    lineHeight: 1.05,
                    letterSpacing: "-1.5px",
                  }}
                >
                  The Story<br />Behind<br />the Data
                </h2>
                <p
                  className="text-white/65 leading-[1.75] mb-8"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(13px, 1vw, 15px)",
                  }}
                >
                  After analyzing all the numbers, we identified a few observations
                  across the segments of truck drivers, delivery partners, and dark
                  store employees.
                </p>
              </div>

              {/* Dot indicators */}
              <div className="flex gap-2 items-center">
                {INSIGHTS.map((_, i) => (
                  <div
                    key={i}
                    className="h-2 rounded-full transition-all duration-400 ease-in-out"
                    style={{
                      width: webActiveIdx === i ? 28 : 8,
                      background: webActiveIdx === i ? "#e53e3e" : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 pl-[4vw] flex flex-col justify-center overflow-hidden min-h-[260px]">
              <div key={webActiveIdx} style={{ animation: "fadeSlideIn 0.45s ease forwards" }}>

                {/* Active insight */}
                <div
                  className="pl-5 mb-7"
                  style={{ borderLeft: "3px solid #e53e3e" }}
                >
                  <h3
                    className="font-bold text-white mb-3 leading-[1.4]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(14px, 1.15vw, 17px)",
                    }}
                  >
                    {INSIGHTS[webActiveIdx].title}
                  </h3>
                  <p
                    className="text-white/55 leading-[1.75] m-0"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(13px, 0.95vw, 15px)",
                    }}
                  >
                    {INSIGHTS[webActiveIdx].body}
                  </p>
                </div>

                {/* Next insight preview */}
                <div className="pl-[23px]">
                  <h3
                    className="font-bold leading-[1.4] m-0"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(13px, 1vw, 16px)",
                      color: "rgba(255,255,255,0.28)",
                    }}
                  >
                    {INSIGHTS[webNextIdx].title}
                  </h3>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}