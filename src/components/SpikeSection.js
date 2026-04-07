import { useEffect, useRef, useState } from "react";
import { clamp, useInView } from "./helpers";

const SPIKES = [
  {
    id: 1,
    label: "Festive hiring surges",
    img: "/assets/spike1.png"
  },
  {
    id: 2,
    label: "Inventory scale-up",
    img: "/assets/spike2.png"
  },
  {
    id: 3,
    label: "Accelerated onboarding cycles & compromised verification processes",
    img: "/assets/spike3.png",
    wide: true,
  },

];

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

function SpikeCard({ item, delay, visible, isMobile }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: isMobile ? 12 : 18,
      backgroundImage: "linear-gradient(rgb(29, 29, 29), rgb(33, 33, 33))",
      borderRadius: 14,
      border: "1px solid white",
      padding: isMobile ? "8px 12px" : "10px 18px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.55s ${delay}s, transform 0.55s ${delay}s`,
    }}>
      <div style={{
        flexShrink: 0,
        width: isMobile ? 48 : 68,
        height: isMobile ? 48 : 68,
        background: "white",
        borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <img
          src={item.img}
          alt={item.label}
          style={{
            width: isMobile ? 36 : 52,
            height: isMobile ? 36 : 52,
            objectFit: "contain"
          }}
        />
      </div>
      <span style={{
        fontFamily: "Inter",
        fontSize: isMobile ? "clamp(12px, 3.5vw, 14px)" : "clamp(15px, 1.15vw, 19px)",
        fontWeight: 500, color: "white", lineHeight: 1.4,
      }}>
        {item.label}
      </span>
    </div>
  );
}

