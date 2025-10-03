import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp, FiEye } from "react-icons/fi";
import styled, { createGlobalStyle, keyframes } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #000000;
    color: #fff;
    overflow-x: hidden;
  }
`;

const gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

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

const PageContainer = styled.div`
  min-height: 100vh;
  padding-bottom: 4rem;
  position: relative;
  background: #000000;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.05) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(255, 0, 255, 0.05) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1));
  background-size: 200% 200%;
  animation: ${gradientShift} 8s ease infinite;
  padding: 1.5rem 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8), 0 0 80px rgba(0, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  text-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  background-size: 200% 200%;
  animation: ${gradientShift} 5s ease infinite;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

const FilterButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  border: 2px solid rgba(0, 255, 255, 0.4);
  cursor: pointer;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  color: #00ffff;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.05);

  &:hover {
    background: rgba(0, 255, 255, 0.1);
    border-color: rgba(0, 255, 255, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 255, 255, 0.1);
    color: #fff;
  }

  &:active {
    transform: translateY(0);
  }
`;

const BubbleMenuContainer = styled(motion.div)`
  position: absolute;
  top: 80px;
  right: 2rem;
  z-index: 200;

  @media (max-width: 640px) {
    right: 1rem;
  }
`;

const BubbleMenuBox = styled(motion.div)`
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  padding: 0.75rem;
  border-radius: 20px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.9),
    0 0 0 1px rgba(0, 255, 255, 0.2),
    inset 0 0 40px rgba(0, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.2);
`;

const BubbleItem = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border-radius: 15px;
  background: ${props => props.$active
    ? "linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2))"
    : "transparent"};
  color: ${props => props.$active ? "#fff" : "#aaa"};
  border: ${props => props.$active ? "1px solid rgba(0, 255, 255, 0.4)" : "1px solid transparent"};
  cursor: pointer;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${props => props.$active
      ? "linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3))"
      : "rgba(0, 255, 255, 0.1)"};
    transform: translateX(5px);
    color: #fff;
    border-color: rgba(0, 255, 255, 0.4);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  }
`;

const BubbleIcon = styled.span`
  font-size: 1.4rem;
  filter: drop-shadow(0 0 8px currentColor);
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 1rem 1rem;
  gap: 1rem;
  position: relative;
  z-index: 1;
`;

const TabButton = styled(motion.button)`
  padding: 0.75rem 2rem;
  border-radius: 50px;
  border: 2px solid ${props => props.$active
    ? "rgba(0, 255, 255, 0.6)"
    : "rgba(255, 255, 255, 0.1)"};
  cursor: pointer;
  background: ${props => props.$active
    ? "linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2))"
    : "rgba(20, 20, 20, 0.6)"};
  backdrop-filter: blur(10px);
  color: ${props => props.$active ? "#fff" : "#888"};
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$active
    ? "0 8px 30px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1)"
    : "0 4px 15px rgba(0, 0, 0, 0.5)"};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
    transition: left 0.6s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 40px rgba(0, 255, 255, 0.4);
    border-color: rgba(0, 255, 255, 0.8);
    color: #fff;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const EventsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1.5rem;
  }
`;

const EventCardContainer = styled(motion.div)`
  background: rgba(15, 15, 15, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.05), rgba(255, 0, 255, 0.05));
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    border-color: rgba(0, 255, 255, 0.3);
    box-shadow: 0 12px 48px rgba(0, 255, 255, 0.2), 0 0 80px rgba(0, 255, 255, 0.1);
  }
`;

const EventImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 220px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 100%);
    z-index: 2;
  }
`;

const EventImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3));
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 255, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.4);
`;

const EventContent = styled.div`
  padding: 1.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
`;

const EventTitle = styled.h3`
  margin: 0 0 0.75rem 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
  letter-spacing: -0.3px;
`;

const EventMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const EventDate = styled.p`
  margin: 0;
  font-weight: 600;
  color: #aaa;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '📅';
  }
`;

const EventVenue = styled.p`
  margin: 0;
  font-weight: 500;
  color: #888;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '📍';
  }
`;

const EventDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  color: #bbb;
  flex: 1;
`;

const CountdownContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  border: 1px solid rgba(0, 255, 255, 0.2);
  box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.05);
`;

const TimeUnit = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const DigitContainer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
  color: #fff;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  font-family: 'SF Mono', 'Monaco', 'Courier New', monospace;
  font-size: 1.25rem;
  font-weight: 700;
  min-width: 45px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
`;

const UnitLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Separator = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ffff;
  align-self: center;
  padding-top: 0.5rem;
  animation: ${float} 2s ease-in-out infinite;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem 1.75rem;
  border-radius: 50px;
  border: 2px solid rgba(0, 255, 255, 0.4);
  cursor: pointer;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: ${shimmer} 3s infinite;
  }

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(0, 255, 255, 0.2);
    transform: translateY(-2px);
    border-color: rgba(0, 255, 255, 0.8);
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3));
  }

  &:active {
    transform: translateY(0);
  }
`;

