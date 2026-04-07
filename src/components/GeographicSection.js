import { useEffect, useRef, useState } from "react";

const SEGMENTS = [
  { title: "Truck Drivers",       mapSrc: "/assets/truck driver.svg" },
  { title: "Dark Store Workers",  mapSrc: "/assets/dark store .svg" },
  { title: "Delivery Partners",   mapSrc: "/assets/delivery partners .svg" },
];

const DEFAULT_MAP = "/assets/india.png";

export default function GeographicSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const activeMap = openIndex === null ? DEFAULT_MAP : SEGMENTS[openIndex].mapSrc;

  const handleSegmentClick = (i) => {
    setOpenIndex(prev => prev === i ? null : i);
  };

  // Reusable accordion item renderer
  const AccordionItems = () =>
    SEGMENTS.map((item, i) => {
      const isOpen = openIndex === i;
      return (
        <div key={i}>
          <div
            onClick={() => handleSegmentClick(i)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 6 : 10,
              cursor: "pointer",
              color: isOpen ? "#e53e3e" : "white",
              fontSize: isMobile ? 10.3 : 30,
              fontWeight: 700,
              fontFamily: "'Inter',sans-serif",
              userSelect: "none",
              transition: "color 0.2s ease",
            }}
          >
            <span style={{
              display: "inline-block",
              transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}>▶</span>
            {item.title}
          </div>
        </div>
      );
    });

  return (
    <div ref={sectionRef} style={{ height: "200vh", position: "relative" }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: isMobile ? "auto" : "150vh",
        overflow: "hidden",
        background: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0px 56px 40px",
      }}>
        <div style={{ position: "absolute", top: 0, left: -450, zIndex: 0 }}>
          <img src="/assets/Ellipse.png" alt="ellipse"
            style={{ width: "900px", height: "900px", opacity: 1 }} />
        </div>

        {/* Title */}
        <div style={{
          textAlign: "center",
          marginBottom: 8,
          opacity: 1,
          position: "relative",
          zIndex: 1,
        }}>
          <h2
            className="sm:text-[105px] text-[40px]"
            style={{
              fontFamily: "Inter",
              fontWeight: 700,
              color: "white",
              margin: 0,
              lineHeight: 1.05,
              fontSize: isMobile ? "30px" : "120px",
            }}
          >
            Geographic Risk
            <br className="sm:flex hidden" />
            Concentration
          </h2>
          <p style={{
            color: "white",
            margin: "12px 0 0",
            fontFamily: "'Inter',sans-serif",
            fontSize: isMobile ? "11px" : "30px",
          }}>
            A breakdown of states with the highest risk rates across India.
          </p>
        </div>

        {/* Body */}
        <div
          className="flex flex-col-reverse lg:grid lg:grid-cols-[370px_1fr] gap-12 w-full max-w-[1400px] mt-6"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Left panel */}
          <div style={{
            opacity: 1,
            transform: "none",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            paddingTop: 8,
          }}>
            {/* Desktop-only paragraphs */}
            <p className="hidden lg:block" style={{
              color: "white", fontSize: 30, lineHeight: "115%",
              fontFamily: "'Inter',sans-serif", margin: 0,
            }}>
              Kerala records the highest risk rate in the country, with
              Maharashtra close behind, making them two of the highest risk
              concentration states across segments.
            </p>
            <p className="hidden lg:block" style={{
              color: "white", fontSize: 30, lineHeight: "115%",
              fontFamily: "'Inter',sans-serif", margin: 0,
            }}>
              Another contributing factor behind this surge could be stronger
              crime reporting mechanisms in southern and western states. For
              example, in Kerala, many challans are automatically generated
              through AI-enabled monitoring cameras at traffic junctions.
            </p>

            {/* Desktop-only Segment Accordion */}
            <div
              className="hidden lg:flex lg:flex-col lg:justify-start"
              style={{ marginTop: 8, gap: 10 }}
            >
              <AccordionItems />
            </div>

            {/* Mobile-only paragraphs */}
            <p className="block lg:hidden" style={{
              color: "white", fontSize: 11, lineHeight: 1.7,
              fontFamily: "'Inter',sans-serif", margin: 0, textAlign: "center",
            }}>
              Kerala records the highest risk rate in the country, with
              Maharashtra close behind, making them two of the highest risk
              concentration states across segments.
            </p>
            <p className="block lg:hidden" style={{
              color: "white", fontSize: 11, lineHeight: 1.7,
              fontFamily: "'Inter',sans-serif", margin: 0, textAlign: "center",
            }}>
              Another contributing factor behind this surge could be stronger
              crime reporting mechanisms in southern and western states. For
              example, in Kerala, many challans are automatically generated
              through AI-enabled monitoring cameras at traffic junctions.
            </p>

            {/* Mobile-only Segment Accordion — below paragraphs */}
            <div
              className="flex lg:hidden flex-row justify-center"
              style={{ marginTop: 8, gap: 10 }}
            >
              <AccordionItems />
            </div>
          </div>

          {/* Map */}
          <div style={{
            position: "relative",
            opacity: 1,
            transform: "none",
            height: "100%",
            maxHeight: 680,
            minHeight: 420,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <img
              key={activeMap}
              src={activeMap}
              alt={openIndex === null ? "India map" : SEGMENTS[openIndex].title + " map"}
              style={{
                width: "115%",
                maxWidth: "115%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                filter: "brightness(0.9)",
                transition: "opacity 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}