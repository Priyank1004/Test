import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { clamp, ease } from "./helpers";
import '../index.css'

export default function TrustSection() {
  const sectionRef = useRef(null);
  const [p, setP] = useState(-1);
  const [vw, setVw] = useState(0);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = vw > 0 && vw < 600;

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = el.offsetHeight - window.innerHeight;

      const triggerOffset = window.innerHeight * 0.5;
      const adjustedScrolled = scrolled + triggerOffset;
      const adjustedTotal = total + triggerOffset;

      if (adjustedTotal <= 0) {
        setP(-1);
      } else if (adjustedScrolled < 0) {
        setP(0);
      } else if (adjustedScrolled > adjustedTotal) {
        setP(-1);
      } else {
        setP(adjustedScrolled / adjustedTotal);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lp = (start, end) =>
    ease(clamp((p - start) / (end - start), 0, 1));

  const ghost = lp(0.05, 0.95);
  const gY = 120 - ghost * 150;

  // Desktop animated overlay — unchanged
  const overlay = (
    <div style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 9999,
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        left: "18%",
        top: "25%",
        width: 590,
        transform: `translateY(calc(${gY}vh - 25%))`,
        background: "rgba(243,242,242,0.75)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderRadius: 8,
        padding: "16px 22px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}>
        <p style={{
          fontSize: 26, color: "#343434", lineHeight: "30px",
          fontFamily: "Inter", margin: 0, fontWeight: 300,
        }}>
          When speed and scale take priority, due diligence
          slips and blind spots widen. That's exactly what is
          happening in the gig economy today.
        </p>
      </div>

      <div style={{
        position: "absolute",
        right: "18%",
        top: "58%",
        width: 590,
        transform: `translateY(calc(${gY}vh - 58%))`,
        background: "rgba(243,242,242,0.75)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderRadius: 8,
        padding: "16px 22px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}>
        <p style={{
          fontSize: 26, color: "#343434", lineHeight: "30px",
          fontFamily: "Inter", margin: 0, fontWeight: 300,
        }}>
          Identity swaps, impersonation, and hidden criminal
          histories do more than disrupt operations. They put
          safety, credibility, and customer trust at risk.
        </p>
      </div>
    </div>
  );

  // ── MOBILE — static layout, ghost blocks stacked below trust text ──
  if (isMobile) {
    return (
      <div
        id="dots-png"
        ref={sectionRef}
        style={{ padding: "40px 6vw 32px" }}
      >
        {/* Trust text block */}
        <div style={{ textAlign: "center", lineHeight: 1.08, marginBottom: 20 }}>
          <div>
            <span style={{
              fontFamily: "Inter", fontWeight: 600, color: "#1A3BB0",
              display: "block", lineHeight: 1.0,
              fontSize: "clamp(36px, 9vw, 56px)",
            }}>Trust,</span>
          </div>

          <div style={{
            display: "flex", alignItems: "baseline",
            justifyContent: "center", gap: "0.2em", flexWrap: "wrap",
          }}>
            <span style={{
              fontFamily: "Inter", fontWeight: 300, color: "#5D5D5D",
              lineHeight: 1.0, fontSize: "clamp(34px, 8.5vw, 54px)",
            }}>however is </span>
            <span style={{
              fontFamily: "Inter", fontWeight: 700, color: "#343434",
              lineHeight: 1.05, marginLeft: "8px",
              fontSize: "clamp(34px, 8.5vw, 54px)",
            }}>fragile.</span>
          </div>

          <div>
            <span style={{ fontFamily: "Inter", fontWeight: 700, color: "#CE1010", fontSize: "clamp(34px, 8.5vw, 54px)" }}>One </span>
            <span style={{ fontFamily: "Inter", fontWeight: 400, color: "#5d5d5d", fontSize: "clamp(34px, 8.5vw, 54px)" }}>news headline.</span>
          </div>
          <div>
            <span style={{ fontFamily: "Inter", fontWeight: 700, color: "#CE1010", fontSize: "clamp(34px, 8.5vw, 54px)" }}>One </span>
            <span style={{ fontFamily: "Inter", fontWeight: 400, color: "#5d5d5d", fontSize: "clamp(34px, 8.5vw, 54px)" }}>breach.</span>
          </div>
          <div>
            <span style={{ fontFamily: "Inter", fontWeight: 700, color: "#CE1010", fontSize: "clamp(34px, 8.5vw, 54px)" }}>One </span>
            <span style={{ fontFamily: "Inter", fontWeight: 400, color: "#5d5d5d", fontSize: "clamp(34px, 8.5vw, 54px)" }}>bad experience</span>
          </div>

          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: "13px", color: "#343434", lineHeight: 1.6, margin: 0 }}>
              is all it takes to undo years of hard-earned customer confidence.
            </p>
          </div>
        </div>

        {/* Ghost block 1 — static, below trust text */}
        <div style={{
          background: "rgba(243,242,242,0.9)",
          borderRadius: 8,
          padding: "14px 16px",
          marginBottom: 12,
        }}>
          <p style={{
            fontSize: "14px", color: "#343434", lineHeight: "22px",
            fontFamily: "Inter", margin: 0, fontWeight: 300,
          }}>
            When speed and scale take priority, due diligence
            slips and blind spots widen. That's exactly what is
            happening in the gig economy today.
          </p>
        </div>

        {/* Ghost block 2 — static, below ghost 1 */}
        <div style={{
          background: "rgba(243,242,242,0.9)",
          borderRadius: 8,
          padding: "14px 16px",
        }}>
          <p style={{
            fontSize: "14px", color: "#343434", lineHeight: "22px",
            fontFamily: "Inter", margin: 0, fontWeight: 300,
          }}>
            Identity swaps, impersonation, and hidden criminal
            histories do more than disrupt operations. They put
            safety, credibility, and customer trust at risk.
          </p>
        </div>
      </div>
    );
  }

  // ── DESKTOP / TABLET — completely unchanged ──
  return (
    <>
      {p >= 0 && createPortal(overlay, document.body)}

      <div
        id="dots-png"
        ref={sectionRef}
        style={{ position: "relative", height: "280vh" }}
      >
        <div style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "0 6vw",
        }}>
          <div style={{
            position: "relative",
            textAlign: "center",
            zIndex: 1,
            lineHeight: 1.08,
          }}>
            <div>
              <span style={{
                fontFamily: "Inter", fontWeight: 600, color: "#1A3BB0",
                display: "block", lineHeight: 1.0,
                fontSize: "clamp(40px, 8vw, 110px)",
              }}>Trust,</span>
            </div>

            <div style={{
              display: "flex", alignItems: "baseline",
              justifyContent: "center", gap: "0.2em", flexWrap: "wrap",
            }}>
              <span style={{
                fontFamily: "Inter", fontWeight: 300, color: "#5D5D5D",
                lineHeight: 1.0, fontSize: "clamp(38px, 7.5vw, 105px)",
              }}>however is </span>
              <span style={{
                fontFamily: "Inter", fontWeight: 700, color: "#343434",
                lineHeight: 1.05, marginLeft: "14px",
                fontSize: "clamp(38px, 7.5vw, 105px)",
              }}>fragile.</span>
            </div>

            <div>
              <span style={{ fontFamily: "Inter", fontWeight: 700, color: "#CE1010", fontSize: "clamp(38px, 7.5vw, 105px)" }}>One </span>
              <span style={{ fontFamily: "Inter", fontWeight: 400, color: "#5d5d5d", fontSize: "clamp(38px, 7.5vw, 105px)" }}>news headline.</span>
            </div>
            <div>
              <span style={{ fontFamily: "Inter", fontWeight: 700, color: "#CE1010", fontSize: "clamp(38px, 7.5vw, 105px)" }}>One </span>
              <span style={{ fontFamily: "Inter", fontWeight: 400, color: "#5d5d5d", fontSize: "clamp(38px, 7.5vw, 105px)" }}>breach</span>
            </div>
            <div>
              <span style={{ fontFamily: "Inter", fontWeight: 700, color: "#CE1010", fontSize: "clamp(38px, 7.5vw, 105px)" }}>One </span>
              <span style={{ fontFamily: "Inter", fontWeight: 400, color: "#5d5d5d", fontSize: "clamp(38px, 7.5vw, 105px)" }}>bad experience.</span>
            </div>

            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: "20px", color: "#343434", lineHeight: 1.6, margin: 0 }}>
                is all it takes to undo years of hard-earned customer confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}