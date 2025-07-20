# Component Usage Guide

This guide provides detailed examples and best practices for using each component in the 3D Portfolio application.

## Table of Contents
- [Quick Start](#quick-start)
- [Hero Section Setup](#hero-section-setup)
- [Navigation Configuration](#navigation-configuration)
- [Portfolio Management](#portfolio-management)
- [Experience Timeline](#experience-timeline)
- [Contact Form Setup](#contact-form-setup)
- [3D Canvas Implementation](#3d-canvas-implementation)
- [Animation Patterns](#animation-patterns)
- [Responsive Design](#responsive-design)

## Quick Start

### Basic App Structure
```jsx
import React, { useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { 
  Contact, 
  Experience, 
  Hero, 
  Navbar, 
  Portfolio 
} from './components';

const App = () => {
  const wrapperRef = useRef(null);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <Navbar />
        <div className='wrapper' ref={wrapperRef}>
          <div id="hero" className='z-10'>
            <Hero scrollContainer={wrapperRef} />
          </div>
          <div id="portfolio" className='relative z-30 bg-primary'>
            <Portfolio />
          </div>
          <div id="experience" className='relative z-30 bg-primary'>
            <Experience />
          </div>
          <div id="contact" className='relative z-30 bg-primary'>
            <Contact />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
```

## Hero Section Setup

### Basic Implementation
```jsx
import { Hero } from './components';
import { useRef } from 'react';

const App = () => {
  const scrollContainerRef = useRef(null);
  
  return (
    <div className="wrapper" ref={scrollContainerRef}>
      <Hero scrollContainer={scrollContainerRef} />
    </div>
  );
};
```

### Custom Hero Content
To customize the hero section content, modify the Hero component:

```jsx
// src/components/Hero.jsx
const Hero = ({ scrollContainer }) => {
  return (
    <section className="parallax">
      <div className='parallax__content absolute top-[10%] sm:top-[16%] lg:top-[24%] w-full mx-auto lg:pl-[38vh] lg:pr-[30vh] xl:pl-96 xl:pr-72 2xl:px-40 3xl:px-60 flex flex-col lg:flex-row items-start z-10'>
        <div className="flex-1 lg:mb-0">
          <h1 className='font-medium text-white text-[40px] xs:text-[50px] sm:text-[68px] md:text-[80px] lg:text-[100px] 2xl:text-[180px] leading-[110px] 2xl:leading-[160px]'>
            YOUR NAME HERE
          </h1>
          <Position />
        </div>
        <div className="flex-1 flex justify-start lg:justify-end mt-4 sm:mt-14 ml-8 xs:ml-[-4vh] sm:ml-[-17vh] md:ml-[-26vh] lg:mt-10 2xl:mt-0">
          <div className='font-bold text-[20px] sm:text-[30px] md:text-[36px] 2xl:text-[46px] sm:leading-[40px] md:leading-[50px] 2xl:leading-[60px] streaky-glow max-w-sm 2xl:max-w-lg text-white text-left'>
            Your custom tagline or description here.
          </div>
        </div>
      </div>

      {/* Parallax Background Layers */}
      <img className="parallax__stars" src="./parallax/1Stars.svg" alt="" />
      <img className="parallax__planets" src="./parallax/2Planets.svg" alt="" />
      <img className="parallax__mountain1" src="./parallax/3Mountain.svg" alt="" />
      <img className="parallax__mountain2" src="./parallax/4Mountain.svg" alt="" />
      <img className="parallax__crater" src="./parallax/5Crater.svg" alt="" />
      <img className="parallax__sun" src="./parallax/6Sun.svg" alt="" />

      <SpacemanCanvas scrollContainer={scrollContainer} />
    </section>
  );
};
```

### Position Text Customization
```jsx
// src/components/Position.jsx
const Position = () => {
  return (
    <div className="relative cursor-default font-medium text-white text-[16px] xs:text-[20px] sm:text-[30px] md:text-[36px] 2xl:text-[66px] leading-[32px] 2xl:leading-[40px] w-full flex justify-center items-center">
      <div className="absolute inset-0 top-[-30px] sm:top-[-10px] lg:top-0 flex flex-col">
        <div className="text first absolute left-1 md:left-2 2xl:left-4 flex" aria-label="Your First Title">
          {produceSpans("Your First Title", "animate-textRotate1")}
        </div>
        <div className="text second absolute left-1 md:left-2 2xl:left-4 flex" aria-label="Your Second Title">
          {produceSpans("Your Second Title", "animate-textRotate2")}
        </div>
      </div>
    </div>
  );
};
```

## Navigation Configuration

### Adding New Navigation Items
Update `src/data/index.js`:

```javascript
export const navLinks = [
  { id: "hero", title: "Home" },
  { id: "about", title: "About" },
  { id: "portfolio", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "services", title: "Services" },
  { id: "contact", title: "Contact" }
];
```

### Custom Navigation Styling
```jsx
// Custom navigation with different styling
const CustomNavbar = () => {
  const [active, setActive] = useState("hero");
  
  return (
    <nav className="w-full flex items-center bg-black/90 backdrop-blur-md p-8 fixed z-40">
      <div className='w-full flex justify-between items-center mx-auto max-w-7xl'>
        <Link to='/' className='flex items-center'>
          <img src="/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
          <p className='text-white text-[24px] font-bold'>Portfolio</p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-8'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? "text-blue-400" : "text-gray-300"
              } hover:text-white text-[18px] font-medium cursor-pointer transition-colors`}
              onClick={() => setActive(nav.id)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
```

## Portfolio Management

### Adding New Projects
Update `src/data/index.js`:

```javascript
const portfolio = [
  {
    name: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
    image: "/images/ecommerce-project.png",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/username/ecommerce",
    live: "https://ecommerce-demo.com"
  },
  {
    name: "AI Chat Application",
    description: "Real-time chat application powered by OpenAI API with modern UI and responsive design.",
    image: "/images/chat-app.png",
    technologies: ["React", "Socket.io", "OpenAI", "Tailwind"],
    github: "https://github.com/username/ai-chat",
    live: "https://ai-chat-demo.com"
  }
];
```

### Enhanced Portfolio Component
```jsx
// Enhanced ProjectCard with additional features
const ProjectCard = ({
  index,
  name,
  description,
  image,
  technologies,
  github,
  live
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={fadeIn("up", "spring", 0, 0.75)}
      className={`w-full mt-[-2px] flex flex-col md:flex-row ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } gap-5`}
    >
      <div className='relative w-full md:w-3/5 group'>
        <img
          src={image}
          alt={name}
          className='w-full h-auto object-cover md:rounded-3xl transition-transform group-hover:scale-105'
        />
        
        {/* Overlay with links */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 md:rounded-3xl">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              View Code
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>

      <div className={`w-full md:w-2/5 px-6 md:p-16 flex flex-col justify-center ${
        isEven ? "text-left md:text-left" : "text-left md:text-right"
      }`}>
        <h3 className='text-white font-medium text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-tight'>
          {name}
        </h3>
        
        <p className='mt-4 text-secondary text-sm sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl'>
          {description}
        </p>
        
        {/* Technology Tags */}
        {technologies && (
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
```

## Experience Timeline

### Adding New Experience
Update `src/data/index.js`:

```javascript
const experiences = [
  {
    title: "Senior Full Stack Developer",
    company_name: "Tech Company Inc.",
    date: "2023 - Present",
    details: [
      "Led development of <span style='color: white;'>microservices architecture</span> serving 1M+ users daily.",
      "Implemented <span style='color: white;'>CI/CD pipelines</span> reducing deployment time by 60%.",
      "Mentored junior developers and conducted <span style='color: white;'>technical interviews</span>."
    ],
    technologies: ["React", "Node.js", "AWS", "Docker"],
    location: "San Francisco, CA"
  }
];
```

### Enhanced Experience Component
```jsx
const ExperienceCard = ({ experience, onClick, isActive, isMobile }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer sm:mb-5 p-5 max-w-xl relative sm:text-left text-center transition-all duration-300 hover:bg-gray-800/50 rounded-lg ${
        isMobile ? "text-quaternary" : ""
      }`}
    >
      {(isActive || isMobile) && (
        <div className="absolute left-0 top-0 bottom-0 w-3 md:w-5 bg-tertiary my-6 sm:block hidden rounded-r-lg"></div>
      )}
      
      <div className="sm:pl-8">
        <h3 className={`text-xl lg:text-2xl xl:text-3xl font-bold ${
          isActive || isMobile ? "text-quaternary" : "text-slate-600"
        }`}>
          {experience.title}
        </h3>
        
        <p className={`text-md lg:text-lg xl:text-2xl sm:font-medium pt-2 ${
          isActive || isMobile ? "text-white" : "text-slate-600"
        }`}>
          {experience.company_name} | {experience.date}
        </p>
        
        {experience.location && (
          <p className={`text-sm pt-1 ${
            isActive || isMobile ? "text-gray-300" : "text-slate-500"
          }`}>
            📍 {experience.location}
          </p>
        )}
      </div>
    </div>
  );
};
```

## Contact Form Setup

### Basic Contact Form
```jsx
import emailjs from "@emailjs/browser";
import { useState, useRef } from "react";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Using EmailJS (alternative to Getform.io)
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );
      
      alert('Thank you. I will get back to you as soon as possible.');
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:m-12 md:px-48 flex flex-col sm:flex-row gap-10 overflow-hidden">
      <div className='flex-[0.8] md:pb-40 mx-4 sm:mx-auto'>
        <h3 className="text-white font-bold text-[40px] md:text-[60px]">
          Get In Touch
        </h3>
        
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 gap-4 flex flex-col"
        >
          <label className='text-white font-medium mt-3'>
            Full Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="bg-tertiary p-4 text-white border font-medium w-full mt-2 rounded-lg"
              required
            />
          </label>
          
          <label className='text-white font-medium mt-3'>
            Email Address
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="bg-tertiary p-4 text-white border font-medium w-full mt-2 rounded-lg"
              required
            />
          </label>
          
          <label className='text-white font-medium mt-3'>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="10"
              className="bg-tertiary p-4 text-white border font-medium w-full mt-2 rounded-lg"
              required
            />
          </label>
          
          <button
            type='submit'
            disabled={loading}
            className='bg-tertiary py-3 px-8 w-fit text-white font-bold shadow-md shadow-primary rounded-lg hover:bg-tertiary/80 transition-colors disabled:opacity-50'
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};
```

### Custom Form Validation
```jsx
const validateForm = (form) => {
  const errors = {};
  
  if (!form.name.trim()) {
    errors.name = "Name is required";
  }
  
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Email is invalid";
  }
  
  if (!form.message.trim()) {
    errors.message = "Message is required";
  } else if (form.message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  }
  
  return errors;
};
```

## 3D Canvas Implementation

### Custom 3D Model Integration
```jsx
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Custom3DModel = ({ position, scale, rotation }) => {
  const modelRef = useRef();
  const { scene, animations } = useGLTF('/path-to-your-model.glb');
  const { actions } = useAnimations(animations, modelRef);

  useFrame((state) => {
    // Add custom animations here
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={modelRef} position={position} scale={scale} rotation={rotation}>
      <primitive object={scene} />
    </mesh>
  );
};

// Canvas setup
const Custom3DCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Custom3DModel 
          position={[0, 0, 0]} 
          scale={[1, 1, 1]} 
          rotation={[0, 0, 0]} 
        />
      </Suspense>
    </Canvas>
  );
};
```

## Animation Patterns

### Common Animation Combinations
```jsx
import { motion } from "framer-motion";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

// Staggered list animation
const AnimatedList = ({ items }) => (
  <motion.div
    variants={staggerContainer(0.1, 0.2)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
  >
    {items.map((item, index) => (
      <motion.div
        key={index}
        variants={fadeIn("up", "spring", index * 0.1, 0.75)}
        className="mb-4"
      >
        {item}
      </motion.div>
    ))}
  </motion.div>
);

// Page transition animation
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

// Hover card animation
const HoverCard = ({ children }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotateY: 5 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="cursor-pointer"
  >
    {children}
  </motion.div>
);
```

## Responsive Design

### Breakpoint Patterns
```jsx
// Responsive component sizing
const ResponsiveComponent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`
      ${isMobile ? 'p-4 text-sm' : ''}
      ${isTablet ? 'p-6 text-base' : ''}
      ${!isMobile && !isTablet ? 'p-8 text-lg' : ''}
    `}>
      Content adapts to screen size
    </div>
  );
};
```

### Responsive Typography Scale
```javascript
// Add to your Tailwind config or CSS
const responsiveTextClasses = {
  heading: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  subheading: "text-lg sm:text-xl md:text-2xl lg:text-3xl",
  body: "text-sm sm:text-base md:text-lg",
  caption: "text-xs sm:text-sm md:text-base"
};
```

## Best Practices

### Component Organization
```jsx
// Component file structure
const ComponentName = ({ prop1, prop2 }) => {
  // 1. State declarations
  const [state, setState] = useState(initialValue);
  
  // 2. Refs
  const ref = useRef(null);
  
  // 3. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 4. Event handlers
  const handleEvent = () => {
    // Handler logic
  };
  
  // 5. Render helpers
  const renderSubComponent = () => (
    <div>Sub component</div>
  );
  
  // 6. Main render
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### Performance Optimization
```jsx
import { memo, useMemo, useCallback } from 'react';

// Memoized component for expensive renders
const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }, [data]);

  const handleClick = useCallback((id) => {
    // Handle click logic
  }, []);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});
```

This guide covers the most common usage patterns and customization scenarios for the 3D Portfolio components. Refer to the main API documentation for complete technical specifications.