const BackToTop = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3));
  color: #fff;
  border: 2px solid rgba(0, 255, 255, 0.5);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 30px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 255, 255, 0.1);
  z-index: 150;
  backdrop-filter: blur(10px);

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 255, 255, 0.6), inset 0 0 30px rgba(0, 255, 255, 0.2);
    border-color: rgba(0, 255, 255, 0.8);
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.1rem;
  grid-column: 1 / -1;

  &::before {
    content: '🔍';
    display: block;
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.3;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

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

  const TimeUnitComp = ({ value, label }) => (
    <TimeUnit>
      <DigitContainer
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      >
        {formatNumber(value)}
      </DigitContainer>
      <UnitLabel>{label}</UnitLabel>
    </TimeUnit>
  );

  return (
    <CountdownContainer>
      <TimeUnitComp value={timeLeft.days} label="Days" />
      <Separator>:</Separator>
      <TimeUnitComp value={timeLeft.hours} label="Hours" />
      <Separator>:</Separator>
      <TimeUnitComp value={timeLeft.minutes} label="Mins" />
      <Separator>:</Separator>
      <TimeUnitComp value={timeLeft.seconds} label="Secs" />
    </CountdownContainer>
  );
};

const EventCard = ({ event, index, isPast = false }) => {
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
    <EventCardContainer
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3, type: "spring", stiffness: 300 },
      }}
    >
      <EventImageContainer>
        <EventImage
          src={event.image}
          alt={event.title}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
        <CategoryBadge>{event.category}</CategoryBadge>
      </EventImageContainer>

      <EventContent>
        <EventTitle>{event.title}</EventTitle>
        <EventMeta>
          <EventDate>
            {formatDate(event.date)} at {formatTime(event.date)}
          </EventDate>
          <EventVenue>{event.venue}</EventVenue>
        </EventMeta>
        <EventDescription>{event.description}</EventDescription>
        <CountdownTimer targetDate={event.date} />
        <ActionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <FiEye size={20} /> {isPast ? "View Highlights" : "Register Now"}
        </ActionButton>
      </EventContent>
    </EventCardContainer>
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

  return (
    <AnimatePresence>
      {isVisible && (
        <BackToTop
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          whileHover={{ scale: 1.15, y: -5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <FiArrowUp />
        </BackToTop>
      )}
    </AnimatePresence>
  );
};

const BubbleMenu = ({ isOpen, onClose, onFilterSelect, activeFilter, triggerRef }) => {
  const filterOptions = [
    { id: "all", label: "All Events", icon: "🎯" },
    { id: "workshops", label: "Workshops", icon: "🛠️" },
    { id: "hackathons", label: "Hackathons", icon: "💻" },
    { id: "techtalks", label: "Tech Talks", icon: "🎤" },
    { id: "fests", label: "Fests", icon: "🎉" }
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

  const containerVariants = {
    hidden: { scale: 0, opacity: 0, y: -20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    },
    exit: {
      scale: 0,
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <BubbleMenuContainer
          className="bubble-menu-container"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <BubbleMenuBox>
            {filterOptions.map((option) => (
              <BubbleItem
                key={option.id}
                $active={activeFilter === option.id}
                onClick={() => {
                  onFilterSelect(option.id);
                  onClose();
                }}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BubbleIcon>{option.icon}</BubbleIcon> {option.label}
              </BubbleItem>
            ))}
          </BubbleMenuBox>
        </BubbleMenuContainer>
      )}
    </AnimatePresence>
  );
};

const Header = ({ isMenuOpen, setIsMenuOpen, onFilterSelect, activeFilter }) => {
  const filterButtonRef = useRef(null);

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderTitle>E-Nexus Events</HeaderTitle>
        <FilterButton
          ref={filterButtonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Filter Events
        </FilterButton>
        <BubbleMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onFilterSelect={onFilterSelect}
          activeFilter={activeFilter}
          triggerRef={filterButtonRef}
        />
      </HeaderContent>
    </HeaderContainer>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  const getFilteredEvents = (events) => {
    if (activeFilter === "all") return events;
    return events.filter(
      (event) => event.category.toLowerCase() === activeFilter.toLowerCase()
    );
  };

  const filteredUpcoming = getFilteredEvents(upcomingEvents);
  const filteredPast = getFilteredEvents(pastEvents);

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <Header
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          onFilterSelect={setActiveFilter}
          activeFilter={activeFilter}
        />

        <TabsContainer>
          <TabButton
            $active={activeTab === "upcoming"}
            onClick={() => setActiveTab("upcoming")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upcoming Events
          </TabButton>
          <TabButton
            $active={activeTab === "past"}
            onClick={() => setActiveTab("past")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Past Events
          </TabButton>
        </TabsContainer>

        <AnimatePresence mode="wait">
          {activeTab === "upcoming" ? (
            <EventsGrid
              key="upcoming"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {filteredUpcoming.length > 0 ? (
                filteredUpcoming.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))
              ) : (
                <EmptyState
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  No events found for this filter
                </EmptyState>
              )}
            </EventsGrid>
          ) : (
            <EventsGrid
              key="past"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {filteredPast.length > 0 ? (
                filteredPast.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))
              ) : (
                <EmptyState
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  No events found for this filter
                </EmptyState>
              )}
            </EventsGrid>
          )}
        </AnimatePresence>

        <BackToTopButton />
      </PageContainer>
    </>
  );
}

export default App;
