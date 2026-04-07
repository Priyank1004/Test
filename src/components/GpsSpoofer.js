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
    <section className="flex justify-center" style={{
      background: "black",
      position: "relative",
      padding: isMobile ? "0px 20px 23px" : "90px 5vw 100px",
      color: "white",
      fontFamily: "'Inter', sans-serif",
    }}>
      <div className="max-w-5xl" style={{ width: "100%", margin: "0 auto" }}>

        <div style={{ position: "absolute", top: 40, left: 190, zIndex: 0, display: isMobile ? "none" : "block" }}>
          <img src="/assets/Ellipse.png" alt="ellipse" style={{ width: "1200px", height: "1000px" }} />
        </div>

        {/* Main Title */}
        <h1 className="sm:text-[96px] text-[120px]" style={{
          fontWeight: 700,
          fontFamily: "'Inter',sans-serif",
          background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(170,170,200,0.5) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
          marginBottom: isMobile ? "40px" : "70px",
          lineHeight: "1.05",
          fontSize: isMobile ? "48px" : "120px",
        }}>
          The GPS Spoofer
        </h1>

        <div ref={ref} style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "50% 50%",
          gap: isMobile ? "32px" : "50px",
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(50px)",
          transition: "all 1s ease-out",
          position: "relative",
          zIndex: 1,
        }}>

          {/* LEFT COL: Suspect card + Desktop timeline */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "32px" : "45px",
          }}>

            {/* Suspect card */}
            <div style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "14px",
              padding: isMobile ? "20px 18px" : "26px 24px",
            }}>
              <p style={{
                color: "#CE1010",
                fontSize: isMobile ? "18px" : "24px",
                fontWeight: 700,
                marginBottom: "20px",
              }}>Suspect 1</p>

              <div style={{
                display: "flex",
                gap: isMobile ? "16px" : "22px",
                flexDirection: "row",
                alignItems: "flex-start",
              }}>
                <div style={{ flex: 1 }}>
                  {[
                    { label: "Name",          value: "Vishal Taleja"    },
                    { label: "Date of Birth", value: "18th April 1995"  },
                    { label: "Gender",        value: "Male"             },
                  ].map((item) => (
                    <div key={item.label} style={{ marginBottom: isMobile ? "14px" : "20px" }}>
                      <p style={{ fontSize: isMobile ? "12px" : "13px", color: "rgba(255,255,255,0.45)", margin: "0 0 4px" }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: isMobile ? "14px" : "18.5px", fontWeight: 700, margin: 0 }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{
                  width: isMobile ? "100px" : "132px",
                  height: isMobile ? "100px" : "158px",
                  background: "#111",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  overflow: "hidden",
                  flexShrink: 0,
                }}>
                  <img
                    src="../../assets/a4.png"
                    alt="Vishal Taleja"
                    style={{ width: "100%", height: "100%", objectFit: "cover" , borderRadius: "8px", border: "8px solid white" }}
                  />
                </div>
              </div>
            </div>

            {/* ── Desktop-only timeline (restored) ── */}
            {!isMobile && (
              <div>
                <p style={{ color: "white", fontSize: "28px", fontWeight: 800, marginBottom: "18px" }}>
                  Timeline of events
                </p>
                <div style={{ lineHeight: "1.85", fontSize: "30px", fontWeight: 700, color: "#e0e0e0" , lineHeight: "40px"}}>
                  <strong>Day 1:</strong> Rohan's application was submitted<br /><br />
                  <strong>Day 2:</strong> During the Digital Address Verification call:<br />
                  <span>His GPS showed Delhi.<br />His IP address showed Faridabad.</span><br /><br />
                  <strong>Day 2 (Later):</strong> We detected a VPN signal. With help from a cousin, he attempted to mask his real location.
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COL: Story */}
          <div style={{
            paddingTop: isMobile ? "0" : "10px",
            textAlign: isMobile ? "center" : "left",
          }}>
            <h2 style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: isMobile ? "24px" : "59px",
              lineHeight: isMobile ? 1.4 : "1.35",
              marginBottom: isMobile ? "16px" : "26px",
              fontWeight: 700,
              textAlign: isMobile ? "center" : "left",
            }}>
              Rohan applied to be a truck driver at MPK Shipments Ltd.
            </h2>

            <p style={{ fontSize: isMobile ? "14px" : "18px", lineHeight: "1.78", fontWeight: 300, marginBottom: "16px", color: "white", textAlign: isMobile ? "center" : "left" }}>
              ...and the address verification revealed something even bigger.
            </p>

            <p style={{ fontSize: isMobile ? "14px" : "30px", lineHeight: isMobile ? "1.78" : "40px", fontWeight: 300, marginBottom: "16px", color: "white", textAlign: isMobile ? "center" : "left" }}>
              He was also flagged with two active FIRs linked to high-value cargo robbery,
              both filed by his previous employers. Rohan was aware of MPK's high-value laptop inventory. His plan was simple:
              steal the cargo, disappear, and leave no trace behind.
            </p>

            {/* <p style={{ fontSize: isMobile ? "14px" : "20px", lineHeight: "1.78", fontWeight: 300, color: "#e0e0e0", textAlign: isMobile ? "center" : "left" }}>
              Rohan was aware of MPK's high-value laptop inventory. His plan was simple:
              steal the cargo, disappear, and leave no trace behind.
            </p> */}

            <p style={{ fontSize: isMobile ? "14px" : "30px", lineHeight: isMobile ? "1.78" : "40px", fontWeight: 300, marginTop: "20px", color: "#e0e0e0", textAlign: isMobile ? "center" : "left" }}>
              The catch saved MPK Shipments Ltd. Several lakhs in potential cargo theft and
              exposed how sophisticated address fraud has become with GPS spoofing and VPN usage.
            </p>
          </div>

          {/* ── Mobile-only timeline (after story) ── */}
          {isMobile && (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "white", fontSize: "22px", fontWeight: 800, marginBottom: "20px", textAlign: "center" }}>
                Timeline of events
              </p>
              <div style={{ lineHeight: "1.85", fontSize: "15px", fontWeight: 600, color: "#e0e0e0", textAlign: "center" }}>
                <p style={{ marginBottom: "16px" }}>
                  <strong>Day 1:</strong> Rohan's application was submitted
                </p>
                <p style={{ marginBottom: "8px" }}>
                  <strong>Day 2:</strong> During the Digital Address Verification call:
                </p>
                <p style={{ marginBottom: "16px", color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>
                  His GPS showed Delhi.<br />His IP address showed Faridabad.
                </p>
                <p>
                  <strong>Day 2 (Later):</strong>{" "}
                  <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.75)" }}>
                    We detected a VPN signal. With help from a cousin, he attempted to mask his real location.
                  </span>
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}