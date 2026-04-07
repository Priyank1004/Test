import { useState, useEffect, useRef } from "react";

const MILES = [
  {
    id: "first", label: "First Mile",
    image: "/assets/firstMile.png",
    items: [
      { num: 1, title: "Warehouse pickers", desc: "Responsible for sorting goods at origin warehouses before dispatch." },
      { num: 2, title: "Dark-store associates", desc: "Operate out of high-density storage units in residential clusters." },
    ],
  },
  {
    id: "middle", label: "Middle Mile",
    image: "/assets/second-mile.png",
    items: [
      { num: 1, title: "Truck drivers", desc: "Transport goods between warehouses, hubs, and cities." },
      { num: 2, title: "Fleet operators", desc: "Manage movement from aggregation hubs to local distribution points." },
    ],
  },
  {
    id: "last", label: "Last Mile",
    image: "/assets/third-mile.png",
    items: [
      {
        num: 1,
        title: "Delivery partners",
        desc: "Handle final doorstep delivery - food, groceries, and parcels.",
      },
      {
        num: null,   // ← no number
        title: null, // ← no title
        desc: "Factors such as high attrition, constant churn, frequent relocation, and flexible partner-based models (vs. full-time employment) increase verification complexity and compliance risk across these segments.",
      },
    ],
  },
];

const ANIM_MS = 500;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

