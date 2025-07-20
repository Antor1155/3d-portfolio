# 3D Portfolio - API Documentation

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Components API](#components-api)
- [Utilities API](#utilities-api)
- [Higher-Order Components](#higher-order-components)
- [Data Configuration](#data-configuration)
- [Styling System](#styling-system)
- [Usage Examples](#usage-examples)
- [Installation & Setup](#installation--setup)

## Overview

This is a React.js 3D portfolio application built with modern web technologies including Three.js, Framer Motion, and Tailwind CSS. The project showcases an interactive 3D spaceman character with parallax scrolling effects and smooth animations.

### Key Technologies
- **React 18.2.0** - UI framework
- **Three.js 0.149.0** - 3D graphics
- **@react-three/drei 9.56.24** - React Three.js helpers
- **Framer Motion 9.0.7** - Animations
- **Tailwind CSS 3.2.6** - Styling
- **Vite 4.1.0** - Build tool

## Project Structure

```
src/
├── components/          # React components
│   ├── Contact.jsx      # Contact form
│   ├── Experience.jsx   # Experience timeline
│   ├── Hero.jsx         # Hero section with 3D spaceman
│   ├── Loader.jsx       # 3D loading component
│   ├── Navbar.jsx       # Navigation bar
│   ├── Portfolio.jsx    # Portfolio projects
│   ├── Position.jsx     # Animated position text
│   ├── Spaceman.jsx     # 3D spaceman canvas
│   └── index.js         # Component exports
├── hoc/                 # Higher-order components
│   ├── SectionWrapper.jsx # Section animation wrapper
│   └── index.js         # HOC exports
├── utils/               # Utility functions
│   └── motion.js        # Framer Motion variants
├── data/                # Configuration data
│   └── index.js         # Application data
├── assets/              # Static assets
│   └── index.js         # Asset exports
├── styles.js            # Style constants
├── App.jsx              # Main application
└── main.jsx             # Application entry point
```

## Components API

### Hero Component

The main hero section featuring a 3D spaceman and parallax background.

```jsx
import { Hero } from './components';

<Hero scrollContainer={scrollContainerRef} />
```

#### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `scrollContainer` | `React.RefObject` | Yes | Reference to the scroll container for parallax effects |

#### Features
- Parallax scrolling with multiple background layers
- 3D spaceman character with scroll-based animations
- Responsive typography and layout
- Animated position text overlay

---

### Navbar Component

Responsive navigation bar with scroll-based active state management.

```jsx
import { Navbar } from './components';

<Navbar />
```

#### Props
No props required.

#### Features
- Automatic active section detection using Intersection Observer
- Mobile-responsive hamburger menu
- Smooth scroll to sections
- Dynamic styling based on scroll position
- Background gradient on mobile

#### State Management
- `active`: Currently active navigation section
- `toggle`: Mobile menu visibility state
- `scrolled`: Whether page has been scrolled

---

### Portfolio Component

Displays portfolio projects in an alternating card layout.

```jsx
import { Portfolio } from './components';

<Portfolio />
```

#### Props
No props required (uses data from `src/data/index.js`).

#### Features
- Animated project cards with Framer Motion
- Alternating left/right layout for visual interest
- Responsive image and text positioning
- Intersection Observer for scroll-triggered animations

#### Sub-components

##### ProjectCard
Internal component for individual project display.

```jsx
<ProjectCard 
  index={number}
  name={string}
  description={string}
  image={string}
/>
```

---

### Experience Component

Interactive experience timeline with clickable job entries.

```jsx
import { Experience } from './components';

<Experience />
```

#### Props
No props required (uses data from `src/data/index.js`).

#### Features
- Clickable experience cards
- Dynamic detail display
- Mobile-responsive layout
- Active state management
- HTML content rendering for rich text

#### Sub-components

##### ExperienceCard
```jsx
<ExperienceCard 
  experience={object}
  onClick={function}
  isActive={boolean}
  isMobile={boolean}
/>
```

##### ExperienceDetails
```jsx
<ExperienceDetails experience={object} />
```

---

### Contact Component

Contact form with external form submission.

```jsx
import { Contact } from './components';

<Contact />
```

#### Props
No props required.

#### Features
- Form submission to Getform.io
- Loading state management
- Responsive layout
- Input validation
- Framer Motion animations

#### Form Fields
- `name`: Full name (text input)
- `email`: Email address (text input)
- `message`: Message content (textarea)

---

### SpacemanCanvas Component

3D spaceman character with scroll-based animations.

```jsx
import { SpacemanCanvas } from './components';

<SpacemanCanvas scrollContainer={scrollContainerRef} />
```

#### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `scrollContainer` | `React.RefObject` | Yes | Reference for scroll-based animations |

#### Features
- 3D GLTF model loading and animation
- Scroll-based rotation effects
- Responsive scaling and positioning
- Multiple lighting setups
- Idle animation loop

#### Sub-components

##### Spaceman
Internal 3D mesh component.

```jsx
<Spaceman scale={array} position={array} />
```

---

### Position Component

Animated rotating text display for job titles.

```jsx
import { Position } from './components';

<Position />
```

#### Props
No props required.

#### Features
- Character-by-character animation
- Dual rotating text effects
- Responsive typography
- Custom CSS animations

#### Functions

##### produceSpans
```jsx
const produceSpans = (text, animation) => JSX.Element[]
```
Converts text string into animated span elements.

**Parameters:**
- `text` (string): Text to animate
- `animation` (string): CSS animation class name

**Returns:** Array of JSX span elements

---

### CanvasLoader Component

Loading component for 3D canvas elements.

```jsx
import { CanvasLoader } from './components';

<CanvasLoader />
```

#### Props
No props required.

#### Features
- Progress percentage display
- CSS loading animation
- Centered positioning
- Three.js integration

## Utilities API

### Motion Utilities (`src/utils/motion.js`)

Collection of Framer Motion animation variants.

#### textVariant

Creates text reveal animation with spring effect.

```jsx
import { textVariant } from '../utils/motion';

<motion.div variants={textVariant(0.2)}>
  <h1>Animated Text</h1>
</motion.div>
```

**Parameters:**
- `delay` (number): Animation delay in seconds

**Returns:** Framer Motion variants object

---

#### fadeIn

Creates fade-in animation with directional movement.

```jsx
import { fadeIn } from '../utils/motion';

<motion.div variants={fadeIn("up", "spring", 0.5, 1.25)}>
  <div>Content</div>
</motion.div>
```

**Parameters:**
- `direction` (string): Animation direction - "left", "right", "up", "down"
- `type` (string): Animation type - "spring", "tween", etc.
- `delay` (number): Animation delay in seconds
- `duration` (number): Animation duration in seconds

**Returns:** Framer Motion variants object

---

#### zoomIn

Creates zoom-in animation effect.

```jsx
import { zoomIn } from '../utils/motion';

<motion.div variants={zoomIn(0.3, 1.0)}>
  <div>Zooming Content</div>
</motion.div>
```

**Parameters:**
- `delay` (number): Animation delay in seconds
- `duration` (number): Animation duration in seconds

**Returns:** Framer Motion variants object

---

#### slideIn

Creates slide-in animation from specified direction.

```jsx
import { slideIn } from '../utils/motion';

<motion.div variants={slideIn("left", "tween", 0.2, 1.0)}>
  <div>Sliding Content</div>
</motion.div>
```

**Parameters:**
- `direction` (string): Slide direction - "left", "right", "up", "down"
- `type` (string): Animation type
- `delay` (number): Animation delay in seconds
- `duration` (number): Animation duration in seconds

**Returns:** Framer Motion variants object

---

#### staggerContainer

Creates staggered animations for child elements.

```jsx
import { staggerContainer } from '../utils/motion';

<motion.div variants={staggerContainer(0.1, 0.2)}>
  <motion.div variants={fadeIn("up", "spring", 0, 1)}>Child 1</motion.div>
  <motion.div variants={fadeIn("up", "spring", 0, 1)}>Child 2</motion.div>
</motion.div>
```

**Parameters:**
- `staggerChildren` (number): Delay between child animations
- `delayChildren` (number): Initial delay for all children

**Returns:** Framer Motion variants object

## Higher-Order Components

### SectionWrapper

HOC that wraps components with consistent section styling and animations.

```jsx
import { SectionWrapper } from '../hoc';

const MyComponent = () => <div>Content</div>;
export default SectionWrapper(MyComponent, "my-section");
```

#### Parameters
- `Component` (React.Component): Component to wrap
- `idName` (string): Section ID for navigation

#### Features
- Consistent padding and max-width
- Automatic scroll-triggered animations
- Section ID assignment for navigation
- Responsive spacing

## Data Configuration

### Navigation Links (`navLinks`)

Array of navigation menu items.

```javascript
const navLinks = [
  { id: "hero", title: "Hero" },
  { id: "portfolio", title: "Portfolio" },
  { id: "experience", title: "Experience" },
  { id: "contact", title: "Contact" }
];
```

#### Structure
| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Section identifier for navigation |
| `title` | string | Display text for navigation link |

---

### Experiences Data (`experiences`)

Array of professional experience entries.

```javascript
const experiences = [
  {
    title: "Job Title",
    company_name: "Company Name", 
    date: "2020 - Present",
    details: ["Achievement 1", "Achievement 2"]
  }
];
```

#### Structure
| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Job position title |
| `company_name` | string | Company or organization name |
| `date` | string | Employment period |
| `details` | string[] | Array of achievements/responsibilities (supports HTML) |

---

### Portfolio Data (`portfolio`)

Array of portfolio project entries.

```javascript
const portfolio = [
  {
    name: "Project Name",
    description: "Project description...",
    image: "path/to/image.png"
  }
];
```

#### Structure
| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Project title |
| `description` | string | Project description |
| `image` | string | Project image path |

## Styling System

### Style Constants (`src/styles.js`)

Centralized styling constants using Tailwind CSS.

```javascript
const styles = {
  sectionText: "text-white font-bold md:text-[80px] sm:text-[50px] text-[40px]"
};
```

#### Available Styles
- `sectionText`: Large section heading styles with responsive typography

## Usage Examples

### Basic Component Setup

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

### Custom Animation Usage

```jsx
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from './utils/motion';

const AnimatedComponent = () => {
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.h1 variants={textVariant(0.1)}>
        Animated Heading
      </motion.h1>
      
      <motion.p variants={fadeIn("up", "spring", 0.3, 1.0)}>
        Animated paragraph content
      </motion.p>
    </motion.section>
  );
};
```

### 3D Canvas Integration

```jsx
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { CanvasLoader } from './components';

const Custom3DScene = () => {
  return (
    <Canvas camera={{ near: 0.1, far: 1000 }}>
      <Suspense fallback={<CanvasLoader />}>
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.5} />
        {/* Your 3D content */}
      </Suspense>
    </Canvas>
  );
};
```

### Creating New Sections

```jsx
import { SectionWrapper } from './hoc';
import { motion } from 'framer-motion';
import { textVariant } from './utils/motion';
import { styles } from './styles';

const NewSection = () => {
  return (
    <div className="text-center">
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionText}>New Section</h2>
      </motion.div>
      
      <div className="mt-10">
        {/* Section content */}
      </div>
    </div>
  );
};

export default SectionWrapper(NewSection, "new-section");
```

## Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 3dfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Environment Setup

The project uses Vite as the build tool with the following configuration:

- **Hot Module Replacement (HMR)** for fast development
- **React plugin** for JSX support
- **PostCSS** for Tailwind CSS processing
- **Three.js** for 3D graphics rendering

### Customization

To customize the portfolio:

1. **Update personal data** in `src/data/index.js`
2. **Replace 3D model** in `src/assets/3d/spaceman.glb`
3. **Modify styling** in `src/styles.js` and Tailwind classes
4. **Add new sections** using the SectionWrapper HOC pattern
5. **Configure contact form** endpoint in Contact component

### Performance Considerations

- 3D models are loaded asynchronously with loading states
- Images should be optimized for web delivery
- Animations use transform and opacity for better performance
- Intersection Observer reduces unnecessary animations
- Code splitting is handled automatically by Vite

### Browser Support

- Modern browsers with WebGL support required for 3D features
- ES6+ features used throughout
- Responsive design supports mobile and desktop viewports

---

## Contributing

When adding new components or features:

1. Follow the existing component structure and naming conventions
2. Use TypeScript prop definitions for better documentation
3. Implement responsive design patterns
4. Add appropriate animations using the motion utilities
5. Update this documentation for any new public APIs

For questions or support, refer to the individual component files and their inline documentation.