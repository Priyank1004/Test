import { useEffect, useRef, useState } from "react";

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

export default function WhyReportSection() {
  // Initialise synchronously so the first render already matches the viewport
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  // Pass isMobile so the hook re-runs whenever the layout branch switches
  const [ref, visible] = useVisible(isMobile);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
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
  );
}