function MileContent({ mile, layout }) {
  // layout: "mobile" | "tablet" | "desktop"

  if (layout === "mobile") {
    return (
      <div style={{ width: "100%" }}>
        <div style={{
          width: "100%",
          aspectRatio: "4/3",
          borderRadius: 12,
          overflow: "hidden",
          background: "#f0eeeb",
          border: "1px solid #e5e5e5",
          marginBottom: 28,
        }}>
          <img
            src={mile.image}
            alt={mile.label}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px 16px",
        }}>
          {mile.items.map((item, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              {item.title && (
                <h3 style={{
                  fontFamily: "Inter",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1C43B9",
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}>
                  {item.num}.&nbsp;{item.title}
                </h3>
              )}
              <p style={{
                fontSize: "11px",
                color: "#5D5D5D",
                lineHeight: 1.65,
                fontFamily: "Inter",
                margin: 0,
              }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (layout === "tablet") {
    return (
      <div style={{ width: "100%" }}>
        {/* Image full-width on tablet */}
        <div style={{
          width: "100%",
          aspectRatio: "16/7",
          borderRadius: 12,
          overflow: "hidden",
          background: "#f0eeeb",
          border: "1px solid #e5e5e5",
          marginBottom: 32,
        }}>
          <img
            src={mile.image}
            alt={mile.label}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px 40px",
        }}>
          {mile.items.map((item, i) => (
            <div key={i}>
              {item.title && (
                <h3 style={{
                  fontFamily: "Inter",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#1C43B9",
                  marginBottom: 10,
                  lineHeight: 1.3,
                }}>
                  {item.num}.&nbsp;{item.title}
                </h3>
              )}
              <p style={{
                fontSize: "15px",
                color: "#5D5D5D",
                lineHeight: "22px",
                fontFamily: "Inter",
                margin: 0,
              }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div style={{
      display: "flex",
      gap: 64,
      // ↓ stretch so the image div fills the same height as the text column
      alignItems: "stretch",
      width: "100%",
      justifyContent: "center",
    }}>
      {/* Image — wider than before; height fills the row via alignItems:stretch */}
      <div style={{
        flexShrink: 0,
        width: 460,           // ← increased from 380
        minHeight: 420,       // ← floor so short-text slides still look good
        borderRadius: 10,
        overflow: "hidden",
        background: "#f0eeeb",
        border: "1px solid #e5e5e5",
      }}>
        <img
          src={mile.image}
          alt={mile.label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </div>

      {/* Text — drives the row height */}
      <div style={{
        flex: 1,
        paddingTop: 8,
        textAlign: "left",
        maxWidth: 520,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",  // ← vertically center text within image height
      }}>
        {mile.items.map((item, i) => (
          <div key={i} style={{ marginBottom: i < mile.items.length - 1 ? 48 : 0 }}>
            {item.title && (
              <h3 style={{
                fontFamily: "Inter",
                fontSize: "clamp(22px, 2vw, 30px)",
                fontWeight: 700,
                color: "#1C43B9",
                marginBottom: 12,
                lineHeight: 1.3,
              }}>
                {item.num}.&nbsp;{item.title}
              </h3>
            )}
            <p style={{
              fontSize: "clamp(18px, 1.6vw, 26px)",
              color: "#5D5D5D",
              lineHeight: 1.5,
              fontFamily: "Inter",
              margin: 0,
            }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PeopleSection() {
  const [active, setActive] = useState(0);
  const [animState, setAnimState] = useState(null);
  const [layout, setLayout] = useState("desktop"); // "mobile" | "tablet" | "desktop"
  const timerRef = useRef(null);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setLayout("mobile");
      else if (w < 1100) setLayout("tablet");
      else setLayout("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isMobile = layout === "mobile";
  const isTablet = layout === "tablet";

  const go = (idx) => {
    if (idx === active || animState !== null) return;
    const dir = idx > active ? "left" : "right";
    setAnimState({ from: active, to: idx, dir });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { setActive(idx); setAnimState(null); }, ANIM_MS);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const isAnim = animState !== null;
  const fromIdx = animState?.from;
  const toIdx = animState?.to ?? active;
  const dir = animState?.dir ?? "left";
  const exitKF = dir === "left" ? "pexit-left" : "pexit-right";
  const enterKF = dir === "left" ? "penter-right" : "penter-left";

  const DOT_POSITIONS = isMobile ? ["18%", "50%", "82%"] : ["20%", "50%", "80%"];

  // Responsive values
  const headingSize = isMobile ? "30px" : isTablet ? "60px" : "clamp(80px, 8vw, 120px)";
  const subSize = isMobile ? "11px" : isTablet ? "16px" : "clamp(18px, 1.6vw, 28px)";
  const subLine = isMobile ? "15px" : isTablet ? "24px" : "clamp(28px, 2.5vw, 40px)";
  const sectionPad = isMobile ? "40px 4vw 48px" : isTablet ? "48px 6vw 56px" : "0 5vw";
  const contentMinH = isMobile ? 520 : isTablet ? 480 : 440;

  return (
    <section style={{
      background: "#fff",
      borderRadius: "0px 0px 23px 23px",
    }}>
      <style>{`
        @keyframes pexit-left   { from{transform:translateX(0);opacity:1}    to{transform:translateX(-105%);opacity:0} }
        @keyframes pexit-right  { from{transform:translateX(0);opacity:1}    to{transform:translateX(105%);opacity:0}  }
        @keyframes penter-right { from{transform:translateX(105%);opacity:0}  to{transform:translateX(0);opacity:1}    }
        @keyframes penter-left  { from{transform:translateX(-105%);opacity:0} to{transform:translateX(0);opacity:1}    }
        @keyframes ppulse {
          0%  { transform:translate(-50%,-50%) scale(1);   opacity:.8; }
          100%{ transform:translate(-50%,-50%) scale(2.2); opacity:0;  }
        }
      `}</style>

      {/* Heading */}
      <div style={{ textAlign: "center", padding: sectionPad, marginBottom: isMobile ? 36 : 56 }}>
        <h2 style={{
          fontFamily: "Inter",
          fontWeight: 700,
          color: "#343434",
          lineHeight: 1.03,
          margin: "0 0 24px",
          fontSize: headingSize,
        }}>
          The people who{" "}
          {!isMobile && <br />}
          powered this evolution
        </h2>
        <p style={{
          fontSize: subSize,
          color: "#5D5D5D",
          lineHeight: subLine,
          maxWidth: 900,
          margin: "0 auto",
          fontFamily: "Inter",
          fontWeight: 300,
        }}>
          The gig workforce spans the entire supply chain, from first-mile
          operations to last-mile delivery.
        </p>
      </div>

      <div style={{
        maxWidth: 1320,
        margin: "0 auto",
        padding: isMobile ? "0 4vw" : isTablet ? "0 6vw" : "0 5vw",
      }}>

        {/* Timeline */}
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: isMobile ? "0 5%" : "0 10%",
            marginBottom: 10,
          }}>
            {MILES.map((mile, i) => (
              <button
                key={mile.id}
                onClick={() => go(i)}
                style={{
                  background: "none", border: "none",
                  cursor: animState ? "default" : "pointer",
                  padding: 0, width: 0, display: "flex",
                  flexDirection: "column", alignItems: "center",
                  overflow: "visible",
                }}
              >
                <span style={{
                  fontFamily: "Inter",
                  fontSize: isMobile ? 13 : isTablet ? 15 : 16,
                  fontWeight: 700,
                  color: "#e53e3e",
                  opacity: active === i ? 1 : 0.5,
                  transition: "opacity 0.3s",
                  whiteSpace: "nowrap",
                }}>{mile.label}</span>
              </button>
            ))}
          </div>

          <div style={{ position: "relative", height: 28 }}>
            <div style={{
              position: "absolute",
              top: "50%", left: 0, right: 0,
              height: 2, background: "#e53e3e",
              transform: "translateY(-50%)",
            }} />

            {MILES.map((mile, i) => {
              const isActive = active === i;
              return (
                <button
                  key={mile.id}
                  onClick={() => go(i)}
                  style={{
                    position: "absolute",
                    left: DOT_POSITIONS[i],
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "none",
                    border: "none",
                    cursor: animState ? "default" : "pointer",
                    padding: 0,
                    width: isActive ? 28 : 16,
                    height: isActive ? 28 : 16,
                    transition: "width 0.3s, height 0.3s",
                  }}
                >
                  <div style={{
                    width: "100%", height: "100%",
                    borderRadius: "50%",
                    background: "#e53e3e",
                    border: isActive ? "3px solid #fff" : "none",
                    boxShadow: isActive ? "0 0 0 3px #e53e3e" : "none",
                    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                    position: "relative",
                  }}>
                    {isActive && (
                      <span style={{
                        position: "absolute",
                        top: "50%", left: "50%",
                        width: "100%", height: "100%",
                        borderRadius: "50%",
                        border: "2px solid rgba(229,62,62,0.4)",
                        animation: "ppulse 1.5s ease-out infinite",
                      }} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content panel */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: contentMinH }}>
          {isAnim && (
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              animation: `${exitKF} ${ANIM_MS}ms ${EASE} forwards`,
            }}>
              <MileContent mile={MILES[fromIdx]} layout={layout} />
            </div>
          )}
          <div style={{ animation: isAnim ? `${enterKF} ${ANIM_MS}ms ${EASE} forwards` : "none" }}>
            <MileContent mile={MILES[toIdx]} layout={layout} />
          </div>
        </div>

      </div>
    </section>
  );
}