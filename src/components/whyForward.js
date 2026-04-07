import { useEffect, useState } from "react";
import { useInView } from "./helpers";

export default function WayForwardSection() {
  const [ref, visible] = useInView(0.15);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="flex justify-center" style={{
      background: "black",
      position: "relative",
      padding: isMobile ? "30px 5vw 50px" : "90px 5vw 100px",
      color: "white",
      fontFamily: "'Inter', sans-serif",
      maxWidth: "100%",
      overflow: "hidden",
    }}>

      <div className="max-w-7xl w-full">

        {/* Ellipse — hidden on mobile to avoid overflow */}
        {!isMobile && (
          <div style={{ position: "absolute", top: 40, left: 190, zIndex: 0 }}>
            <img src="/assets/Ellipse.png" alt="" style={{ width: "1200px", height: "760px" }} />
          </div>
        )}

        {/* Main Title */}
        <h2
          className="sm:text-[96px] text-[48px]"
          style={{
            fontWeight: 700,
            fontFamily: "'Inter',sans-serif",
            background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(170,170,200,0.5) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            marginBottom: isMobile ? "36px" : "70px",
            lineHeight: "1.05",
            fontSize: isMobile ? "36px" : "120px",
          }}
        >
          Way Forward
        </h2>

        <div
          ref={ref}
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(50px)",
            transition: "all 1s ease-out",
          }}
        >
          <div style={{ paddingTop: "10px" }}>

            {/* Subheading */}
            <h2
              className="text-center"
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: isMobile ? "18px" : "30px",
                lineHeight: "1.45",
                marginBottom: isMobile ? "18px" : "26px",
                fontWeight: 600,
                padding: isMobile ? "0 4px" : 0,
              }}
            >
              The gig economy is set to grow from 1 crore workers in 2025 to 2.35 crore by 2029–30.
            </h2>

            {/* Body paragraph */}
            <p
              className="text-center"
              style={{
                fontSize: isMobile ? "15px" : "30px",
                lineHeight: isMobile ? 1.6 : "40px",
                fontWeight: 300,
                marginBottom: "20px",
                color: "white",
                padding: isMobile ? "0 4px" : 0,
              }}
            >
              But such massive growth in hiring also puts the industry under regulators' risk radar.
              <br className="sm:flex hidden" />
              Think about how many delivery agents you meet in a day.
              <br />
              <span
                style={{
                  display: "block",
                  marginTop: isMobile ? "14px" : "20px",
                  marginBottom: isMobile ? "14px" : "20px",
                  fontSize: isMobile ? "18px" : "30px",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Now imagine the impact if even one of those interactions goes wrong.
              </span>
              <br className="sm:flex hidden" />
              With millions of daily customer touchpoints, companies are doubling down
              <br className="sm:flex hidden" />
              on making gig workers as secure and verified as their white-collar counterparts.
              <br className="sm:flex hidden" />
              In fact, AI-powered solutions already exist to keep fraudsters out of your gig workforce.
            </p>

            {/* "Are you ready" block */}
            {isMobile ? (
              /* Mobile: stacked, no side-by-side ? */
              <div style={{ textAlign: "center" }}>
                <h2
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "32px",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    marginBottom: "12px",
                  }}
                >
                  The real question is —
                </h2>
                <h2
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "32px",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    color: "#CE1010",
                    marginBottom: "6px",
                  }}
                >
                  Are you ready to make that change?
                </h2>
              </div>
            ) : (
              /* Desktop: unchanged side-by-side layout */
              <div className="flex items-center justify-center">
                <div>
                  <h2
                    className="sm:text-[70px] text-[35px] text-center"
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      marginBottom: "26px",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    The real question is -{" "}
                    <span className="sm:text-[70px] text-[35px] text-[#CE1010]">
                      Are you ready to make that change
                    </span>
                  </h2>
                </div>
                <h2
                  className="sm:text-[125px] text-[75px] text-center text-[#CE1010]"
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    lineHeight: "1.35",
                    marginBottom: "26px",
                    fontWeight: 700,
                  }}
                >?</h2>
              </div>
            )}
          </div>
        </div>

        {/* Infinite Logo Carousel */}
        <div style={{
          marginTop: isMobile ? "40px" : "80px",
          overflow: "hidden",
          width: "100%",
          position: "relative",
        }}>
          {/* Fade edges */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: isMobile ? "60px" : "120px", zIndex: 2,
            background: "linear-gradient(to right, black, transparent)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            width: isMobile ? "60px" : "120px", zIndex: 2,
            background: "linear-gradient(to left, black, transparent)",
            pointerEvents: "none",
          }} />

          <style>{`
            @keyframes scroll-logos {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .logo-track {
              display: flex;
              gap: ${isMobile ? "32px" : "64px"};
              width: max-content;
              animation: scroll-logos 18s linear infinite;
              align-items: center;
            }
          `}</style>

          <div className="logo-track">
            {[
              "zomato.png","blinkit.png","flipkart.png",
              "blackbug.png","porter.png","uber.png","asianpaint.png",
              "zomato.png","blinkit.png","flipkart.png",
              "blackbug.png","porter.png","uber.png","asianpaint.png",
            ].map((logo, i) => (
              <div key={i} style={{
                width: isMobile ? "56px" : "80px",
                height: isMobile ? "56px" : "80px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <img
                  src={`/assets/${logo}`}
                  alt={logo.replace(".png", "")}
                  style={{
                    width: isMobile ? "70px" : "100px",
                    height: isMobile ? "70px" : "100px",
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)",
                    opacity: 0.75,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}