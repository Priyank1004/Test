import { useEffect, useRef, useState } from "react";
import HeroCard from "./HeroCard";
import { lerp, clamp, ease } from "./helpers";
import '../index.css';

const CARDS = [
  { id: 1,  label: "Vehicle RC",      angle: 180,   rotate: -14, z: 26 },
  { id: 2,  label: "DL Verification", angle: 147.3, rotate: 9,   z: 27 },
  { id: 3,  label: "KYC Check",       angle: 114.5, rotate: -6,  z: 28 },
  { id: 4,  label: "Aadhaar",         angle: 81.8,  rotate: 5,   z: 29 },
  { id: 5,  label: "Face Match",      angle: 49.1,  rotate: -9,  z: 29 },
  { id: 6,  label: "PAN Card",        angle: 16.4,  rotate: 12,  z: 28 },
  { id: 7,  label: "Fraud Alert",     angle: 343.6, rotate: -5,  z: 27 },
  { id: 8,  label: "Bank Verify",     angle: 310.9, rotate: 11,  z: 28 },
  { id: 9,  label: "Credit Score",    angle: 278.2, rotate: -5,  z: 29 },
  { id: 10, label: "Background Chk",  angle: 245.5, rotate: -10, z: 28 },
  { id: 11, label: "Employment",      angle: 212.7, rotate: 9,   z: 27 },
];

export default function HeroSection() {
  const [progress, setProgress] = useState(0);
  const [vw, setVw]             = useState(0);
  const sectionRef              = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const p = clamp(
        -el.getBoundingClientRect().top / (el.offsetHeight * 0.62),
        0, 1
      );
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = vw > 0 && vw < 600;
  const isTablet = vw >= 600 && vw < 1024;

  /*
   * Gentle text scale: 0.92 → 1.0 as progress goes 0 → 0.75
   * Subtle opacity lift: 0.75 → 1.0 over the same window
   */
  const textEnterT  = ease(clamp(progress / 0.75, 0, 1));
  const textScale   = lerp(0.92, 1.0, textEnterT);
  const textOpacity = lerp(0.75, 1.0, textEnterT);

  /*
   * Responsive font sizes:
   * Desktop: 90px title, 52px subtitle (unchanged)
   * Tablet:  52px title, 30px subtitle
   * Mobile:  32px title, 18px subtitle
   */
  const titleFontSize    = isMobile ? "32px" : isTablet ? "52px" : "90px";
  const subtitleFontSize = isMobile ? "18px" : isTablet ? "28px" : "52px";

  /*
   * On mobile the card cluster sits in the upper-center of the viewport.
   * We shift the title slightly upward on mobile so it sits inside the
   * cluster area (matching the Figma reference), and keep desktop unchanged.
   *
   * Desktop: title centered (translateY 0), subtitle at top:62%
   * Mobile:  title nudged up to ~38% from top, subtitle at ~58%
   */
  const titleTopOffset    = isMobile ? "-8vh" : isTablet ? "-4vh" : "0px";
  const subtitleTopPct    = isMobile ? "48%"  : isTablet ? "60%"  : "62%";

  /*
   * Max-width for the text block — tighten on mobile so long words
   * don't break weirdly on narrow screens.
   */
  const textMaxWidth = isMobile ? "90vw" : "98vw";

  return (
    <div ref={sectionRef} style={{ height: "300vh", position: "relative" }}>
      <div
        id="home-banner"
        style={{
          position: "sticky",
          top: 30,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "clamp(32px, 4vw, 48px) clamp(32px, 4vw, 48px)",
          }}
        />

        {/* ── TITLE ── */}
        <div
          style={{
            position: "absolute",
            zIndex: 15,
            textAlign: "center",
            width: textMaxWidth,
            maxWidth: "1300px",
            opacity: textOpacity,
            transform: `translateY(${titleTopOffset}) scale(${textScale})`,
            willChange: "transform, opacity",
          }}
        >
          <h1
            style={{
              fontFamily: "Inter",
              fontSize: titleFontSize,
              fontWeight: 900,
              color: "white",
              margin: 0,
              lineHeight: 1.05,
              whiteSpace: "normal",
              overflowWrap: "normal",
              wordBreak: "keep-all",
              letterSpacing: "-0.02em",
            }}
          >
            Deception from
            <br />
            Click to the Doorstep
          </h1>
        </div>

        {/* ── SUBTITLE ── */}
        <div
          style={{
            position: "absolute",
            top: subtitleTopPct,
            left: "50%",
            transform: `translateX(-50%) scale(${textScale})`,
            width: textMaxWidth,
            maxWidth: "1300px",
            zIndex: 16,
            textAlign: "center",
            pointerEvents: "none",
            opacity: textOpacity,
            willChange: "transform, opacity",
          }}
        >
          <p
            style={{
              fontSize: subtitleFontSize,
              fontWeight: 500,
              color: "white",
              margin: 0,
              lineHeight: 1.3,
              opacity: 0.88,
              marginTop: isMobile ? "12px" : "30px",
            }}
          >
            A closer look at the risks in India's gig workforce.
          </p>
        </div>

        {/* ── Cards layer — untouched ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
            zIndex: 25,
          }}
        >
          {CARDS.map(c => (
            <HeroCard key={c.id} card={c} progress={progress} vw={vw} />
          ))}
        </div>
      </div>
    </div>
  );
}