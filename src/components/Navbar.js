import { useEffect, useRef, useState } from "react";

const NAV = [
  {
    label: "Industries",
    items: ["Banking", "Fintech", "Insurance", "Gaming"]
  },
  {
    label: "Usecases",
    items: ["KYC", "KYB", "Fraud Check", "AML Screening"]
  },
  {
    label: "Platforms",
    items: ["API", "SDK", "Dashboard", "No-Code"]
  },
  {
    label: "Resources",
    items: ["Blog", "Case Studies", "Docs", "Guides"]
  },
  {
    label: "About Us",
    items: ["Company", "Team", "Careers", "Contact"]
  },
  {
    label: "Self-Serve",
    items: ["Start Now", "Pricing", "Sign Up"]
  }
];

export default function Navbar() {
  const [screenSize, setScreenSize] = useState("desktop");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [countryOpen, setCountryOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 1180) {
        setScreenSize("desktop");
        setMobileMenuOpen(false);
      } else if (width > 768) {
        setScreenSize("tablet");
      } else {
        setScreenSize("mobile");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setCountryOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setCountryOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const isDesktop = screenSize === "desktop";
  const isTablet = screenSize === "tablet";
  const isMobile = screenSize === "mobile";
  const isSmallScreenMenu = !isDesktop;

  const toggleDropdown = (label) => {
    setCountryOpen(false);
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const toggleCountryDropdown = () => {
    setOpenDropdown(null);
    setCountryOpen((prev) => !prev);
  };

  const closeAll = () => {
    setOpenDropdown(null);
    setCountryOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          height: 64,
          padding: isDesktop ? "0 130px" : isTablet ? "0 24px" : "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box"
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            zIndex: 1002
          }}
        >
          <img
            src="/assets/logo.png"
            alt="IDfy"
            style={{
              height: isMobile ? 36 : 44,
              width: "auto",
              objectFit: "contain",
              display: "block"
            }}
          />
        </div>

        {/* Desktop Nav */}
        {isDesktop && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                marginLeft: 32,
                marginRight: 24,
                flex: 1,
                fontSize:15,
                fontWeight:500,
                            fontFamily: "'Inter',sans-serif",
color: "#343434",
                justifyContent: "center"
              }}
            >
              {NAV.map((navItem) => (
                <div key={navItem.label} style={{ position: "relative" }}>
                  <button
                    onClick={() => toggleDropdown(navItem.label)}
                    style={{
                      color: "#374151",
                      fontSize: 14,
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      whiteSpace: "nowrap"
                    }}
                  >
                    {navItem.label}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      style={{
                        transform:
                          openDropdown === navItem.label
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.2s ease"
                      }}
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {openDropdown === navItem.label && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 14px)",
                        left: 0,
                        minWidth: 180,
                        background: "#fff",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: 8,
                        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                        padding: "8px 0"
                      }}
                    >
                      {navItem.items.map((item) => (
                        <a
                          key={item}
                          href="#"
                          style={{
                            display: "block",
                            padding: "10px 16px",
                            textDecoration: "none",
                            color: "#374151",
                            fontSize: 14,
                            fontWeight: 500
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#f9fafb";
                            e.currentTarget.style.color = "#e53e3e";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#374151";
                          }}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Right */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexShrink: 0
              }}
            >
              <button
                style={{
                  background: "transparent",
                  color: "#1a1a1a",
                  border: "1.5px solid #d1d5db",
                  padding: "8px 24px",
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                Login
              </button>

              <button
                style={{
                  background: "#CE1010",
                  color: "white",
                  border: "none",
                  padding: "8px 24px",
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                Book a Demo
              </button>

              <div style={{ position: "relative" }}>
                <button
                  onClick={toggleCountryDropdown}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    // border: "1px solid #d1d5db",
                    borderRadius: 6,
                    padding: "8px 12px",
                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  }}
                >
                  <img
                    src="https://flagcdn.com/w20/in.png"
                    alt="IN"
                    style={{
                      width: 16,
                      height: 18,

                      objectFit: "cover",
                      borderRadius: 50
                    }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
                    IND
                  </span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    style={{
                      transform: countryOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease"
                    }}
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="#374151"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {countryOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 14px)",
                      right: 0,
                      minWidth: 140,
                      background: "#fff",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 8,
                      boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                      padding: "8px 0"
                    }}
                  >
                    {["IND", "USA", "UAE"].map((country) => (
                      <div
                        key={country}
                        style={{
                          padding: "10px 16px",
                          fontSize: 14,
                          color: "#374151",
                          cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f9fafb";
                          e.currentTarget.style.color = "#e53e3e";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#374151";
                        }}
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Tablet + Mobile Hamburger */}
        {isSmallScreenMenu && (
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1002,
              marginLeft: "auto"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {mobileMenuOpen ? (
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="#111827"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <path
                    d="M4 7H20"
                    stroke="#111827"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 12H20"
                    stroke="#111827"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 17H20"
                    stroke="#111827"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
          </button>
        )}
      </nav>

      {/* FULL SCREEN MOBILE/TABLET MENU */}
      {isSmallScreenMenu && mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#fff",
            zIndex: 2000,
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* Mobile Header */}
          <div
            style={{
              height: 64,
              padding: isMobile ? "0 16px" : "0 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              flexShrink: 0
            }}
          >
            <img
              src="/assets/logo.png"
              alt="IDfy"
              style={{
                height: isMobile ? 36 : 40,
                width: "auto",
                objectFit: "contain"
              }}
            />

            <button
              onClick={closeAll}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="#111827"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: isMobile ? "20px 16px 24px" : "24px 24px 32px"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV.map((navItem) => (
                <div
                  key={navItem.label}
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    paddingBottom: 8
                  }}
                >
                  <button
                    onClick={() => toggleDropdown(navItem.label)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      padding: isMobile ? "14px 0" : "16px 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: "#374151",
                      fontSize: isMobile ? 16 : 17,
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    <span>{navItem.label}</span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      style={{
                        transform:
                          openDropdown === navItem.label
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        flexShrink: 0
                      }}
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        stroke="#374151"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {openDropdown === navItem.label && (
                    <div style={{ paddingBottom: 8 }}>
                      {navItem.items.map((item) => (
                        <a
                          key={item}
                          href="#"
                          onClick={closeAll}
                          style={{
                            display: "block",
                            padding: "10px 0 10px 12px",
                            textDecoration: "none",
                            color: "#6b7280",
                            fontSize: 14,
                            fontWeight: 500,
                            wordBreak: "break-word"
                          }}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12
              }}
            >
              <button
                style={{
                  background: "transparent",
                  color: "#1a1a1a",
                  border: "1.5px solid #d1d5db",
                  padding: "12px 20px",
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%"
                }}
              >
                Login
              </button>

              <button
                style={{
                  background: "#e53e3e",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%"
                }}
              >
                Book a Demo
              </button>

              <div style={{ position: "relative" }}>
                <button
                  onClick={toggleCountryDropdown}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 6,
                    border: "1px solid #d1d5db",
                    borderRadius: 6,
                    padding: "12px 14px",
                    cursor: "pointer",
                    width: "100%",
                    background: "#fff"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img
                      src="https://flagcdn.com/w20/in.png"
                      alt="IN"
                      style={{
                        width: 20,
                        height: 14,
                        objectFit: "cover",
                        borderRadius: 2
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
                      IND
                    </span>
                  </div>

                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    style={{
                      transform: countryOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease"
                    }}
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="#374151"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {countryOpen && (
                  <div
                    style={{
                      marginTop: 8,
                      width: "100%",
                      background: "#fff",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 8,
                      boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                      padding: "8px 0"
                    }}
                  >
                    {["IND", "USA", "UAE"].map((country) => (
                      <div
                        key={country}
                        style={{
                          padding: "10px 16px",
                          fontSize: 14,
                          color: "#374151",
                          cursor: "pointer"
                        }}
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}