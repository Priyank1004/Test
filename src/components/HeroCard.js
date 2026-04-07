import { lerp, clamp, ease } from "./helpers";

export const RX = 32;
export const RY = 24;

export default function HeroCard({ card, progress, vw }) {
  const isMobile = vw > 0 && vw < 600;
  const isTablet = vw >= 600 && vw < 1024;

  /*
   * Orbit radii:
   * Desktop (≥1024): 40vw / 30vh  — unchanged, wide spread
   * Tablet  (600–1023): 30 / 22   — unchanged
   * Mobile  (<600): tightened to 28vw / 20vh so cards stay within screen
   *
   * On mobile the cluster is compact (matching Figma reference) —
   * cards overlap in the center and fan out just enough to be distinct.
   */
  const rx = isMobile ? 28 : isTablet ? 30 : 40;
  const ry = isMobile ? 20 : isTablet ? 22 : 30;

  /*
   * Card dimensions:
   * Desktop: 190×234  — unchanged
   * Tablet:  142×175  — unchanged
   * Mobile:  100×124  — smaller so they don't bleed off-screen
   */
  const cardWidth  = isMobile ? 100 : isTablet ? 142 : 190;
  const cardHeight = isMobile ? 124 : isTablet ? 175 : 234;
  const borderRad  = isMobile ? 10  : isTablet ? 13  : 20;

  /*
   * Explode distance on scroll:
   * Desktop: 172  — unchanged
   * Tablet:  126  — unchanged
   * Mobile:  90   — reduced so cards fly off-screen cleanly without
   *                 overshooting on narrow viewports
   */
  const explodeDist = isMobile ? 90 : isTablet ? 126 : 172;

  const rad = (card.angle * Math.PI) / 180;
  const ox  = Math.cos(rad) * rx;
  const oy  = -Math.sin(rad) * ry;
  const mag = Math.sqrt(ox * ox + oy * oy) || 1;
  const EX  = (ox / mag) * explodeDist;
  const EY  = (oy / mag) * explodeDist;

  const t       = ease(clamp((progress - 0.35) / 0.55, 0, 1));
  const tx      = lerp(ox, EX, t);
  const ty      = lerp(oy, EY, t);
  const opacity = lerp(1, 0, clamp((progress - 0.65) / 0.3, 0, 1));

  /*
   * Shadow direction derived from card angle so each card feels
   * lit from the center.
   */
  const shadowX = +(Math.cos(rad) * 6).toFixed(1);
  const shadowY = -(Math.sin(rad) * 6).toFixed(1);

  /*
   * On mobile, reduce the perspective tilt angles so cards don't
   * look distorted on small screens.
   */
  const tiltX = isMobile
    ? (Math.sin(rad) * 3).toFixed(1)
    : (Math.sin(rad) * 6).toFixed(1);
  const tiltY = isMobile
    ? -(Math.cos(rad) * 2).toFixed(1)
    : -(Math.cos(rad) * 4).toFixed(1);

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% + ${tx}vw)`,
        top: `calc(50% + ${ty}vh)`,
        transform: `
          translate(-50%, -50%)
          perspective(800px)
          rotate(${card.rotate}deg)
          rotateX(${tiltX}deg)
          rotateY(${tiltY}deg)
        `,
        opacity,
        zIndex: card.z,
        willChange: "transform, opacity",
        pointerEvents: "none",
        filter: `drop-shadow(${shadowX}px ${shadowY}px 18px rgba(0,0,0,0.60))
                 drop-shadow(0px 4px 8px rgba(0,0,0,0.30))`,
      }}
    >
      <div
        style={{
          width: cardWidth,
          height: cardHeight,
          borderRadius: borderRad,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",
        }}
      >
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <img
            src={`/assets/img${card.id}.png`}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}