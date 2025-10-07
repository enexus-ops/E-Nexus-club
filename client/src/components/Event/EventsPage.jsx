import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

const generateEventId = () => Math.random().toString(36).substr(2, 9);

const upcomingEvents = [
  {
    id: generateEventId(),
    title: 'React Advanced Patterns Workshop',
    category: 'Workshops',
    date: '2025-10-15T10:00:00Z',
    venue: 'Tech Hub, Silicon Valley',
    description: 'Deep dive into advanced React patterns including render props, compound components, and custom hooks. Perfect for developers looking to level up their React skills.',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: generateEventId(),
    title: 'AI/ML Hackathon 2025',
    category: 'Hackathons',
    date: '2025-10-22T09:00:00Z',
    venue: 'Innovation Center, San Francisco',
    description: '48-hour intensive hackathon focused on AI and Machine Learning solutions for real-world problems. Win exciting prizes and network with top talent.',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: generateEventId(),
    title: 'The Future of Web Development',
    category: 'Tech Talks',
    date: '2025-10-28T14:00:00Z',
    venue: 'Convention Center, Austin',
    description: 'Industry leaders discuss emerging trends in web development, including WebAssembly, serverless architecture, and the next generation of JavaScript frameworks.',
    image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: generateEventId(),
    title: 'TechFest 2025: Innovation Summit',
    category: 'Fests',
    date: '2025-11-10T08:00:00Z',
    venue: 'Grand Arena, Las Vegas',
    description: 'The biggest tech festival of the year featuring startup showcases, product launches, networking sessions, and entertainment. A celebration of innovation and creativity.',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: generateEventId(),
    title: 'Node.js Performance Optimization',
    category: 'Workshops',
    date: '2025-11-15T13:00:00Z',
    venue: 'Developer Center, Seattle',
    description: 'Learn advanced techniques for optimizing Node.js applications including profiling, memory management, and scaling strategies for high-performance systems.',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: generateEventId(),
    title: 'Blockchain Innovation Challenge',
    category: 'Hackathons',
    date: '2025-11-25T08:00:00Z',
    venue: 'Crypto Hub, Miami',
    description: 'Build the next generation of blockchain applications. Focus on DeFi, NFTs, and Web3 solutions that can change the world. Mentorship from industry experts included.',
    image: 'https://images.pexels.com/photos/1181684/pexels-photo-1181684.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const pastEvents = [
  {
    id: generateEventId(),
    title: 'JavaScript Frameworks Showdown',
    category: 'Tech Talks',
    date: '2024-12-15T15:00:00Z',
    venue: 'Tech Theater, New York',
    description: 'A comprehensive comparison of modern JavaScript frameworks including React, Vue, Angular, and Svelte. Expert panel discussion and live coding demos.',
    image: 'https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: generateEventId(),
    title: 'DevOps Mastery Workshop',
    category: 'Workshops',
    date: '2024-12-08T09:00:00Z',
    venue: 'Cloud Campus, Denver',
    description: 'Hands-on workshop covering CI/CD pipelines, container orchestration, and infrastructure as code. Participants worked with real-world deployment scenarios.',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: generateEventId(),
    title: 'StartupFest Winter Edition',
    category: 'Fests',
    date: '2024-11-20T08:00:00Z',
    venue: 'Innovation Arena, Boston',
    description: 'Three-day festival showcasing the most promising startups of 2024. Featured pitch competitions, investor meetups, and networking opportunities.',
    image: 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: generateEventId(),
    title: 'Mobile App Development Sprint',
    category: 'Hackathons',
    date: '2024-11-10T10:00:00Z',
    venue: 'Mobile Center, Portland',
    description: 'Intensive 24-hour hackathon focused on building mobile applications using React Native and Flutter. Amazing projects were built and several received funding.',
    image: 'https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: generateEventId(),
    title: 'Cybersecurity Essentials Summit',
    category: 'Tech Talks',
    date: '2024-10-25T14:00:00Z',
    venue: 'Security Center, Washington DC',
    description: 'Critical insights into modern cybersecurity threats and defense strategies. Industry experts shared the latest in security protocols and threat intelligence.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });

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
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#FF6EC7";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        if (mouse.current.x != null && mouse.current.y != null) {
          const distX = p.x - mouse.current.x;
          const distY = p.y - mouse.current.y;
          const distance = Math.sqrt(distX * distX + distY * distY);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(209,71,255,${1 - distance / 120})`;
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

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};

const Sidebar = ({ open, setOpen }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 z-[140] transition-opacity"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none'
        }}
        onClick={() => setOpen(false)}
      />

      <div
        className="fixed top-0 left-0 h-full w-80 bg-[#1a2332] backdrop-blur-xl shadow-2xl z-[150] transition-transform duration-300 border-r border-[#2d3b4e]"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(-100%)'
        }}
      >
        <div className="p-6 h-full flex flex-col">
          <button
            onClick={() => setOpen(false)}
            className="self-end mb-6 text-gray-400 bg-transparent border-none text-2xl cursor-pointer transition-all hover:text-white p-2"
          >
            ✕
          </button>

          <nav className="flex-1">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              Navigation
            </h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <a href="/" className="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-transparent text-gray-400 border border-transparent cursor-pointer font-semibold text-sm transition-all no-underline hover:bg-gradient-to-r hover:from-pink-500/15 hover:to-purple-600/15 hover:text-white hover:border-pink-500/30">
                  <span className="text-xl">🏠</span> Home
                </a>
              </li>
              <li>
                <a href="/about" className="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-transparent text-gray-400 border border-transparent cursor-pointer font-semibold text-sm transition-all no-underline hover:bg-gradient-to-r hover:from-pink-500/15 hover:to-purple-600/15 hover:text-white hover:border-pink-500/30">
                  <span className="text-xl">ℹ️</span> About
                </a>
              </li>
              <li>
                <a href="/contact" className="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-transparent text-gray-400 border border-transparent cursor-pointer font-semibold text-sm transition-all no-underline hover:bg-gradient-to-r hover:from-pink-500/15 hover:to-purple-600/15 hover:text-white hover:border-pink-500/30">
                  <span className="text-xl">📞</span> Contact
                </a>
              </li>
              <li>
                <a href="/events" className="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-transparent text-gray-400 border border-transparent cursor-pointer font-semibold text-sm transition-all no-underline hover:bg-gradient-to-r hover:from-pink-500/15 hover:to-purple-600/15 hover:text-white hover:border-pink-500/30">
                  <span className="text-xl">📅</span> Events
                </a>
              </li>
            </ul>
          </nav>

          <div className="mt-6 pt-4 border-t border-[#2d3b4e] text-center text-xs text-gray-500">
            © 2025 E-Nexus Tech Club
          </div>
        </div>
      </div>
    </>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  return (
    <div className="flex gap-2 my-3 p-3 bg-[#0f1822] rounded-xl border border-[#2d3b4e]">
      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="bg-gradient-to-br from-[#2d3b4e] to-[#1a2332] text-white py-2 px-2.5 rounded-lg font-mono text-lg font-bold min-w-[42px] text-center border border-[#3d4b5e]">
          {formatNumber(timeLeft.days)}
        </div>
        <span className="text-[0.65rem] font-medium text-gray-500 uppercase tracking-wide">Days</span>
      </div>
      <span className="text-xl font-bold text-gray-600 self-center">:</span>
      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="bg-gradient-to-br from-[#2d3b4e] to-[#1a2332] text-white py-2 px-2.5 rounded-lg font-mono text-lg font-bold min-w-[42px] text-center border border-[#3d4b5e]">
          {formatNumber(timeLeft.hours)}
        </div>
        <span className="text-[0.65rem] font-medium text-gray-500 uppercase tracking-wide">Hours</span>
      </div>
      <span className="text-xl font-bold text-gray-600 self-center">:</span>
      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="bg-gradient-to-br from-[#2d3b4e] to-[#1a2332] text-white py-2 px-2.5 rounded-lg font-mono text-lg font-bold min-w-[42px] text-center border border-[#3d4b5e]">
          {formatNumber(timeLeft.minutes)}
        </div>
        <span className="text-[0.65rem] font-medium text-gray-500 uppercase tracking-wide">Mins</span>
      </div>
      <span className="text-xl font-bold text-gray-600 self-center">:</span>
      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="bg-gradient-to-br from-[#2d3b4e] to-[#1a2332] text-white py-2 px-2.5 rounded-lg font-mono text-lg font-bold min-w-[42px] text-center border border-[#3d4b5e]">
          {formatNumber(timeLeft.seconds)}
        </div>
        <span className="text-[0.65rem] font-medium text-gray-500 uppercase tracking-wide">Secs</span>
      </div>
    </div>
  );
};

const EventCard = ({ event, isPast = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div
      className="bg-[#1a2332] rounded-2xl overflow-hidden flex flex-col border border-[#2d3b4e] transition-all duration-300 relative shadow-lg hover:border-pink-500/40 hover:shadow-[0_8px_32px_rgba(255,110,199,0.15)] hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? 'scale(1.08)' : 'scale(1)'
          }}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-[2]" />
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-br from-pink-500/90 to-purple-600/90 py-1.5 px-4 rounded-full font-bold text-[0.7rem] uppercase tracking-wider shadow-lg">
          {event.category}
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#1a2332] to-transparent p-4">
          <h3 className="m-0 text-xl font-bold text-white leading-tight drop-shadow-lg">
            {event.title}
          </h3>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col relative z-[2]">
        <div className="flex flex-col gap-2 mb-3">
          <p className="m-0 font-medium text-gray-400 text-sm flex items-center gap-2">
            📅 {formatDate(event.date)} at {formatTime(event.date)}
          </p>
          <p className="m-0 font-medium text-gray-500 text-sm flex items-center gap-2">
            📍 {event.venue}
          </p>
        </div>
        <p className="text-sm leading-relaxed m-0 mb-4 text-gray-400 flex-1">
          {event.description}
        </p>
        <CountdownTimer targetDate={event.date} />
        <button className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg hover:from-pink-600 hover:to-purple-700 hover:-translate-y-0.5">
          {isPast ? "View Highlights" : "Register Now"}
        </button>
      </div>
    </div>
  );
};

const BubbleMenu = ({ isOpen, onClose, onFilterSelect, activeFilter, triggerRef }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const filterOptions = [
    { id: "all", label: "All Events", icon: "🎯" },
    { id: "Workshops", label: "Workshops", icon: "🛠️" },
    { id: "Hackathons", label: "Hackathons", icon: "💻" },
    { id: "Tech Talks", label: "Tech Talks", icon: "🎤" },
    { id: "Fests", label: "Fests", icon: "🎉" }
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;
      if (
        isOpen &&
        !target.closest(".bubble-menu-container") &&
        !triggerRef?.current?.contains(target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div className="bubble-menu-container absolute top-16 right-8 z-[200]">
      <div className="bg-[#1a2332] backdrop-blur-xl p-2 rounded-xl shadow-xl border border-[#2d3b4e]">
        {filterOptions.map((option) => {
          const isActive = activeFilter === option.id;
          const isHovered = hoveredId === option.id;

          return (
            <button
              key={option.id}
              className="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-transparent text-gray-400 border border-transparent cursor-pointer mb-1.5 last:mb-0 font-semibold text-sm transition-all w-full text-left"
              style={{
                background: isActive || isHovered ? 'linear-gradient(to right, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.15))' : 'transparent',
                color: isActive || isHovered ? '#fff' : '#9ca3af',
                borderColor: isActive || isHovered ? 'rgba(236, 72, 153, 0.3)' : 'transparent'
              }}
              onClick={() => {
                onFilterSelect(option.id);
                onClose();
              }}
              onMouseEnter={() => setHoveredId(option.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <span className="text-xl">{option.icon}</span> {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Header = ({ searchQuery, setSearchQuery, setSidebarOpen, isMenuOpen, setIsMenuOpen }) => {
  const filterButtonRef = useRef(null);

  return (
    <header className="sticky top-0 z-[100] backdrop-blur-xl bg-[#0a0e14]/95 py-5 px-8 shadow-lg border-b border-[#1a2332]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Section */}
        <div className="flex items-center gap-3 min-w-[220px]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="py-2.5 px-4 rounded-lg cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl transition-all hover:from-pink-600 hover:to-purple-700 hover:shadow-lg"
          >
            ☰
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            E-Nexus Events
          </h1>
        </div>

        {/* Center Section */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-lg">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pl-11 pr-4 rounded-lg bg-[#1a2332] border border-[#2d3b4e] text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-end min-w-[180px]">
          <button
            ref={filterButtonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="py-2.5 px-5 rounded-lg cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm transition-all hover:from-pink-600 hover:to-purple-700 hover:shadow-lg whitespace-nowrap"
          >
            Filter Events
          </button>
        </div>
      </div>
    </header>
  );
};

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 400);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full w-[50px] h-[50px] cursor-pointer text-xl flex justify-center items-center shadow-lg z-[150] transition-all hover:from-pink-600 hover:to-purple-700 hover:shadow-xl hover:scale-105"
    >
      ↑
    </button>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getFilteredEvents = (events) => {
    let filtered = events;

    if (activeFilter !== "all") {
      filtered = filtered.filter((event) => event.category === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.venue.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredUpcoming = getFilteredEvents(upcomingEvents);
  const filteredPast = getFilteredEvents(pastEvents);

  return (
    <div className="min-h-screen pb-16 relative bg-[#0a0e14] text-white font-['Inter','-apple-system','BlinkMacSystemFont','Segoe_UI','sans-serif']">
      <ParticleBackground />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onFilterSelect={setActiveFilter}
        activeFilter={activeFilter}
        setSidebarOpen={setSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex justify-center py-6 px-4 gap-3 relative z-[1]">
        <button
          className="py-2.5 px-6 rounded-lg border cursor-pointer font-semibold text-sm transition-all"
          style={{
            border: activeTab === "upcoming" ? '1px solid rgba(236, 72, 153, 0.5)' : '1px solid #2d3b4e',
            background: activeTab === "upcoming" ? 'linear-gradient(to right, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.15))' : '#1a2332',
            color: activeTab === "upcoming" ? '#fff' : '#9ca3af'
          }}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Events
        </button>
        <button
          className="py-2.5 px-6 rounded-lg border cursor-pointer font-semibold text-sm transition-all"
          style={{
            border: activeTab === "past" ? '1px solid rgba(236, 72, 153, 0.5)' : '1px solid #2d3b4e',
            background: activeTab === "past" ? 'linear-gradient(to right, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.15))' : '#1a2332',
            color: activeTab === "past" ? '#fff' : '#9ca3af'
          }}
          onClick={() => setActiveTab("past")}
        >
          Past Events
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-8 p-8 max-w-7xl mx-auto relative z-[1]">
        {activeTab === "upcoming" ? (
          filteredUpcoming.length > 0 ? (
            filteredUpcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="text-center py-16 px-8 text-gray-600 text-lg col-span-full">
              🔍
              <p>No events found for this filter</p>
            </div>
          )
        ) : (
          filteredPast.length > 0 ? (
            filteredPast.map((event) => (
              <EventCard key={event.id} event={event} isPast={true} />
            ))
          ) : (
            <div className="text-center py-16 px-8 text-gray-600 text-lg col-span-full">
              🔍
              <p>No events found for this filter</p>
            </div>
          )
        )}
      </div>

      <BackToTopButton />
    </div>
  );
}

export default App;
