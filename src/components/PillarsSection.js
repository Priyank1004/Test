import { useEffect, useState } from "react";
import { useInView } from "./helpers";

const IMAGES = ["speed.png", "scale.png", "trust.png"];
const SWAYS = ["hang-0", "hang-0", "hang-2"];

function PillarCard({ title, index, visible }) {

   const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);
  
  return (
    <div className="pillar-card" style={{
      flex: "1 1 280px", maxWidth: 360,
      transformOrigin: "50% 0%",
      opacity: visible ? 1 : 0,
      marginTop: visible ? 0 : -40,
      transition: `opacity 0.65s ${0.18 * index}s cubic-bezier(0.4,1.56,0.64,1),
                   margin-top 0.65s ${0.1 * index}s cubic-bezier(0.34,1.56,0.64,1)`,
      animation: visible
        ? `${SWAYS[index]} ${3.5 + index * 0.4}s ease-in-out ${0.18 * index}s infinite`
        : "none",
      borderRadius: 18,
      boxShadow: "8px 12px 28px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.1)",
    }}>
      <div style={{
        background: "white",
        borderRadius: 18,
        border: "1px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: isMobile ? "186px" : "auto",
      }}>
        <div style={{ paddingTop: 20, paddingBottom: 12, textAlign: "center" }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: "#CE1010", margin: "0 auto 12px",
          }} />
          <span className="pillar-card-title" style={{
            fontFamily: "'Inter','system-ui',sans-serif",
            fontWeight: 800, fontSize: 28,
            letterSpacing: 1,
            color: "#1a1a1a",
          }}>
            {title}
          </span>
        </div>

        <div style={{ width: "85%", height: 1, background: "rgba(0,0,0,0.08)", marginBottom: 12 }} />

        <div className="pillar-card-img" style={{ width: "95%", height: 240, overflow: "hidden", marginBottom: 16 }}>
          <img
            src={`/assets/${IMAGES[index]}`}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function PillarsSection() {
  const [ref, visible] = useInView(0.2);
  const [headRef, headVisible] = useInView(0.3);
     const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);

  return (
    <section className="pillars-section" style={{
      background: "white", padding: "0px 60px 120px",
      display: "flex", flexDirection: "column", alignItems: "center",
      overflow: "visible",
    }}>
      <style>{`
        @keyframes hang-0{0%,100%{transform:rotate(4deg)}50%{transform:rotate(-1.5deg)}}
        @keyframes hang-1{0%,100%{transform:rotate(2deg)}50%{transform:rotate(4.5deg)}}
        @keyframes hang-2{0%,100%{transform:rotate(3deg)}50%{transform:rotate(-0.5deg)}}
        @media (max-width: 640px) {
          .pillars-section {
            padding: 0px 0px 80px !important;
          }
          .pillars-row {
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            gap: 8px !important;
            padding: 10px 16px 32px !important;
            overflow-x: auto !important;
            justify-content: flex-start !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .pillars-row::-webkit-scrollbar { display: none; }
          .pillar-card {
  flex: 0 0 128px !important;  
  max-width: 128px !important; 
}
          .pillar-card-title {
            font-size: 14px !important;
          }
          .pillar-card-img {
            height: 100px !important;
          }
          .pillars-paragraph {
            font-size: 16px !important;
            padding: 0 16px !important;
            text-align: center !important;
          }
        }
      `}</style>

      <h2 className="mt-0 sm:mt-6 sm:text-[55px] text-[30px]" ref={headRef} style={{
        fontFamily: "'Inter','system-ui',sans-serif",
        fontWeight: 700,
        color: "#343434", textAlign: "center", marginBottom: isMobile ? 0 : 56,
        letterSpacing: 0,
        opacity: headVisible ? 1 : 0,
        transform: headVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s, transform 0.6s",
        fontSize: isMobile ? "22px" : "60px",
        marginTop: isMobile ? 20 : 0,
      }}>
        The three pillars of the gig economy
      </h2>

      <div ref={ref} className="pillars-row" style={{
        display: "flex", gap: 40,
        alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap",
        width: "100%", maxWidth: 1200,
        padding: "10px 24px 32px",
        overflow: "visible",
      }}>
        {["SPEED", "SCALE", "TRUST"].map((t, i) => (
          <PillarCard key={t} title={t} index={i} visible={visible} />
        ))}
      </div>

      <p className="pillars-paragraph" style={{
        marginTop:isMobile ? 0 : 48,
        fontFamily: "'Inter',sans-serif",
        fontSize: isMobile ? "10px" : "30px", color: "#333",
        textAlign: "center",
        width: "100%", maxWidth: 1200,
        lineHeight: "140%",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s 0.5s, transform 0.6s 0.5s",
      }}>
        When e-commerce <strong className="text-[#343434]">first entered India,</strong> people were{" "}
        <span style={{ color: "#CE1010", fontWeight: 700 }}>reluctant</span>{" "}
        to buy expensive <br/> things online.{" "}
        <strong>Today,</strong> however, these platforms have{" "}
        <strong>earned widespread trust.</strong>
      </p>
    </section>
  );
}