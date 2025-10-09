import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const SAMPLE_ITEMS = [
    { id: '1', title: 'Core Team — Alice', category: 'Team', image: '/images/gallery1.jpg', meta: 'President — 2025' },
    { id: '2', title: 'Organizers Group', category: 'Team', image: '/images/gallery1.jpg', meta: 'Org Committee' },
    { id: '4', title: 'Workshop — React Patterns', category: 'Events', image: '/images/gallery1.jpg', meta: 'Workshop • Feb 10, 2025' },
    { id: '5', title: 'Hackathon Winners', category: 'Winners', image: '/images/gallery1.jpg', meta: '1st Prize — Team Nexus' },
    { id: '6', title: 'Coding Contest Winner', category: 'Winners', image: '/images/gallery1.jpg', meta: '2nd Prize — John Doe' },
    { id: '7', title: 'Main Auditorium', category: 'Venues', image: '/images/gallery1.jpg', meta: 'Block A, Main Campus' },
    { id: '8', title: 'Open Grounds', category: 'Venues', image: '/images/gallery1.jpg', meta: 'Green Field' }
];

const categories = ['All', 'Team', 'Events', 'Winners', 'Venues'];

// -------------------- Particle Background --------------------
const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: null, y: null });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        const particles = Array.from({ length: 100 }).map(() => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5
        }));

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
        window.addEventListener('resize', resize);

        let raf;
        const animate = () => {
            ctx.clearRect(0, 0, w, h);

            particles.forEach(p => {
                p.x += p.dx;
                p.y += p.dy;

                if (p.x < 0 || p.x > w) p.dx *= -1;
                if (p.y < 0 || p.y > h) p.dy *= -1;

                // Draw pink particle
                ctx.beginPath();
                ctx.fillStyle = '#FF69B4';
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();

                // Draw line to mouse if close
                if (mouse.current.x && mouse.current.y) {
                    const dx = p.x - mouse.current.x;
                    const dy = p.y - mouse.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255,105,180,${1 - dist / 150})`;
                        ctx.lineWidth = 1.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.current.x, mouse.current.y);
                        ctx.stroke();
                    }
                }
            });

            raf = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};

// -------------------- Back to Top Button --------------------
const BackToTopButton = () => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return visible ? (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-4 right-4 p-3 bg-pink-500 text-white rounded-full shadow-lg">↑ Top</button>
    ) : null;
};

// -------------------- Gallery Page --------------------
export default function GalleryPage() {
    const [filter, setFilter] = useState('All');
    const [query, setQuery] = useState('');
    const [items] = useState(SAMPLE_ITEMS);
    const [lightbox, setLightbox] = useState({ open: false, index: 0 });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const filtered = items.filter(it => (filter === 'All' || it.category === filter) && (
        it.title.toLowerCase().includes(query.toLowerCase()) ||
        it.meta.toLowerCase().includes(query.toLowerCase()) ||
        it.category.toLowerCase().includes(query.toLowerCase())
    ));

    const openLightbox = i => setLightbox({ open: true, index: i });
    const closeLightbox = () => setLightbox({ open: false, index: 0 });
    const nextLightbox = () => setLightbox(s => ({ ...s, index: (s.index + 1) % filtered.length }));
    const prevLightbox = () => setLightbox(s => ({ ...s, index: (s.index - 1 + filtered.length) % filtered.length }));

    useEffect(() => { document.body.style.overflow = lightbox.open ? 'hidden' : 'auto'; }, [lightbox.open]);

    const sidebarRef = useRef(null);
    useEffect(() => {
        if (!sidebarRef.current) return;
        if (sidebarOpen) {
            gsap.to(sidebarRef.current, { x: 0, duration: 0.4, ease: 'power2.out' });
            gsap.to('.sidebar-overlay', { opacity: 1, duration: 0.3 });
        } else {
            gsap.to(sidebarRef.current, { x: '-100%', duration: 0.4, ease: 'power2.in' });
            gsap.to('.sidebar-overlay', { opacity: 0, duration: 0.3 });
        }
    }, [sidebarOpen]);

    return (
        <div className="min-h-screen relative font-sans text-white bg-[#0a0e14]">
            <ParticleBackground />

            {/* Sidebar Overlay */}
            <div className="sidebar-overlay fixed inset-0 bg-black bg-opacity-50 z-40 opacity-0 pointer-events-none" onClick={() => setSidebarOpen(false)} />

            {/* Sidebar */}
            <div ref={sidebarRef} className="fixed top-0 left-0 h-full w-80 bg-gray-900 shadow-2xl z-50 transform -translate-x-full">
                <div className="p-8 h-full flex flex-col">
                    <button onClick={() => setSidebarOpen(false)} className="self-end mb-8 text-gray-400 hover:text-white">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <nav className="flex-1">
                        <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Navigation</h3>
                        <ul className="space-y-6">
                            <Link to="/" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg">🏠 Home</Link>
                            <Link to="/about" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg">ℹ About</Link>
                            <Link to="/contact" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg">📞 Contact</Link>
                            <Link to="/events" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg">📅 Events</Link>
                            <Link to="/gallery" className="block text-xl text-gray-300 hover:text-white hover:bg-gray-800 p-4 rounded-lg">🖼 Gallery</Link>
                        </ul>
                    </nav>
                    <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">© 2025 E-Nexus Tech Club</div>
                </div>
            </div>

            {/* Menu Button */}
            <button onClick={() => setSidebarOpen(true)} className="fixed top-8 left-8 z-50 bg-gradient-to-r from-blue-500 to-[#D147FF] hover:from-blue-600 hover:to-[#FF6EC7] text-white p-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Gallery content */}
            <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-8 py-8">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">E‑Nexus Club — Gallery</h1>
                    <p className="mt-1 text-sm text-gray-400">Browse team photos, event highlights, prize winners and venues. Click an image to open details.</p>

                    <div className="mt-4 relative w-full md:w-1/3">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search gallery..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0f1720] border border-[#263044] placeholder-gray-500 text-sm focus:outline-none"
                        />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 items-center justify-center">
                        {categories.map(c => (
                            <button
                                key={c}
                                onClick={() => setFilter(c)}
                                className={`px-3 py-2 rounded-full text-sm font-medium transition ${
                                    filter === c
                                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow'
                                        : 'bg-[#0f1720] text-gray-300 border border-[#263044]'
                                }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </header>

                <main>
                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">No images found. Try changing filters or search.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filtered.map((it, idx) => (
                                <article
                                    key={it.id}
                                    className="group relative rounded-2xl overflow-hidden border border-[#1b2230] 
               bg-gradient-to-b from-[#071021] to-[#050812]
               shadow-[0_8px_24px_rgba(23,2,23,0.6)] transition-all duration-500 transform will-change-transform
               hover:-translate-y-3 hover:scale-[1.03]
               hover:shadow-[0_28px_60px_rgba(23,2,23,0.72),0_12px_40px_rgba(255,105,180,0.18)]"
                                >
                                    <button
                                        onClick={() => openLightbox(idx)}
                                        className="block w-full h-56 md:h-48 lg:h-56 focus:outline-none relative overflow-hidden rounded-2xl"
                                        aria-label={`Open ${it.title}`}
                                    >
                                        <img
                                            src={it.image}
                                            alt={it.title}
                                            className="w-full h-full object-cover rounded-2xl transform transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />

                                        {/* Top-to-bottom pink glass highlight */}
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-0 pointer-events-none rounded-2xl"
                                            style={{
                                                background:
                                                    'linear-gradient(180deg, rgba(255,182,193,0.08) 0%, rgba(255,105,180,0.02) 12%, rgba(0,0,0,0.06) 70%, rgba(0,0,0,0.18) 100%)',
                                                mixBlendMode: 'overlay'
                                            }}
                                        />

                                        {/* Inner inset for depth */}
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-0 rounded-2xl pointer-events-none"
                                            style={{
                                                boxShadow: 'inset 0 6px 18px rgba(0,0,0,0.45), inset 0 -8px 22px rgba(23,2,23,0.55)'
                                            }}
                                        />

                                        {/* thin top pink streak reflection */}
                                        <div
                                            aria-hidden="true"
                                            className="absolute left-4 right-4 top-3 h-5 rounded-lg pointer-events-none"
                                            style={{
                                                background: 'linear-gradient(90deg, rgba(255,105,180,0.18), rgba(255,182,193,0.04), rgba(255,105,180,0.12))',
                                                filter: 'blur(6px)',
                                                opacity: 0.85
                                            }}
                                        />
                                    </button>

                                    <div className="p-4">
                                        <h3 className="text-sm font-semibold text-white/95 leading-tight">{it.title}</h3>
                                        <p className="text-xs text-gray-300 mt-1">{it.meta}</p>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-xs px-2 py-1 rounded-full bg-[#071021]/60 text-gray-200 border border-[#1b2230]/80">
                                                {it.category}
                                            </span>
                                            <button
                                                onClick={() => openLightbox(idx)}
                                                className="text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors"
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>

                                    {/* Classy bottom glow overlay */}
                                    <div
                                        aria-hidden="true"
                                        className="absolute bottom-0 left-0 right-0 h-32 rounded-b-2xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                        style={{
                                            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 40%, rgba(23,2,23,0.6) 100%)',
                                            filter: 'blur(18px)',
                                        }}
                                    />
                                </article>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* Lightbox */}
            {lightbox.open && filtered.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black" onClick={closeLightbox} role="dialog" aria-modal="true">
                    <div className="max-w-4xl w-full bg-[#08101a] rounded-2xl overflow-hidden border border-[#263044]" onClick={e => e.stopPropagation()}>
                        <div className="flex items-start justify-between p-4 border-b border-[#122033]">
                            <div>
                                <h4 className="text-lg font-bold">{filtered[lightbox.index].title}</h4>
                                <p className="text-xs text-gray-400">{filtered[lightbox.index].meta} • {filtered[lightbox.index].category}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={prevLightbox} className="px-3 py-2 bg-[#0f1720] rounded">Prev</button>
                                <button onClick={nextLightbox} className="px-3 py-2 bg-[#0f1720] rounded">Next</button>
                                <button onClick={closeLightbox} className="px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded text-white">Close</button>
                            </div>
                        </div>
                        <div className="p-6">
                            <img src={filtered[lightbox.index].image} alt={filtered[lightbox.index].title} className="w-full h-[60vh] object-contain rounded" />
                        </div>
                    </div>
                </div>
            )}

            <BackToTopButton />
        </div>
    );
}