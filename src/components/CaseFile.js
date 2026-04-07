import { useInView } from "./helpers";
import { useState, useEffect } from "react";

export default function CaseFilesSection() {
  const [ref, visible] = useInView(0.15);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{
      background: "linear-gradient(160deg, #0a0a18 0%, #111827 100%)",
      padding: "30px 6vw 80px",
      textAlign: "center",
    }}>

      {/* "Case Files" big heading */}
      <h1 className="sm:text-[140px] text-[120px]" style={{
        fontFamily: "'Inter','Helvetica Neue',sans-serif",
        fontWeight: 700,
        background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(180,180,200,0.55) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        lineHeight: 1.0, margin: "0 0 18px",
        fontSize: isMobile ? "48px" : "120px",
      }}>
        Case Files
      </h1>
      <p style={{
        fontFamily: "Inter",
        fontSize: isMobile ? "19px" : "30px",
        color: "rgba(255,255,255,1)",
        marginBottom: 35,
      }}>
        A closer look at real employee fraud cases
      </p>

      {/* Case title */}
      <h2 style={{
        fontFamily: "Inter",
        fontSize: isMobile ? "20px" : "45px",
        fontWeight: 800, color: "white",
        marginBottom: 40,
      }}>
        The Fake Referral Ring
      </h2>

      {/* Two suspect cards */}
      <div ref={ref} style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 20, maxWidth: 980,
        margin: "0 auto",
      }}>

        {/* Suspect 1 */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 16,
          padding: isMobile ? "24px 20px" : "32px 28px",
          textAlign: "left",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s, transform 0.6s",
        }}>
          <p style={{
            fontFamily: "Inter",
            fontSize: isMobile ? "18px" : 24,
            fontWeight: 700,
            color: "#CE1010", marginBottom: 28,
            letterSpacing: 0.2,
          }}>Suspect 1</p>

          <div style={{ display: "flex", gap: isMobile ? 16 : 24, alignItems: "flex-start" }}>
            {/* Info */}
            <div style={{ flex: 1 }}>
              {[
                { label: "Name", value: "Vishal Taleja" },
                { label: "Date of Birth", value: "18th April 1995" },
                { label: "Gender", value: "Male" },
              ].map(row => (
                <div key={row.label} style={{ marginBottom: isMobile ? 14 : 20 }}>
                  <p style={{
                    fontFamily: "Inter",
                    fontSize: isMobile ? "12px" : 14,
                    color: "rgba(255,255,255,0.45)",
                    margin: "0 0 4px",
                  }}>{row.label}</p>
                  <p style={{
                    fontFamily: "Inter",
                    fontSize: isMobile ? "15px" : 22,
                    fontWeight: 700, color: "white",
                    margin: 0,
                  }}>{row.value}</p>
                </div>
              ))}
            </div>

            {/* Suspect 1 Photo */}
            <div style={{
              width: isMobile ? 140 : 180,
              height: isMobile ? 168 : 216,
              flexShrink: 0,
              borderRadius: 8,
              overflow: "hidden",
              border: "14px solid rgba(255,255,255,1)",
            }}>
              <img
                src="/assets/suspect1.png"
                alt="Vishal Taleja"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>
          </div>
        </div>

        {/* Accomplices */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          padding: isMobile ? "24px 20px" : "32px 28px",
          textAlign: "left",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s 0.15s, transform 0.6s 0.15s",
        }}>
          <p style={{
            fontFamily: "Inter",
            fontSize: isMobile ? "18px" : 24,
            fontWeight: 700,
            color: "#CE1010", marginBottom: 28,
          }}>The Accomplice Vishal's friends</p>

          <div style={{ display: "flex", gap: isMobile ? 16 : 24, alignItems: "flex-start" }}>
            {/* Friends list */}
            <div style={{ flex: 1 }}>
              {["Rahul", "Chavan", "Trivam"].map((name, i) => (
                <div key={name} style={{ marginBottom: isMobile ? 14 : 22 }}>
                  <p style={{
                    fontFamily: "Inter",
                    fontSize: isMobile ? "12px" : 14,
                    color: "rgba(255,255,255,0.45)",
                    margin: "0 0 4px",
                  }}>Friend {i + 1}</p>
                  <p style={{
                    fontFamily: "Inter",
                    fontSize: isMobile ? "15px" : 22,
                    fontWeight: 700, color: "white",
                    margin: 0,
                  }}>{name}</p>
                </div>
              ))}
            </div>

            {/* Stacked friend photos */}
<div style={{
  position: "relative",
  width: isMobile ? "190px" : "230px",
  height: isMobile ? "220px" : "260px",
  flexShrink: 0,
}}>
  {/* Rahul — top left */}
  <div style={{
    position: "absolute",
    top: 0, left: 0,
    width: isMobile ? 88 : 108,
    height: isMobile ? 105 : 130,
    borderRadius: 6,
    border: "6px solid white",
    boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
    zIndex: 1,
    overflow: "hidden",
  }}>
    <img src="/assets/rahul.png" alt="Rahul"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
  </div>

  {/* Chavan — top right */}
  <div style={{
    position: "absolute",
    top: 0,
    left: isMobile ? 96 : 118,
    width: isMobile ? 88 : 108,
    height: isMobile ? 105 : 130,
    borderRadius: 6,
    border: "6px solid white",
    boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
    zIndex: 1,
    overflow: "hidden",
  }}>
    <img src="/assets/chavam.png" alt="Chavan"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
  </div>

  {/* Trivam — bottom center */}
  <div style={{
    position: "absolute",
    top: isMobile ? 118 : 114,
    left: isMobile ? 44 : 54,
    width: isMobile ? 88 : 108,
    height: isMobile ? 105 : 130,
     borderRadius: 6,
    border: "6px solid white",
    boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
    // border: "2px solid white",
    // boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
    zIndex: 0,
    overflow: "hidden",
        rotate:"7deg",
  }}>
    <img src="/assets/rahul.png" alt="Trivam"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
  </div>
</div>
          </div>
        </div>

      </div>
    </section>
  );
}