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

export default function Workforce() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const [vw, setVw] = useState(
    () => (typeof window !== "undefined" ? window.innerWidth : 1440)
  );

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
  const railShift = ease(clamp(progress / 0.95, 0, 1));
  const cardEntrance = (i) => {
    if (i === 0) return 1;
    const start = i * 0.04;
    const end   = start + 0.12;
    return ease(clamp((progress - start) / (end - start), 0, 1));
  };

  const mobileInitial = vw * 0.35;
  const mobileEnd = -(TOTAL_MOBILE_RAIL_W - vw + 32);
  const mobileTranslateX = mobileInitial * (1 - railShift) + mobileEnd * railShift;

  const desktopTranslateX = `calc(${93 - railShift * 130}%)`;

  return (
    <div className="rounded-xl" ref={sectionRef} style={{ height: isMobile ? "80vh" : "300vh", position: "relative", marginTop: 0 }}>
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
      </div>
    </div>
  );
}