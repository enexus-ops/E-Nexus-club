import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export default function EnexusLanding() {
  const [showMain, setShowMain] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mainContentRef = useRef(null);
  const sidebarRef = useRef(null);
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });

  // Particle background effect (uses user's Home component logic)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let rafId = null;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particleCount = 200;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.8,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
      });
    }

    const handleMouseMove = (e) => {
      // use client coordinates
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // neon-ish color to match dark theme
        ctx.fillStyle = "#FF6EC7"; // blue
        ctx.fill();

        // move
        p.x += p.dx;
        p.y += p.dy;

        // bounce
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // connect to mouse when close
        if (mouse.current.x != null && mouse.current.y != null) {
          const distX = p.x - mouse.current.x;
          const distY = p.y - mouse.current.y;
          const distance = Math.sqrt(distX * distX + distY * distY);

          if (distance < 120) {
            ctx.beginPath();
            // purple-ish fading line
            ctx.strokeStyle = `rgba(209,71,255,${1 - distance / 120})`; // #D147FF
            ctx.lineWidth = 2.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.stroke();
          }
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Shuffle text animation component
  const Shuffle = ({
    text,
    duration = 0.7,
    shuffleTimes = 50,
    ease = "power3.out",
    stagger = 0.03,
    scrambleCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    finalHold = 0.8,
    onComplete,
  }) => {
    const ref = useRef(null);

    useEffect(() => {
      if (!ref.current || !text) return;
      const el = ref.current;
      el.innerHTML = "";

      const chars = text.split("");
      const spans = chars.map((ch) => {
        const span = document.createElement("span");
        span.textContent = ch;
        el.appendChild(span);
        return span;
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.delayedCall(finalHold, () => onComplete?.());
        },
      });

      spans.forEach((span, i) => {
        const singleRollDuration = duration / shuffleTimes;

        for (let j = 0; j < shuffleTimes; j++) {
          tl.to(
            span,
            {
              duration: singleRollDuration,
              // animate textContent to random char (requires GSAP TextPlugin if not available this might fallback)
              textContent:
                scrambleCharset[
                Math.floor(Math.random() * scrambleCharset.length)
                ],
              ease,
            },
            i * stagger + j * singleRollDuration
          );
        }

        tl.to(
          span,
          {
            duration: singleRollDuration,
            textContent: chars[i],
            ease,
          },
          i * stagger + duration
        );
      });

      return () => tl.kill();
    }, [text]);

    return (
      <p
        ref={ref}
        className="uppercase text-[4rem] text-center text-white"
        style={{ fontFamily: "'Press Start 2P', sans-serif" }}
      >
        {text}
      </p>
    );
  };

  const handleShuffleComplete = () => {
    gsap.to("#intro-text", {
      opacity: 0,
      duration: 1,
      onComplete: () => setShowMain(true),
    });
  };

  const handleMainAnimationComplete = () => {
    gsap.to(mainContentRef.current, {
      y: -280,
      scale: 0.85,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        setShowContent(true);
        gsap.fromTo(
          ".content-section",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
        );
      },
    });
  };

  useEffect(() => {
    if (showMain && mainContentRef.current) {
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          onComplete: () => gsap.delayedCall(1.5, handleMainAnimationComplete),
        }
      );
    }
  }, [showMain]);

  // Sidebar slide animation (left)
  useEffect(() => {
    if (!sidebarRef.current) return;
    if (sidebarOpen) {
      gsap.to(sidebarRef.current, { x: 0, duration: 0.4, ease: "power2.out" });
      gsap.to(".sidebar-overlay", { opacity: 1, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(sidebarRef.current, { x: "-100%", duration: 0.4, ease: "power2.in" });
      gsap.to(".sidebar-overlay", { opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [sidebarOpen]);

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden relative">
      {/* Background canvas (z-0) */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Intro shuffle */}
      {!showMain && (
        <div id="intro-text" className="h-full flex items-center justify-center relative z-10">
          <Shuffle
            text="E-NEXUS"
            shuffleTimes={50}
            duration={1}
            stagger={0.05}
            finalHold={1}
            onComplete={handleShuffleComplete}
          />
        </div>
      )}

      {/* Main area */}
      {showMain && (
        <div className="h-full relative z-10">
          {/* Title area (will animate up) */}
          <div ref={mainContentRef} className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <h1 className="text-5xl font-bold mb-3">Welcome to E-Nexus 🚀</h1>
              <p className="text-2xl">Your Tech Club Website</p>
            </div>
          </div>

          {/* Content revealed after title moves */}
          {showContent && (
            <div className="pt-28 px-8 h-full">
              <div className="h-24"></div>

              {/* Menu Button - top-left */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="fixed top-8 left-8 z-50 bg-gradient-to-r from-blue-500 to-[#D147FF]
hover:from-blue-600 hover:to-[#FF6EC7] text-white p-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="max-w-6xl mx-auto">
                {/* Hero */}
                <section className="content-section text-center mb-16">
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#FF6EC7] to-[#D147FF] bg-clip-text text-transparent">
                    Innovate. Create. Connect.
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Join the premier technology community where passionate minds come together
                    to build the future through code, creativity, and collaboration.
                  </p>
                </section>

                {/* Features */}
                <div className="content-section grid md:grid-cols-3 gap-8 mb-16">
                  <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-blue-500 transition-colors">
                    <div className="text-3xl mb-4">💻</div>
                    <h3 className="text-xl font-bold mb-3">Code & Build</h3>
                    <p className="text-gray-400">
                      Collaborate on cutting-edge projects and build applications that solve real-world problems.
                    </p>
                  </div>

                  <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-purple-500 transition-colors">
                    <div className="text-3xl mb-4">🚀</div>
                    <h3 className="text-xl font-bold mb-3">Launch Ideas</h3>
                    <p className="text-gray-400">
                      Transform your innovative concepts into reality with support from our tech community.
                    </p>
                  </div>

                  <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-green-500 transition-colors">
                    <div className="text-3xl mb-4">🤝</div>
                    <h3 className="text-xl font-bold mb-3">Network & Grow</h3>
                    <p className="text-gray-400">
                      Connect with like-minded developers, designers, and tech enthusiasts.
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <section className="content-section text-center">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    Join E-Nexus Today
                  </button>
                  <p className="text-gray-400 mt-4">
                    Ready to be part of something extraordinary?
                  </p>
                </section>
              </div>
            </div>
          )}

          {/* Sidebar overlay */}
          <div
            className="sidebar-overlay fixed inset-0 bg-black bg-opacity-50 z-40 opacity-0 pointer-events-none"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar (left) */}
          <div
            ref={sidebarRef}
            className="fixed top-0 left-0 h-full w-80 bg-gray-900 shadow-2xl z-50 transform -translate-x-full"
          >
            <div className="p-8 h-full flex flex-col">
              <button
                onClick={() => setSidebarOpen(false)}
                className="self-end mb-8 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <nav className="flex-1">
                <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  Navigation
                </h3>
                <ul className="space-y-6">
                  <li>
                    <a href="#teams" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all duration-300 transform hover:translate-x-2" onClick={() => setSidebarOpen(false)}>👥 Teams</a>
                  </li>
                  {/* <li>
                    <a href="#about" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all duration-300 transform hover:translate-x-2" onClick={() => setSidebarOpen(false)}>ℹ About</a>
                  </li>
                  <li>
                    <a href="#contact" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all duration-300 transform hover:translate-x-2" onClick={() => setSidebarOpen(false)}>📞 Contact</a>
                  </li> */}

                  <Link to="/about" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all duration-300 transform hover:translate-x-2">ℹ About

                  </Link>

                  <Link to="/contact" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all duration-300 transform hover:translate-x-2">📞 Contact

                  </Link>
                  <li>
                    <a href="#events" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all duration-300 transform hover:translate-x-2" onClick={() => setSidebarOpen(false)}>📅 Events</a>
                  </li>

                  {/* Add Gallery Link */}
                  <li>
                    <Link
                      to="/gallery"
                      className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all duration-300 transform hover:translate-x-2"
                      onClick={() => setSidebarOpen(false)}
                    >
                      🖼 Gallery
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-gray-400 text-sm text-center">© 2025 E-Nexus Tech Club</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sidebar-overlay.opacity-0 {
          pointer-events: none;
        }
        .sidebar-overlay:not(.opacity-0) {
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}