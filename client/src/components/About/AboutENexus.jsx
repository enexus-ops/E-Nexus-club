import React, { useState, useEffect } from "react";
const PRIMARY_BLUE = "#00B1E1"; 
const ACCENT_PURPLE = "#A855F7"; 
const BACKGROUND_DARK = "#05050A"; 
const styles = {
  container: { 
    position: "relative", 
    width: "100%", 
    minHeight: "100vh", 
    background: BACKGROUND_DARK, 
    color: "#fff", 
    fontFamily: "Arial, sans-serif", 
    overflowX: "hidden", 
    display: 'flex', 
    flexDirection: 'column' 
  },
  canvas: { position: "fixed", top: 0, left: 0, zIndex: 0, width: "100%", height: "100%" },
  header: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    padding: "20px 30px",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  hamburgerMenu: {
    fontSize: 30,
    color: '#fff', 
    cursor: 'pointer',
    padding: '5px 10px',
  },
  faqButton: { 
    padding: "8px 16px", 
    borderRadius: 6, 
    border: `2px solid ${PRIMARY_BLUE}`, 
    background: PRIMARY_BLUE, 
    color: BACKGROUND_DARK, 
    cursor: "pointer", 
    fontWeight: 'bold',
    transition: 'background 0.3s, opacity 0.3s',
  },
mainContent: { 
    position: "relative", 
    zIndex: 1, 
    padding: "15vh 20px 8vh", 
    maxWidth: 1000, 
    margin: "0 auto", 
    textAlign: "center", 
    flexGrow: 1, 
  },
  heroTitle: { fontSize: 48, margin: '0 0 10px', fontWeight: 700, color: '#fff' },
  heroSubtitle: { fontSize: 18, color: ACCENT_PURPLE, margin: '0 0 40px' },
  tagline: { 
    fontSize: 36, 
    color: PRIMARY_BLUE, 
    fontWeight: "bold", 
    letterSpacing: 2,
    margin: '0 0 30px',
  },
  heroDescription: { fontSize: 18, color: "#ccc", lineHeight: 1.6, maxWidth: 600, margin: '0 auto 80px', padding: '0 20px' },
  cardsWrapper: { 
    display: "flex", 
    justifyContent: "center", 
    gap: 20, 
    flexWrap: "wrap", 
    marginBottom: 80,
  },
  featureCard: {
    background: "#181818", 
    borderRadius: 10,
    padding: 30,
    textAlign: "left", 
    flex: "1 1 300px",
    maxWidth: 320,
    minHeight: 180,
    border: 'none', 
    boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
  },
  cardIcon: {
    fontSize: 24, 
    marginBottom: 10,
    display: 'block',
    color: PRIMARY_BLUE, 
  },
  cardTitle: { 
    fontSize: 20, 
    color: '#fff', 
    margin: '10px 0 10px', 
    fontWeight: 'bold',
    textTransform: 'none', 
  },
  cardText: { fontSize: 14, color: "#aaa", lineHeight: 1.5 },
  
  
  ctaSection: { padding: "20px 0", textAlign: 'center' },
  ctaButton: { 
    padding: "15px 40px", 
    fontSize: 18, 
    border: 'none', 
    borderRadius: 8, 
    cursor: "pointer", 
    background: ACCENT_PURPLE, 
    color: BACKGROUND_DARK, 
    fontWeight: 'bold',
    transition: 'background 0.2s',
  },
  ctaQuestion: {
    fontSize: 16,
    color: "#ccc", 
    marginTop: 15,
  },
  
  
  footer: { 
    textAlign: "center", 
    padding: '20px',
    color: "#777", 
    fontSize: 14,
    borderTop: 'none',
  },
  
  
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" },
  modalBackdrop: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backdropFilter: "blur(5px)", background: "rgba(0,0,0,0.7)" },
  modalContent: { 
    position: "relative", 
    background: "#111", 
    borderRadius: 16, 
    width: "90%", 
    maxWidth: 600, 
    zIndex: 1001, 
    color: "#fff", 
    border: 'none', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)', 
    overflow: 'hidden',
  },
  modalHeader: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: '15px 25px',
    borderBottom: `1px solid #333`,
    background: '#181818',
  },
  modalTitle: { 
    fontSize: 20, 
    margin: 0, 
    color: PRIMARY_BLUE, 
    fontWeight: 'bold',
  },
  modalClose: { 
    border: "none", 
    background: "none", 
    color: '#ccc',
    fontSize: 24, 
    cursor: "pointer" 
  },
  modalBody: { padding: '0 0 20px' },
  
  
  faqItemContainer: {
    borderBottom: '1px solid #222', 
    padding: '15px 25px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  faqQuestionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  faqQuestion: {
    margin: 0,
    fontSize: 16,
    flexGrow: 1,
    paddingRight: 10,
    color: '#fff',
  },
  faqToggleIcon: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    lineHeight: 1,
    fontWeight: 'normal',
    color: PRIMARY_BLUE, 
    border: `1px solid ${PRIMARY_BLUE}`,
    transition: 'all 0.3s',
  },
  faqAnswer: {
    paddingTop: 10,
    fontSize: 14,
    color: '#aaa',
    lineHeight: 1.5,
  }
};


