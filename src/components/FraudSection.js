import { useEffect, useRef, useState } from "react";

export default function FraudSection() {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const headingStyle = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    color: "white",
    textAlign: "center",
    margin: 0,
    fontSize: isMobile ? "30px" : "120px",
    lineHeight: isMobile ? "40.86px" : "130px",
    letterSpacing: "-0.04em",
  };

  return (
    <div ref={sectionRef} style={{ height: isMobile ? "auto" : "119vh", position: "relative" }}>
      <div
        style={{
          position: isMobile ? "relative" : "sticky",
          top: 0,
          height: isMobile ? "auto" : "120vh",
          overflow: "hidden",
          background: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: isMobile ? "60px 16px 40px" : "85px 64px 36px",
        }}
      >
        {/* Ellipse decoration — desktop only */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: -430,
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <img
              src="/assets/Ellipse.png"
              alt=""
              style={{ width: "900px", height: "900px" }}
            />
          </div>
        )}

        {/* Main heading */}
        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            zIndex: 1,
            opacity: 1,
            transform: "none",
            textAlign: "center",
            marginBottom: isMobile ? 8 : 12,
          }}
        >
          <h2 style={{ ...headingStyle }}>
            The Fraud Behind
            <br />
            the Workforce
          </h2>
        </div>

        {/* Subtitle */}
        <p
          style={{
            color: "white",
            fontSize: isMobile ? "12px" : "30px",
            fontWeight: 600,
            margin: isMobile ? "0 0 12px" : "0 0 20px",
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            zIndex: 1,
            opacity: 1,
            lineHeight: isMobile ? "18px" : "36px",
          }}
        >
          India's gig workforce has grown from
        </p>

        {/* Chart GIF */}
        <div
          style={{
            width: "100%",
            maxWidth: isMobile ? "100%" : 880,
            opacity: 1,
            transform: "none",
            zIndex: 1,
          }}
        >
          <img
            src="/assets/graph.gif"
            alt="Gig workforce growth chart"
            style={{ width: "100%", display: "block", borderRadius: 4 }}
          />
          <div style={{ textAlign: "center", marginTop: 6, marginBottom: 4, opacity: 1 }}>
            <span style={{ color: "rgba(255,255,255,0.38)", fontSize: isMobile ? 10 : 13, fontFamily: "'Inter', sans-serif" }}>
              Source:{" "}
              <a href="https://www.niti.gov.in/sites/default/files/2023-06/Policy_Brief_India%27s_Booming_Gig_and_Platform_Economy_27062022.pdf" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.58)", textDecoration: "underline" }}>
                Niti Ayog
              </a>
              {" "}and{" "}
              <a href="https://www.livemint.com/money/personal-finance/indias-gig-economy-in-2025-growth-formalisation-and-financial-inclusion-explained-11753438649777.html" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.58)", textDecoration: "underline" }}>
                Mint
              </a>
            </span>
          </div>
        </div>

        {/* Footer line */}
        <p
          style={{
            color: "white",
            fontSize: isMobile ? "13px" : "28px",
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
            margin: isMobile ? "8px 0 20px" : "8px 0 40px",
            maxWidth: 700,
            zIndex: 1,
            opacity: 1,
            lineHeight: "36px",
          }}
        >
          But as the workforce expands, fraud scales alongside it.
        </p>
      </div>
    </div>
  );
}