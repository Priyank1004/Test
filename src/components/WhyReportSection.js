import { useEffect, useRef, useState } from "react";
import { clamp, ease } from "./helpers";

function CountUp({ target, duration = 1800, trigger }) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const run = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setVal(+(target * e).toFixed(1));
      if (t < 1) raf.current = requestAnimationFrame(run);
      else setVal(target);
    };
    raf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf.current);
  }, [trigger, target, duration]);
  return <>{val}</>;
}

// ── Visibility hook ───────────────────────────────────────────────────────────
// Always becomes true after a short delay so content is never permanently
// hidden — regardless of scroll position, DevTools resize, or WebView quirks.
// Re-runs when layoutKey (isMobile) changes so the animation replays cleanly
// after a mobile ↔ desktop switch.
function useVisible(layoutKey) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    // 250 ms is enough for the browser to paint the new layout branch;
    // the fade-in transition then plays naturally from that point.
    const t = setTimeout(() => setVisible(true), 250);
    return () => clearTimeout(t);
  }, [layoutKey]);

  return [ref, visible];
}
// ─────────────────────────────────────────────────────────────────────────────

const AIMS = [
  "Understanding the fraud-prone segments of the gig economy workforce",
  "Examining structural blind spots in the current risk assessment processes",
  "Quantifying these blind spots, uncovering fraud patterns, and highlighting where risk is quietly concentrating",
  "Covering real-life fraud stories that IDfy witnessed last year",
];

const TIMELINE = [
  { year: "1999", desc: "The first online shopping platform gained traction.", title: "Medium", sub: "Courier services", tilt: -2.5 },
  { year: "2015", desc: "A social media platform introduced shoppable tags, where people could directly sell on the platform.", title: "Medium", sub: "Fleet operators", tilt: 1.8 },
  { year: "2017", desc: "E-commerce platforms offered same-day delivery services to compete on speed and reach. Premium members.", title: "Medium", sub: "Fleet operators + delivery drivers", tilt: -1.5 },
  { year: "2019", desc: "Food delivery platforms competed for speed promising delivery in 10–15 minutes from micro-fulfillment centers.", title: "Medium", sub: "Delivery Partners + Dark stores", tilt: 2.2 },
  { year: "2021", desc: "Quick commerce gained popularity for providing sub-15 minute delivery for premium products.", title: "Medium", sub: "Delivery Partners + Dark stores", tilt: -1.8 },
  { year: "2025", desc: "On-demand services (cleaning, cooking, etc) can be booked instantly.", title: "Medium", sub: "For everything instantly", tilt: 1.2 },
];

const MOBILE_CARD_W = 240;
const MOBILE_GAP = 24;
const TOTAL_MOBILE_RAIL_W =
  TIMELINE.length * MOBILE_CARD_W + (TIMELINE.length - 1) * MOBILE_GAP;

