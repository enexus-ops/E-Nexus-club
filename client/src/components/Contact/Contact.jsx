import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import axios from "axios";

export default function Contact() {
  const [showContent, setShowContent] = useState(false);
  const mainRef = useRef(null);
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
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  
  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => setShowContent(true),
        }
      );
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.fullName) validationErrors.fullName = "Full name required";
    if (!formData.email) validationErrors.email = "Email required";
    if (!formData.subject) validationErrors.subject = "Subject required";
    if (!formData.message) validationErrors.message = "Message required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      
      const res = await axios.post("http://localhost:8080/api/contact", {
        userName: formData.fullName,
        userEmail: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      if (res.status === 200) {
        setSubmitStatus("success");
        setFormData({ fullName: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="h-screen w-screen relative bg-black text-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div ref={mainRef} className="relative z-10 px-8 pt-28 max-w-6xl mx-auto">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF6EC7] to-[#D147FF] bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about our club? Send us a message and we will respond as soon as possible.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF6EC7] to-[#D147FF] bg-clip-text text-transparent">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <svg
                  className="w-6 h-6 text-[#FF6EC7]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div>
                  <p>Krishnankoil, Srivilliputhur, Tamil Nadu</p>
                  <p>626126</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg
                  className="w-6 h-6 text-[#FF6EC7]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href="mailto:enexus@klu.ac.in" className="hover:underline">
                  enexus@klu.ac.in
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            {submitStatus === "success" && (
              <div className="p-4 rounded-lg bg-green-500 bg-opacity-20 text-green-600 font-semibold">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-4 rounded-lg bg-red-500 bg-opacity-20 text-red-600 font-semibold">
                Something went wrong. Please try again later.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-4 rounded-lg bg-gray-900 text-white border ${
                  errors.fullName ? "border-red-500" : "border-gray-700"
                }`}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-4 rounded-lg bg-gray-900 text-white border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                }`}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full p-4 rounded-lg bg-gray-900 text-white border ${
                  errors.subject ? "border-red-500" : "border-gray-700"
                }`}
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={`w-full p-4 rounded-lg bg-gray-900 text-white border ${
                  errors.message ? "border-red-500" : "border-gray-700"
                }`}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 bg-gradient-to-r from-blue-500 to-[#D147FF] rounded-lg font-bold hover:scale-105 transition-transform flex justify-center items-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
