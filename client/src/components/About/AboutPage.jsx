import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  // 🌌 Particle background
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
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.8,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
    }));

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
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
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Sidebar animation
  useEffect(() => {
    if (sidebarOpen) {
      gsap.to(".sidebar", { x: 0, duration: 0.4, ease: "power2.out" });
      gsap.to(".sidebar-overlay", { opacity: 1, duration: 0.3 });
    } else {
      gsap.to(".sidebar", { x: "-100%", duration: 0.4, ease: "power2.in" });
      gsap.to(".sidebar-overlay", { opacity: 0, duration: 0.3 });
    }
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden relative">
      {/* 🌌 Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Sidebar overlay */}
      <div
        className="sidebar-overlay fixed inset-0 bg-black bg-opacity-50 z-40 opacity-0 pointer-events-none"
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className="sidebar fixed top-0 left-0 h-full w-80 bg-gray-900 shadow-2xl z-50 transform -translate-x-full">
        <div className="p-8 h-full flex flex-col">
          <button
            onClick={() => setSidebarOpen(false)}
            className="self-end mb-8 text-gray-400 hover:text-white text-2xl"
          >
            ✖
          </button>

          <nav className="flex-1">
            <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Navigation
            </h3>
            <ul className="space-y-6">
              {/* <li>
                <a href="/" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all">
                  🏠 Home
                </a>
              </li>
              <li>
                <a href="/#teams" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all">
                  👥 Teams
                </a>
              </li>
              <li>
                <a href="/contact" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all">
                  📞 Contact
                </a>
              </li>
              <li>
                <a href="/events" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all">
                  📅 Events
                </a>
              </li> */}
              {/* <li>
                    <a href="#teams" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all duration-300 transform hover:translate-x-2" onClick={() => setSidebarOpen(false)}>👥 Teams</a>
                  </li> */}
                  <Link to="/teams" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all duration-300 transform hover:translate-x-2">👥 Teams
                  
                  </Link>
                  

                  <Link to="/about" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all duration-300 transform hover:translate-x-2">ℹ️ About
                  
                  </Link> 

                  <Link to="/contact" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all duration-300 transform hover:translate-x-2">📞 Contact
                  
                  </Link>
                  <Link to="/events" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg transition-all duration-300 transform hover:translate-x-2">📅 Events
                  
                  </Link>
            </ul>
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            © 2025 E-Nexus Tech Club
          </div>
        </div>
      </div>

      {/* Header buttons */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-8 left-8 z-50 bg-gradient-to-r from-blue-500 to-[#D147FF] hover:from-blue-600 hover:to-[#FF6EC7] text-white p-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        ☰
      </button>

      <button
        onClick={() => setFaqOpen(true)}
        className="fixed top-8 right-8 z-50 bg-gradient-to-r from-[#D147FF] to-[#FF6EC7] hover:from-[#A03FFF] hover:to-[#FF4FC7] text-white p-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        ❓ FAQ
      </button>

       {/* Main Content */}
      <div className="relative z-10 pt-32 px-8 max-w-5xl mx-auto space-y-20">
        <h1 className="text-6xl font-bold text-center mb-12 bg-gradient-to-r from-[#FF6EC7] to-[#D147FF] bg-clip-text text-transparent">
          🌐 About E-Nexus
        </h1>

        <section className="text-center space-y-6">
          <p className="text-gray-300 text-lg leading-relaxed">
            E-Nexus stands as the Startup Hub of Entrepreneurship, AI, and Sustainability at Kalasalingam Academy of Research and Education (KARE). We are not just a student club — we are a movement of innovators, builders, and leaders who believe in shaping the future through collaboration, technology, and purpose-driven action.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Founded with the belief that students are capable of solving the most pressing global challenges, E-Nexus connects bright minds with opportunities to create disruptive ideas, impactful startups, and sustainable solutions.
          </p>
          <p className="text-gray-300 text-lg font-semibold">
            Our motto: “Breaking Chains, Building Futures.”
          </p>
        </section>

        <section className="text-center space-y-6">
          <h2 className="text-4xl font-bold mb-6">✨ Our Vision</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            To create a vibrant ecosystem where students become entrepreneurs, innovators, and change-makers who build sustainable solutions and impactful ventures, both within and beyond the campus.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            We aim to be recognized as a national hub for student-led innovation, setting benchmarks for how youth can drive entrepreneurship and sustainability.
          </p>
        </section>

        <section className="text-center space-y-6">
          <h2 className="text-4xl font-bold mb-6">🎯 Our Mission</h2>
          <ul className="text-gray-300 text-lg leading-relaxed list-disc list-inside space-y-2">
            <li>Ignite the entrepreneurial spirit in students through workshops, hackathons, and mentorship.</li>
            <li>Leverage AI and technology for solving real-world problems.</li>
            <li>Promote sustainable practices aligned with UN SDGs.</li>
            <li>Build a network of collaboration across students, startups, industries, and NGOs.</li>
            <li>Empower students with skills, experiences, and leadership opportunities for the future.</li>
          </ul>
        </section>

        <section className="text-center space-y-6">
          <h2 className="text-4xl font-bold mb-6">🔑 What We Do</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition-colors">
              <h3 className="text-2xl font-semibold mb-2">🚀 Entrepreneurship Development</h3>
              <p>Incubating student startups and innovative projects. Hosting pitch sessions, bootcamps, and business competitions.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-purple-500 transition-colors">
              <h3 className="text-2xl font-semibold mb-2">🤖 AI & Technology Innovation</h3>
              <p>Encouraging student-driven AI, automation, and digital solutions. Running technical workshops and hands-on training sessions.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-green-500 transition-colors">
              <h3 className="text-2xl font-semibold mb-2">🌱 Sustainability Initiatives</h3>
              <p>Green-tech projects, campus drives, and eco-awareness campaigns. Building models that promote energy efficiency and sustainable living.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition-colors">
              <h3 className="text-2xl font-semibold mb-2">🎤 Events & Hackathons</h3>
              <p>National-level hackathons, ideathons, and innovation challenges. Leadership talks, guest lectures, and skill-development programs.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-pink-500 transition-colors">
              <h3 className="text-2xl font-semibold mb-2">🌍 Community Outreach</h3>
              <p>Collaborating with schools, NGOs, and startups. Running social impact initiatives to benefit society beyond academics.</p>
            </div>
          </div>
        </section>

        <section className="text-center space-y-6">
          <h2 className="text-4xl font-bold mb-6">👤 Leadership</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            E-Nexus is proudly led by Sivasanjith G, President of the E-Nexus Society, along with a dedicated team of innovators, creators, and volunteers across six functional teams: Event Management, Technical & Innovation (AI/Sustainability), PR & Media, Content & Design, Marketing & Sponsorship, Community Outreach.
          </p>
        </section>

        <section className="text-center space-y-6">
          <h2 className="text-4xl font-bold mb-6">🌟 Why Join E-Nexus?</h2>
          <ul className="text-gray-300 text-lg leading-relaxed list-disc list-inside space-y-2">
            <li>💼 Skill Development – Learn entrepreneurship, leadership, and tech skills.</li>
            <li>🤝 Networking – Connect with industry experts, mentors, and entrepreneurs.</li>
            <li>🛠 Hands-On Projects – Work on real initiatives that create impact.</li>
            <li>🏆 Recognition – Get certified, recognized, and showcase your achievements.</li>
            <li>🚀 Future Opportunities – Gain access to startup, internship, and career opportunities.</li>
          </ul>
        </section>

      {/* CTA */}
<div className="relative z-10 pt-8 px-4 max-w-5xl mx-auto space-y-6 pb-6">
  {/* ... your content sections ... */}

  {/* CTA (Optional placeholder for future button or text) */}
  <div className="text-center mt-4">
    <p className="text-gray-400 text-sm">
      🚀 Stay tuned for upcoming opportunities with E-Nexus!
    </p>
  </div>
</div>




        
      </div>


      {/* FAQ Modal */}
      {/* FAQ Modal */}
{/* FAQ Modal with Accordion */}
      {faqOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-3xl w-full mx-4 relative">
            {/* Close button */}
            <button
              onClick={() => setFaqOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >
              ✖
            </button>

            {/* Modal title */}
            <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FF6EC7] to-[#D147FF]">
              Frequently Asked Questions
            </h2>

            {/* FAQ Accordion */}
            <FAQAccordion />
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
        body {
          font-family: 'Segoe UI Emoji', 'Noto Color Emoji', 'Apple Color Emoji', sans-serif;
        }
        .faq-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .faq-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(#D147FF, #FF6EC7);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

// FAQ Accordion component
function FAQAccordion() {
  const faqs = [
    { q: "1. What is E-Nexus?", a: "E-Nexus is the Entrepreneurship, AI & Sustainability hub of Kalasalingam Academy, focusing on innovation, student empowerment, and real-world impact." },
    { q: "2. Who can join E-Nexus?", a: "Any student from any year or department with interest in entrepreneurship, technology, creativity, or social impact can join." },
    { q: "3. How do I become a member?", a: "You need to fill out the recruitment form, attend the interview process, and get selected for one of the teams." },
    { q: "4. What are the different teams in E-Nexus?", a: "Event Management\nTechnical & Innovation (AI/Sustainability)\nPR & Media\nContent & Design\nMarketing & Sponsorship\nCommunity Outreach\nVolunteers" },
    { q: "5. What is the vision of E-Nexus?", a: "To disrupt, redefine, and revolutionize entrepreneurship and innovation on campus, while promoting sustainability and collaboration." },
    { q: "6. What kind of projects does E-Nexus work on?", a: "We work on startups, tech-driven solutions, sustainability models, workshops, hackathons, and community outreach programs." },
    { q: "7. Do I need prior experience to join?", a: "No. Passion, willingness to learn, and commitment are more important than prior experience." },
    { q: "8. How many hours do I need to commit weekly?", a: "On average, 2–5 hours per week, depending on your role and event schedules." },
    { q: "9. What benefits do I get as a member?", a: "Networking opportunities with entrepreneurs, mentors, and peers\nSkill development in leadership, communication, and innovation\nCertificates & recognition for contributions\nOpportunities to represent E-Nexus in external competitions" },
    { q: "10. Are there leadership positions available?", a: "Yes. Active members who show commitment may be promoted to core team or leadership roles." },
    { q: "11. Does E-Nexus provide internships or job opportunities?", a: "Directly, no. But through our network, projects, and startup ecosystem, members get access to internship and career opportunities." },
    { q: "12. Is there a membership fee?", a: "Currently, no fee is required. All students can apply for free." },
    { q: "13. Can I join more than one team?", a: "Yes, but your primary role will be in one team. You may collaborate with others on specific projects." },
    { q: "14. How often does E-Nexus conduct events?", a: "We conduct monthly activities, hackathons, workshops, and guest talks throughout the semester." },
    { q: "15. Does E-Nexus collaborate with external startups or industries?", a: "Yes. We actively collaborate with startups, NGOs, industries, and innovation hubs for projects and mentorship." },
    { q: "16. Can first-year students join?", a: "Yes! First-year students are highly encouraged to join and grow along with the society." },
    { q: "17. How does E-Nexus support innovation?", a: "Through technical workshops, hackathons, mentorship, and incubation support for students who want to turn ideas into real products." },
    { q: "18. How does E-Nexus contribute to sustainability?", a: "By creating green initiatives, awareness drives, and sustainable tech projects aligned with UN Sustainable Development Goals (SDGs)." },
    { q: "19. Who leads E-Nexus?", a: "E-Nexus is student-led by Sivasanjith G, President of the E-Nexus Society, with support from his dedicated student teams and faculty advisors driving innovation, entrepreneurship, and sustainability." },
    { q: "20. How can I contact E-Nexus?", a: "📧 Email: enexus@klu.ac.in\n🌐 Website: [Coming Soon]\n📱 Social Media: Official handles on Instagram, LinkedIn, etc." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 faq-scroll">
      {faqs.map((item, index) => (
        <div key={index} className="border-b border-gray-700 pb-2">
          <button
            onClick={() => toggleIndex(index)}
            className="w-full text-left flex justify-between items-center font-semibold text-gray-200 hover:text-white transition-colors"
          >
            {item.q}
            <span className="ml-2">{openIndex === index ? "−" : "+"}</span>
          </button>
          {openIndex === index && (
            <p className="text-sm text-gray-400 mt-2 whitespace-pre-line">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
