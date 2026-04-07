import { useEffect, useRef, useState } from "react";
import { clamp, ease } from "./helpers";

const TIMELINE = [
  { year: "1999", desc: "The first online shopping platform gained traction.", title: "Medium", sub: "Courier services", tilt: -2.5 },
  { year: "2015", desc: "A social media platform introduced shoppable tags, where people could directly sell on the platform.", title: "Medium", sub: "Fleet operators", tilt: 1.8 },
  { year: "2017", desc: "E-commerce platforms offered same-day delivery services to compete on speed and reach. Premium members.", title: "Medium", sub: "Fleet operators + delivery drivers", tilt: -1.5 },
  { year: "2019", desc: "Food delivery platforms competed for speed promising delivery in 10–15 minutes from micro-fulfillment centers.", title: "Medium", sub: "Delivery Partners + Dark stores", tilt: 2.2 },
  { year: "2021", desc: "Quick commerce gained popularity for providing sub-15 minute delivery for premium products.", title: "Medium", sub: "Delivery Partners + Dark stores", tilt: -1.8 },
  { year: "2025", desc: "On-demand services (cleaning, cooking, etc) can be booked instantly.", title: "Medium", sub: "For everything instantly", tilt: 1.2 },
];

const MOBILE_CARD_W = 210;
const MOBILE_GAP = 12;
const TOTAL_MOBILE_RAIL_W =
  TIMELINE.length * MOBILE_CARD_W + (TIMELINE.length - 1) * MOBILE_GAP;

function TimelineCard({ item, entrance, isMobile, index }) {
  const cardWidth = isMobile ? MOBILE_CARD_W : 300;   // reduced from 360
  const imgHeight = isMobile ? 100 : 155;              // reduced from 130 / 200

  return (
    <div style={{
      opacity: entrance,
      transform: `scale(${0.88 + entrance * 0.12}) rotate(${item.tilt}deg)`,
      transformOrigin: "50% 0%",
      willChange: "transform, opacity",
      flexShrink: 0,
      transition: "opacity 0.35s ease-out, transform 0.45s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
    }}>
      <div style={{
        width: cardWidth,
        background: "#fff",
        borderRadius: 20,
        border: "2px solid #D7D7D7",
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: isMobile ? "10px 12px 6px" : "16px 20px 10px" }}>
            <div style={{
              display: "inline-block", color: "#CE1010",
              fontSize: isMobile ? 18 : 26,
              fontWeight: 800,
              fontFamily: "'Inter',sans-serif", letterSpacing: -0.5, marginBottom: 6,
            }}>{item.year}</div>
            <p style={{
              fontSize: isMobile ? 12 : 14,
              color: "#444", lineHeight: 1.55,
              fontFamily: "'Inter',sans-serif", margin: 0,
            }}>{item.desc}</p>
          </div>
          <div style={{ padding: isMobile ? "4px 12px 8px" : "8px 20px 10px", flex: 1 }}>
            <p style={{ fontSize: isMobile ? 13 : 18, fontWeight: 800, color: "#1a1a1a", fontFamily: "'Inter',sans-serif", marginBottom: 2 }}>{item.title}</p>
            <p style={{ fontSize: isMobile ? 11 : 13, color: "#888", fontFamily: "'Inter',sans-serif", lineHeight: 1.4, margin: 0 }}>{item.sub}</p>
          </div>
        </div>
        <div style={{ margin: isMobile ? "0 8px 8px" : "0 12px 12px", borderRadius: 10, overflow: "hidden", height: imgHeight, background: "#f5f5f5" }}>
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

export default function Workforce() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const [isTablet, setIsTablet] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth < 1024
  );
  const [vw, setVw] = useState(
    () => (typeof window !== "undefined" ? window.innerWidth : 1440)
  );
  const [vh, setVh] = useState(
    () => (typeof window !== "undefined" ? window.innerHeight : 900)
  );

  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setVw(window.innerWidth);
      setVh(window.innerHeight);
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

  const railShift = ease(clamp(progress / 0.95, 0, 1));

  const cardEntrance = (i) => {
    if (i === 0) return 1;
    const start = i * 0.06;
    const end = start + 0.14;
    return ease(clamp((progress - start) / (end - start), 0, 1));
  };

  const mobileInitial = vw * 0.25;
  const mobileEnd = -(TOTAL_MOBILE_RAIL_W - vw + 32);
  const mobileTranslateX = mobileInitial * (1 - railShift) + mobileEnd * railShift;
  const desktopTranslateX = `calc(${93 - railShift * 130}%)`;

  const sectionH = vh + (isMobile ? vh * 0.6 : vh * 1.5);

  const titleSize = isMobile ? "clamp(32px, 10vw, 52px)" : isTablet ? "clamp(52px, 8vw, 80px)" : "clamp(64px, 7vw, 105px)";
  const bodySize  = isMobile ? "clamp(13px, 3.5vw, 16px)" : isTablet ? "clamp(16px, 2.5vw, 22px)" : "clamp(18px, 1.8vw, 30px)";

  return (
    <div
      className="rounded-xl"
      ref={sectionRef}
      style={{ height: sectionH, position: "relative", marginTop: 0 }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          // height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          justifyContent: "center",
          paddingTop: isMobile ? 20 : 40,
          paddingBottom: isMobile ? 20 : 60,
          boxSizing: "border-box",
        }}
      >
        {/* Header text block */}
        <div style={{
          textAlign: "center",
          marginBottom: isMobile ? 20 : isTablet ? 32 : 48,
          paddingLeft: isMobile ? 16 : 24,
          paddingRight: isMobile ? 16 : 24,
        }}>
          <h2 style={{
            fontFamily: "'Inter',sans-serif",
            fontWeight: 700,
            color: "#CE1010",
            lineHeight: 1.05,
            margin: "0 0 12px",
            fontSize: titleSize,
          }}>
            The Workforce<br />Behind Every Order
          </h2>
          <p style={{
            fontSize: bodySize,
            lineHeight: isMobile ? 1.5 : 1.4,
            color: "#343434",
            maxWidth: 1100,
            margin: "0 auto 10px",
            fontWeight: 300,
            textAlign: "center",
          }}>
            India's doorstep economy operates at the intersection of logistics,
            technology, and human workforce. But that wasn't the case 15 years ago.
            Let's look at how the gig economy evolved with various business models
            over the last 3 decades.
          </p>
          <p style={{ fontSize: isMobile ? 11 : 14, color: "#aaa", fontStyle: "italic", margin: 0 }}>
            Sources:{" "}
            {["Kearney", "Young Urban Project", "Shiproket"].map((s) => (
              <a
                key={s}
                href="https://www.youngurbanproject.com/what-is-quick-commerce/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline", cursor: "pointer", color: "#aaa", marginRight: 6 }}
                onMouseEnter={(e) => (e.target.style.color = "#CE1010")}
                onMouseLeave={(e) => (e.target.style.color = "#aaa")}
              >
                {s}
              </a>
            ))}
          </p>
        </div>

        {/* Card rail */}
        <div style={{ width: "100%", overflow: "hidden", paddingBottom: 40 }}>
          <div style={{
            display: "flex",
            gap: isMobile ? MOBILE_GAP : isTablet ? 24 : 32,  // reduced from 32 / 48
            alignItems: "flex-start",
            paddingLeft: isMobile ? "4vw" : "6vw",
            paddingRight: isMobile ? "4vw" : "6vw",
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
      </div>
    </div>
  );
}