function TimelineCard({ item, entrance, isMobile, index }) {
  const cardWidth = isMobile ? MOBILE_CARD_W : 300;
  const imgHeight = isMobile ? 120 : 160;

  return (
    <div style={{
      opacity: entrance,
      transform: `translateX(${(1 - entrance) * 80}px) rotate(${item.tilt}deg)`,
      transformOrigin: "50% 0%",
      willChange: "transform, opacity",
      flexShrink: 0,
      transition: "opacity 0.35s ease-out, transform 0.45s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
    }}>
      <div style={{
        width: cardWidth,
        background: "#fff",
        borderRadius: 24,
        border: "2px solid #D7D7D7",
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        height: "100%", // Make card take full height of its container
      }}>
        {/* Content area with minimum height */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: isMobile ? "12px 14px 8px" : "18px 20px 12px" }}>
            <div style={{
              display: "inline-block", color: "#CE1010",
              fontSize: isMobile ? 18 : 22,
              fontWeight: 800,
              fontFamily: "'Inter',sans-serif", letterSpacing: -0.5, marginBottom: 6,
            }}>{item.year}</div>
            <p style={{
              fontSize: isMobile ? 12 : 13,
              color: "#444", lineHeight: 1.55,
              fontFamily: "'Inter',sans-serif", margin: 0,
            }}>{item.desc}</p>
          </div>

          {/* This div will expand to fill space */}
          <div style={{ 
            padding: isMobile ? "6px 14px 10px" : "8px 20px 12px",
            flex: 1,
          }}>
            <p style={{ fontSize: isMobile ? 13 : 16, fontWeight: 800, color: "#1a1a1a", fontFamily: "'Inter',sans-serif", marginBottom: 2 }}>{item.title}</p>
            <p style={{ fontSize: isMobile ? 10 : 12, color: "#888", fontFamily: "'Inter',sans-serif", lineHeight: 1.4, margin: 0 }}>{item.sub}</p>
          </div>
        </div>

        <div style={{ margin: isMobile ? "0 10px 10px" : "0 14px 14px", borderRadius: 12, overflow: "hidden", height: imgHeight, background: "#f5f5f5" }}>
          <img
            src={`/assets/${index + 15}.png`}
            alt={item.year}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function WhyReportSection() {
  // Initialise synchronously so the first render already matches the viewport
  // (must be declared BEFORE useVisible which consumes isMobile)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const [vw, setVw] = useState(
    () => (typeof window !== "undefined" ? window.innerWidth : 1440)
  );

  // Pass isMobile so the hook re-runs whenever the layout branch switches
  const [ref, visible] = useVisible(isMobile);
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setVw(window.innerWidth);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      const total = el.offsetHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Animation timing ──────────────────────────────────────────────────────
  // Start as soon as the section enters the viewport (progress ~0) rather
  // than waiting for deep scroll. Smaller per-card stagger keeps the sequence
  // snappy instead of drawn-out.
  const railShift = ease(clamp(progress / 0.95, 0, 1));
  const cardEntrance = (i) => {
    // Card 0 is always fully visible — no delay, no fade-in
    if (i === 0) return 1;
    const start = i * 0.04;
    const end   = start + 0.12;
    return ease(clamp((progress - start) / (end - start), 0, 1));
  };

  // Mobile: card 0 starts at the right edge of the viewport, sweeps left on scroll.
  // mobileInitial ≈ vw*0.35 places card 0's right edge flush with the viewport right.
  // mobileEnd shows the last card fully in view.
  const mobileInitial = vw * 0.35;
  const mobileEnd = -(TOTAL_MOBILE_RAIL_W - vw + 32);
  const mobileTranslateX = mobileInitial * (1 - railShift) + mobileEnd * railShift;

  // Desktop: 82% pushes card 0 to the right edge of the viewport on load.
  // End position stays at -110% + 20px (same as original).
  // const desktopTranslateX = `calc(${93 - railShift * 203}% + ${railShift * 20}px)`;
  const desktopTranslateX = `calc(${93 - railShift * 130}%)`;

  return (
    <>
      {/* ── Why Report Section ── */}
      <section style={{
        background: "#fff",
        padding: isMobile ? "48px 5vw 48px" : "80px 8vw 100px",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}>
        <h2
          style={{
            fontWeight: 700,
            fontFamily: "'Inter',sans-serif",
            color: "#343434",
            textAlign: "center",
            fontSize: isMobile ? "22px" : "60px",
            marginBottom: isMobile ? 36 : 72,
            letterSpacing: "-0.02em",
          }}
        >
          Why we put this report together
        </h2>

        {/* ── MOBILE layout ── */}
        {isMobile ? (
          <div ref={ref} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>

            <div style={{
              textAlign: "center",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}>
              <p style={{
                fontSize: 30,
                color: "#4b5563",
                fontWeight: 400,
                margin: "0 0 4px 0",
                lineHeight: 1.5,
              }}>
                We analyzed over
              </p>
              <p style={{
                fontSize: 16,
                color: "#343434",
                fontWeight: 500,
                margin: 0,
                lineHeight: 1.6,
              }}>
                <span style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#CE1010",
                  verticalAlign: "middle",
                  marginRight: 6,
                  lineHeight: "20px",
                }}>
                  <CountUp target={4.9} trigger={visible} duration={1600} />M
                </span>
                <span style={{ fontWeight: 700, color: "#343434", fontSize: 17, lineHeight: "20px" }}>
                  Background Verifications
                </span>
              </p>
              <p style={{
                fontSize: 14,
                color: "#5a6874",
                margin: "6px 0 0 0",
                fontWeight: 300,
                lineHeight: "13px",
              }}>
                conducted last year to build this report,
              </p>
            </div>

            {/* Aims card */}
            <div style={{
              background: "#EEEEEE",
              borderRadius: 20,
              padding: "20px 18px",
              border: "1px solid #e2e2e2",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s 0.15s, transform 0.6s 0.15s",
            }}>
              <p style={{
                fontSize: 13,
                color: "#343434",
                fontWeight: 700,
                marginBottom: 16,
                letterSpacing: "0.4px",
              }}>
                with the aim of
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {AIMS.map((aim, i) => (
                  <li key={i} style={{
                    display: "flex", gap: 12, alignItems: "flex-start",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 0.4s ${0.2 + i * 0.08}s, transform 0.4s ${0.2 + i * 0.08}s`,
                  }}>
                    <span style={{
                      flexShrink: 0, width: 7, height: 7,
                      borderRadius: "50%", background: "#d93025", marginTop: 6,
                    }} />
                    <span style={{ fontSize: 13, color: "#2c3e4f", lineHeight: 1.6, fontWeight: 400 }}>
                      {aim}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        ) : (
          /* ── DESKTOP layout ── */
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "0.55fr 1.45fr",
              gap: "120px",
              width: "100%",
              maxWidth: 1100,
              alignItems: "start",
            }}>
              {/* Left: Stat block */}
              <div>
                <div
                  ref={ref}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingTop: 12,
                  }}
                >
                  <p style={{
                    fontSize: 30, color: "#4b5563", fontWeight: 500,
                    marginBottom: 8, margin: "0 0 8px 0",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                    lineHeight: "115%",
                  }}>
                    We analyzed over
                  </p>

                  <div style={{
                    fontSize: "clamp(80px, 12vw, 120px)",
                    fontWeight: 700, color: "#CE1010", lineHeight: 1,
                    letterSpacing: "-0.02em",
                    margin: "12px 0 8px",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s 0.05s, transform 0.5s 0.05s",
                  }}>
                    <CountUp target={4.9} trigger={visible} duration={1600} />M
                  </div>

                  <p style={{
                    fontSize: "clamp(24px, 6vw, 50px)",
                    fontWeight: 700, color: "#343434", lineHeight: 1.2,
                    margin: "16px 0 24px",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s 0.1s, transform 0.5s 0.1s",
                  }}>
                    Background<br />Verifications
                  </p>

                  <p style={{
                    fontSize: 30,
                    color: "#5a6874",
                    margin: 0,
                    fontWeight: 300,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s 0.15s, transform 0.5s 0.15s",
                    lineHeight: "36px",
                  }}>
                    conducted last year to build this report,
                  </p>
                </div>
              </div>

              {/* Right: Aims card */}
              <div>
                <div style={{
                  background: "#EEEEEE",
                  borderRadius: 28,
                  padding: "44px 48px",
                  border: "1px solid #e8e8e8",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(24px)",
                  transition: "opacity 0.6s 0.2s, transform 0.6s 0.2s",
                }}>
                  <p style={{
                    fontSize: 16, color: "#343434",
                    fontWeight: 700, marginBottom: 28,
                    letterSpacing: "0.5px",
                  }}>
                    with the aim of
                  </p>
                  <ul style={{
                    listStyle: "none", padding: 0, margin: 0,
                    display: "flex", flexDirection: "column",
                    gap: 20,
                  }}>
                    {AIMS.map((aim, i) => (
                      <li key={i} style={{
                        display: "flex", gap: 16, alignItems: "flex-start",
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(12px)",
                        transition: `opacity 0.4s ${0.25 + i * 0.08}s, transform 0.4s ${0.25 + i * 0.08}s`,
                      }}>
                        <span style={{
                          flexShrink: 0, width: 8, height: 8,
                          borderRadius: "50%", background: "#d93025", marginTop: 9,
                        }} />
                        <span style={{
                          fontSize: 20, color: "#2c3e4f",
                          lineHeight: 1.6, fontWeight: 400,
                        }}>
                          {aim}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Workforce Timeline Section (unchanged) ── */}
      <div className="rounded-xl" ref={sectionRef} style={{ height: isMobile ? "80vh" : "400vh", position: "relative", marginTop: 0 }}>
        <div style={{
          position: "sticky", top: 0, height: isMobile ? "80vh" : "105vh",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          background: "#fff",
          justifyContent: "center",
          paddingBottom: isMobile ? "0px" : "60px",
        }}>
          <div style={{ padding: "0", textAlign: "center", marginBottom: isMobile ? 28 : 52 }}>
            <h2
              className="sm:text-[105px] text-[38px]"
              style={{
                fontFamily: "'Inter',sans-serif",
                fontWeight: 700, color: "#CE1010",
                lineHeight: 1.05, margin: "0 0 16px",
                padding: isMobile ? "0 12px" : 0,
              }}
            >
              The Workforce<br />Behind Every Order
            </h2>
            <p style={{
              fontSize: "30px",
              lineHeight: isMobile ? "20px" : "40px",
              color: "#343434",
              maxWidth: 1100,
              margin: "0 auto 10px",
              padding: isMobile ? "0 16px" : 0,
              fontWeight: 300,
              textAlign: "center",
            }}>
              India's doorstep economy operates at the intersection of logistics,
              technology, and human workforce. But that wasn't the case 15 years ago.
              Let's look at how the gig economy evolved with various business models
              over the last 3 decades.
            </p>
            <p style={{ fontSize: isMobile ? 13 : 16, color: "#aaa", fontStyle: "italic", margin: 0 }}>
              Sources:{" "}
              {["Kearney", "Young Urban Project", "Shiproket"].map((s) => (
                <a
                  key={s}
                  href="https://www.youngurbanproject.com/what-is-quick-commerce/"
                  target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: "underline", cursor: "pointer", color: "#aaa", marginRight: 6 }}
                  onMouseEnter={(e) => e.target.style.color = "#CE1010"}
                  onMouseLeave={(e) => e.target.style.color = "#aaa"}
                >
                  {s}
                </a>
              ))}
            </p>
          </div>

          <div style={{
            width: "100%",
            overflow: "visible",
            paddingLeft: isMobile ? "4vw" : "6vw",
            paddingRight: isMobile ? "4vw" : "6vw",
          }}>
            <div style={{
              display: "flex",
              gap: isMobile ? MOBILE_GAP : 48,
              transform: isMobile
                ? `translateX(${mobileTranslateX}px)`
                : `translateX(${desktopTranslateX})`,
              willChange: "transform",
              transition: "transform 0.08s linear",
            }}>
              {TIMELINE.map((item, i) => (
                <TimelineCard
                  key={item.year}
                  item={item}
                  entrance={cardEntrance(i)}
                  isMobile={isMobile}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* <div style={{ height: isMobile ? "40px" : "80px" }} /> */}
        </div>
      </div>
    </>
  );
}