export default function SpikesSection() {
  const [spikesRef, spikesVisible] = useInView(0.2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const storySectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = storySectionRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      const total = el.offsetHeight - window.innerHeight;
      setProgress(clamp(scrolled / (total * 0.95), 0, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIdx = Math.min(
    Math.floor(progress * INSIGHTS.length),
    INSIGHTS.length - 1
  );
  const nextIdx = (activeIdx + 1) % INSIGHTS.length;

  return (
    <>
      {/* ══ 1. SPIKES SECTION ══ */}
      <section style={{
        background: "radial-gradient(ellipse at 60% 40%, #1a0a0a 0%, #0d0d0d 60%, #0a0a12 100%)",
        padding: "10px 5vw 0px",
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center",
      }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          marginTop: 20,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "#e53e3e",
            border: "3px solid #0d0d0d",
            boxShadow: "0 0 0 3px #e53e3e",
            flexShrink: 0,
          }} />
          <div style={{
            width: 2, height: isMobile ? 80 : 130,
            background: "linear-gradient(180deg, #e53e3e 0%, #e53e3e66 100%)",
          }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#e53e3e" }} />
        </div>

        <h2 style={{
          fontFamily: "Inter",
          fontSize: isMobile ? "15px" : "30px",
          fontWeight: 700, color: "white",
          marginBottom: 48, lineHeight: isMobile ? 1.3 : "150%",
        }}>
          These spikes typically occur due to
        </h2>

        <div ref={spikesRef} style={{
          width: "100%", maxWidth: 1040,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: isMobile ? 12 : 18,
          marginBottom: 48,
        }}>
          {SPIKES.slice(0, 2).map((item, i) => (
            <SpikeCard key={item.id} item={item} delay={0.1 * i} visible={spikesVisible} isMobile={isMobile} />
          ))}
          <div style={{ gridColumn: "1 / -1" }}>
            <SpikeCard item={SPIKES[2]} delay={0.22} visible={spikesVisible} isMobile={isMobile} />
          </div>
        </div>

        <p style={{
          fontFamily: "Inter",
          fontSize: isMobile ? "11px" : "30px",
          fontWeight: 300,
          color: "rgba(255,255,255,1)",
          lineHeight: isMobile ? "14px" : "38px", maxWidth: 1100,
          opacity: spikesVisible ? 1 : 0,
          transform: spikesVisible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.55s 0.38s, transform 0.55s 0.38s",
          marginBottom: 40,
        }}>
          When hiring volume spikes, verification compromises follow and{" "}
          <strong style={{ color: "#CE1010" }}>risk rates</strong>{" "}
          <br className="sm:flex hidden" />
          inch upward. Even a <strong style={{ color: "white" }}>0.3%</strong>{" "}
          increase at scale translates into{" "}
          <strong style={{ color: "#CE1010" }}>thousands</strong>
          <br className="sm:flex hidden" />
          of additional high-risk profiles entering the ecosystem.
        </p>
      </section>

      {/* ══ 2. STORY SECTION ══ */}
      <div
        ref={storySectionRef}
        style={{ height: isMobile ? 'auto' : `calc(100vh + ${INSIGHTS.length * 40}vh)`, position: "relative", marginTop: -20 }}
      >
        <div style={{
          position: "sticky",
          top: 0,
          height: isMobile ? "50vh" : "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse at 20% 50%, #14080a 0%, #0d0d0d 50%, #080a14 100%)",
          overflow: "hidden",
          boxSizing: "border-box",
        }}>
          {/* Content row — wider maxWidth to fit 120px heading */}
          <div style={{
            width: "100%",
            maxWidth: 1300,
            padding: "0 48px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "stretch",
            gap: isMobile ? 0 : "4vw",
          }}>

            {/* Left Panel — wider to accommodate 120px heading */}
            <div style={{
              width: isMobile ? "100%" : "48%",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: isMobile ? "flex-start" : "space-between",
              paddingTop: 8,
              paddingBottom: isMobile ? 24 : 8,
              textAlign: isMobile ? "center" : "left",
            }}>
              <div>
                <h2 style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  color: "white",
                  fontSize: isMobile ? "30px" : "120px",
                  lineHeight: 1.0,
                  margin: "0 0 24px",
                  letterSpacing: "-2px",
                }}>
                  {isMobile ? (
                    <>The Story Behind<br />the Data</>
                  ) : (
                    <>The Story<br />Behind<br />the Data</>
                  )}
                </h2>

                <p style={{
                  fontFamily: "Inter",
                  fontSize: isMobile ? "13px" : "30px",
                  color: "white",
                  lineHeight: isMobile ? 1.5 : "115%",
                  margin: isMobile ? "0 0 20px" : "0 0 32px",
                  maxWidth: isMobile ? "100%" : 540,
                  fontWeight: 300,
                }}>
                  After analyzing all the numbers, we identified a few observations
                  across the segments of truck drivers, delivery partners, and dark
                  store employees.
                </p>
              </div>
            </div>

            {/* Right Panel — scroll progress line on RIGHT edge */}
            <div style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "hidden",
              minHeight: 180,
              width: isMobile ? "100%" : "auto",
              position: "relative",
              paddingRight: isMobile ? 0 : 40,
            }}>
              {/* Scroll progress vertical line — track (dim) + fill (white) */}
              {!isMobile && (
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 2,
                  height: "100%",
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: "100%",
                    height: `${progress * 100}%`,
                    background: "white",
                    borderRadius: 2,
                    transition: "height 0.1s linear",
                  }} />
                </div>
              )}

              <div key={activeIdx} style={{ animation: "fadeSlideIn 0.45s ease forwards" }}>

                {/* Active insight */}
                <div style={{ marginBottom: 32 }}>
                  <h3 style={{
                    fontFamily: "Inter",
                    fontSize: isMobile ? "14px" : "30px",
                    fontWeight: 700,
                    color: "white",
                    margin: "0 0 12px",
                    lineHeight: 1.4,
                  }}>
                    {INSIGHTS[activeIdx].title}
                  </h3>
                  <p style={{
                    fontFamily: "Inter",
                    fontSize: isMobile ? "12px" : "30px",
                    color: "white",
                    margin: 0,
                    fontWeight: 300,
                    lineHeight: isMobile ? 1.5 : "115%",
                  }}>
                    {INSIGHTS[activeIdx].body}
                  </p>
                </div>

                {/* Next insight preview */}
                <div>
                  <h3 style={{
                    fontFamily: "Inter",
                    fontSize: isMobile ? "13px" : "30px",
                    fontWeight: 600,
                    color: "#f4f4f4",
                    opacity: 0.6,
                    margin: 0,
                    lineHeight: 1.4,
                  }}>
                    {INSIGHTS[nextIdx].title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}