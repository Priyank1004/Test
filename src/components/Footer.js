export default function Footer() {
  const linkStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    color: "rgba(255,255,255,0.55)",
    textDecoration: "none",
    display: "block",
    marginBottom: "14px",
    cursor: "pointer",
  };

  const headingStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "15px",
    fontWeight: 700,
    color: "white",
    marginBottom: "24px",
  };

  const boldLinkStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    color: "white",
    marginBottom: "6px",
  };

  const emailStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    color: "rgba(255,255,255,0.55)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "20px",
  };

  const MailIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,255,255,0.55)" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );

  return (
    <footer style={{
      background: "#0a0a0f",
      padding: "60px 20px 40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>

      {/* Logo */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
        <img src="/assets/logo.png" alt="IDfy" style={{ height: "56px", width: "auto" }} />
      </div>

      {/* Divider below logo */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        marginBottom: "48px",
        width: "100%",
        maxWidth: "1100px",
      }} />

      {/* All rows wrapper */}
      <div style={{ width: "100%", maxWidth: "1100px" }}>

        {/* Row 1: Contact Info | About Us | Platforms */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "48px 32px",
          marginBottom: "48px",
        }}>

          {/* Contact Info */}
          <div>
            <p style={headingStyle}>Contact info</p>

            <p style={boldLinkStyle}>For Sales</p>
            <p style={emailStyle}><MailIcon /> shivani@idfy.com</p>

            <p style={boldLinkStyle}>For Support</p>
            <p style={emailStyle}><MailIcon /> support@idfy.com</p>

            <p style={boldLinkStyle}>For Partnerships</p>
            <p style={emailStyle}><MailIcon /> vishal.suri@idfy.com</p>
          </div>

          {/* About Us */}
          <div>
            <p style={headingStyle}>About Us</p>
            {["Company", "Our Team", "Our Investors", "Partners", "Careers"].map(item => (
              <a key={item} href="#" style={linkStyle}>{item}</a>
            ))}
          </div>

          {/* Platforms */}
          <div>
            <p style={headingStyle}>Platforms</p>
            {["OnboardIQ", "OneRisk", "Privy"].map(item => (
              <a key={item} href="#" style={linkStyle}>{item}</a>
            ))}
          </div>
        </div>

        {/* Row 2: Resources | Industries left | Industries right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "48px 32px",
          marginBottom: "48px",
        }}>

          {/* Resources */}
          <div>
            <p style={headingStyle}>Resources</p>
            {["Blogs", "Learning Hub"].map(item => (
              <a key={item} href="#" style={linkStyle}>{item}</a>
            ))}
          </div>

          {/* Industries — left col */}
          <div>
            <p style={headingStyle}>Industries</p>
            {[
              "Banking",
              "Payment Acquirers",
              "Payment Issuers",
              "Motor Insurance",
              "Health Insurance",
              "Life Insurance",
            ].map(item => (
              <a key={item} href="#" style={linkStyle}>{item}</a>
            ))}
          </div>

          {/* Industries — right col (hidden heading to align) */}
          <div>
            <p style={{ ...headingStyle, visibility: "hidden" }}>Industries</p>
            {[
              "Consumer Goods",
              "Retail",
              "eCommerce",
              "Logistics",
              "Vehicle Loans",
              "Housing loans",
            ].map(item => (
              <a key={item} href="#" style={linkStyle}>{item}</a>
            ))}
          </div>
        </div>

        {/* Row 3: Corporate | empty | empty */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "48px 32px",
        }}>
          <div>
            <p style={headingStyle}>Corporate</p>
            {[
              "Privacy Policy",
              "Terms of Use",
              "MSA",
              "Contact Us",
              "BGV Cost Calculator",
              "Sitemap",
            ].map(item => (
              <a key={item} href="#" style={linkStyle}>{item}</a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        marginTop: "48px",
        paddingTop: "24px",
        width: "100%",
        maxWidth: "1100px",
        display: "flex",
        justifyContent: "center",
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px",
          color: "rgba(255,255,255,0.35)",
          margin: 0,
        }}>
          © {new Date().getFullYear()} IDfy. All rights reserved.
        </p>
      </div>

      {/* Mobile responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          footer > div:first-of-type {
            padding: 0 16px !important;
          }
          
          footer > div:first-of-type > div {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          
          footer > div:first-of-type > div > div:last-child {
            margin-bottom: 0 !important;
          }
          
          footer > div:first-of-type > div:nth-child(2) > div:last-child p {
            visibility: visible !important;
            margin-top: 32px !important;
          }
          
          footer > div:first-of-type > div:nth-child(2) {
            margin-bottom: 32px !important;
          }
        }
        
        @media (max-width: 480px) {
          footer {
            padding: 40px 16px 32px !important;
          }
          
          footer img {
            height: 48px !important;
          }
          
          p, a {
            font-size: 13px !important;
          }
          
          p[style*="font-weight: 700"] {
            font-size: 14px !important;
          }
        }
      `}</style>
    </footer>
  );
}