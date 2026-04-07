import { useInView } from "./helpers";
import { useState, useEffect } from "react";

const CARDS = [
  {
    icon: "/assets/fraudulent1.png",
    title: "Inventory leakage in\nthe middle mile",
  },
  {
    icon: "/assets/fraudulent2.png",
    title: "Customer safety incidents\nin the last mile",
  },
  {
    icon: "/assets/fraudulent3.png",
    title: "Regulatory exposure\nin high-risk states",
  },
  {
    icon: "/assets/fraudulent4.png",
    title: "Brand damage amplified\nby digital virality",
  },
];

export default function FraudImpact() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [ref, visible] = useInView(0.2);
  const [headRef, headVisible] = useInView(0.3);

  return (
    <section style={{
      padding: isMobile ? "70px 6w 60px" : "100px 6vw 64px",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Large blue radial glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -40%)",
        width: isMobile ? "600px" : "1100px",
        height: isMobile ? "500px" : "900px",
        background: "radial-gradient(ellipse at center, rgba(30, 70, 220, 0.55) 0%, rgba(20, 50, 160, 0.30) 35%, rgba(10, 20, 80, 0.10) 60%, transparent 75%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Heading */}
      <div ref={headRef} style={{
        opacity: headVisible ? 1 : 0,
        transform: headVisible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s, transform 0.7s",
        marginBottom: 64,
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ position: "absolute", top: 0, right: 50, zIndex: 0 }}>
          <img src="/assets/Ellipse.png" alt="ellipse" style={{ width: "800px", height: "800px", opacity: 1 }} />
        </div>
        <h2 style={{
          fontFamily: "Inter",
          fontWeight: 700, color: "white",
          lineHeight: isMobile ? 1.2 : "115%", margin: "0 0 4px",
          fontSize: isMobile ? "30px" : "120px",
          position: "relative",
          zIndex: 1,
        }}>
          Every fraudulent
        </h2>
        <h2 style={{
          fontFamily: "Inter",
          fontWeight: 400, color: "rgba(255,255,255,1)",
          lineHeight: isMobile ? 1.2 : "115%", margin: 0,
          fontSize: isMobile ? "15px" : "60px",
          position: "relative",
          zIndex: 1,
        }}>
          employee we caught helped avoid
        </h2>
      </div>

      {/* 2×2 grid */}
      <div ref={ref} style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(380px, 580px))",
        gap: isMobile ? 24 : 16,
        width: "100%",
        maxWidth: 1000,
        marginBottom: isMobile ? 50 : 72,
        position: "relative",
        zIndex: 1,
      }}>
        {CARDS.map((card, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 14,
            padding: "14px 20px",
            display: "flex", alignItems: "center", gap: 24,
            textAlign: "left",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.6s ${i * 0.12}s, transform 0.6s ${i * 0.12}s`,
          }}>
            {/* Icon box */}
            <div style={{
              width: 70, height: 60, flexShrink: 0,
              background: "#000",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
              <img
                src={card.icon}
                alt=""
                style={{ width: 52, height: 52, objectFit: "contain" }}
              />
            </div>
            <p style={{
              fontFamily: "Inter",
              fontSize: isMobile ? "18px" : "30px",
              color: "rgba(255,255,255,1)",
              lineHeight: isMobile ? 1.4 : "36px", margin: 0,
              fontWeight: 300,
              whiteSpace: "pre-line",
            }}>{card.title}</p>
          </div>
        ))}
      </div>

      {/* Footer text */}
      <div style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.7s 0.55s",
        position: "relative",
        zIndex: 1,
      }}>
        <p style={{
          fontFamily: "Inter",
          fontSize: isMobile ? "11px" : "30px",
          color: "white", fontWeight: 500,
          marginBottom: 12,
          lineHeight: isMobile ? 1.3 : "115%",
        }}>
          Let's look at two real cases we uncovered.
        </p>
        <p style={{
          fontFamily: "Inter",
          fontSize: isMobile ? "11px" : "30px",
          color: "white",
          lineHeight: isMobile ? 1.3 : "40px", margin: 0,
          fontWeight: 300,
        }}>
          In both instances, fraudsters tried to game the system.<br />
          Here's how their seemingly sophisticated tactics quickly unraveled.
        </p>
      </div>
    </section>
  );
}