import { useEffect, useRef, useState } from "react";
import { clamp } from "./helpers";
import "../index.css";

export default function ImpactSection() {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keep scroll tracking but don't use it for animations on web
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = clamp(-rect.top / (el.offsetHeight - window.innerHeight), 0, 1);
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={sectionRef} style={{ height: "auto", position: "relative" }}>
      <div
        style={{
          position: "relative",
          top: 0,
          height: "auto",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top half — dark */}
        <div
          style={{
            flex: 1,
            background: "#0a0a12",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: isMobile ? "40px 13px 40px" : "72px 80px 120px",
            textAlign: "center",
          }}
        >
          {!isMobile && (
            <div style={{ position: "absolute", top: 0, right: -450, zIndex: 0 }}>
              <img src="/assets/Ellipse.png" alt="ellipse" style={{ width: "900px", height: "900px", opacity: 1 }} />
            </div>
          )}

          {/* Faint grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
                "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: 1200,
            }}
          >
            {/* Title */}
            <h2
              style={{
                fontFamily: "'Inter','Helvetica Neue',sans-serif",
                fontSize: isMobile ? "22px" : "60px",
                fontWeight: 700,
                color: "white",
                margin: isMobile ? "0 0 20px" : "0 0 36px",
                lineHeight: isMobile ? 1.2 : "115%",
              }}
            >
              The Impact of the fraud We Caught
            </h2>

            {/* Para 1 */}
            <p
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: isMobile ? "12px" : "30px",
                lineHeight: isMobile ? 1.5 : "115%",
                margin: isMobile ? "0 auto 20px" : "0 auto 40px",
                maxWidth: 990,
                fontFamily: "'Inter',sans-serif",
              }}
            >
              Even one missed red flag in any of these segments can increase the
              risk of{" "}
              <br className="sm:flex hidden" />
              high-value cargo being stolen, a customer being mistreated, or
              possible <br className="sm:flex hidden" />
              food adulteration in a dark store. Incidents such as this
            </p>

            {/* Amount */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: isMobile ? "42px" : "105px",
                  fontWeight: 700,
                  color: "#ce1010",
                  fontFamily: "'Inter',sans-serif",
                  lineHeight: 1,
                }}
              >
                ₹
              </span>
              <span
                style={{
                  fontSize: isMobile ? "42px" : "120px",
                  fontWeight: 700,
                  color: "white",
                  fontFamily: "'Inter','Helvetica Neue',sans-serif",
                  lineHeight: 1,
                }}
              >
                1.21 Crore
              </span>
            </div>

            {/* Para 2 */}
            <p
              style={{
                color: "rgba(255,255,255,0.92)",
                fontSize: isMobile ? "12px" : "30px",
                lineHeight: isMobile ? 1.5 : "115%",
                margin: "0 auto",
                maxWidth: 990,
                marginTop: isMobile ? 16 : 40,
                marginBottom: isMobile ? 16 : 40,
                fontFamily: "'Inter',sans-serif",
              }}
            >
              truck robbery involving smartphones, apparel, and perfumes
              highlight how gaps in background screening can increase exposure
              to serious financial losses and erode customer trust.
            </p>

            {/* Source */}
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: isMobile ? 11 : 13,
                fontFamily: "'Inter',sans-serif",
                fontStyle: "italic",
                margin: 0,
                position: "relative",
                zIndex: 2,
              }}
            >
              Source:{" "}
              <a
                href="https://www.logisticsinsider.in/%E2%82%B91-21-crore-worth-of-iphones-stolen-from-flipkart-truck-in-punjab/"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  textDecoration: "underline",
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
              >
                Logistics Insider
              </a>
            </p>

            <div
              id="gradient-bg"
              style={{
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: isMobile ? "24px 16px 24px" : "52px 80px 48px",
                textAlign: "center",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}