export default function ENexusLandingPage() {
  const [faqOpen, setFaqOpen] = useState(false);
  const [activeBubble, setActiveBubble] = useState(null);


  useEffect(() => {
    const canvas = document.getElementById("stars-bg");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const STARS_COUNT = 150; 
    let stars = Array.from({ length: STARS_COUNT }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5,
      d: Math.random() * 0.5,
    }));

    let animationFrameId;

    function draw() {
      ctx.fillStyle = BACKGROUND_DARK; 
      ctx.fillRect(0, 0, w, h);
      
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${s.d + 0.5})`; 
        ctx.fill();

        s.y += 0.2;
        if (s.y > h) {
          s.y = 0;
          s.x = Math.random() * w;
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  // --- FAQ Data ---
  const faqItems = [
    { 
      q: "What makes us different?", 
      a: "We combine creative energy with technical expertise to deliver unique solutions that stand out in the network.",
    },
    { 
      q: "How do we approach projects?", 
      a: "We follow a collaborative approach, working closely with clients from inception to completion with regular network updates.",
    },
    { 
      q: "What's our development process?", 
      a: "We use agile methodology with iterative development, ensuring flexibility and quality at every stage of the project.",
    },
    { 
      q: "Do we provide ongoing support?", 
      a: "Yes, we offer comprehensive post-launch support and maintenance to ensure your project continues to excel and evolve.",
    },
  ];

  return (
    <div style={styles.container}>
      <canvas id="stars-bg" style={styles.canvas}></canvas>

      {/* Header/Nav */}
      <header style={styles.header}>
        <div style={styles.hamburgerMenu}>☰</div>
        <button 
          style={styles.faqButton} 
          onClick={() => setFaqOpen(true)}
        >
          FAQ
        </button>
      </header>

      {/* Main Content (Centered) */}
      <main style={styles.mainContent}>
        
        {/* Hero Text */}
        <h1 style={styles.heroTitle}>
          Welcome to E-Nexus
        </h1>
        <p style={styles.heroSubtitle}>Your Tech Club Website</p>
        
        {/* Tagline */}
        <h2 style={styles.tagline}>
          Innovate. Create. Connect.
        </h2>
        <p style={styles.heroDescription}>
          Join the premier technology community where passionate minds come together to build
          the future through code, creativity, and collaboration.
        </p>

        {/* Feature Cards */}
        <div style={styles.cardsWrapper}>
          <div style={styles.featureCard}>
            <span role="img" aria-label="code" style={styles.cardIcon}>💻</span>
            <h3 style={styles.cardTitle}>Code & Build</h3>
            <p style={styles.cardText}>
              Collaborate on cutting-edge projects and build applications that solve real-world problems.
            </p>
          </div>
          <div style={styles.featureCard}>
            <span role="img" aria-label="rocket" style={styles.cardIcon}>🚀</span>
            <h3 style={styles.cardTitle}>Launch Ideas</h3>
            <p style={styles.cardText}>
              Transform your innovative concepts into reality with support from our tech community.
            </p>
          </div>
          <div style={styles.featureCard}>
            <span role="img" aria-label="handshake" style={styles.cardIcon}>🤝</span>
            <h3 style={styles.cardTitle}>Network & Grow</h3>
            <p style={styles.cardText}>
              Connect with like-minded developers, designers, and tech enthusiasts.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div style={styles.ctaSection}>
          <button style={styles.ctaButton}>Join E-Nexus Today</button>
          <p style={styles.ctaQuestion}>Ready to be part of something extraordinary?</p>
        </div>
      </main>
      
      {/* Footer */}
      <footer style={styles.footer}>© {new Date().getFullYear()} E Nexus</footer>

      {/* --- FAQ Modal (Video Style, Blue Accents) --- */}
      {faqOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBackdrop} onClick={() => setFaqOpen(false)}></div>
          
          <div style={styles.modalContent}>
            
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Frequently Asked Questions</h2>
              <button 
                style={styles.modalClose} 
                onClick={() => setFaqOpen(false)} 
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            
            <div style={styles.modalBody}>
              {faqItems.map((item, idx) => (
                <div
                  key={idx}
                  style={styles.faqItemContainer}
                  onClick={() => setActiveBubble(activeBubble === idx ? null : idx)}
                >
                  <div style={styles.faqQuestionRow}>
                    <p style={styles.faqQuestion}>{item.q}</p>
                    <span style={styles.faqToggleIcon}>
                      {activeBubble === idx ? "—" : "+"}
                    </span>
                  </div>
                  
                  {activeBubble === idx && (
                    <div style={styles.faqAnswer}>
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}