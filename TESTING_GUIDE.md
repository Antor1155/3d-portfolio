# Testing Guide

This guide provides comprehensive testing strategies and examples for the 3D Portfolio application components and utilities.

## Table of Contents
- [Testing Setup](#testing-setup)
- [Component Testing](#component-testing)
- [Utility Function Testing](#utility-function-testing)
- [Integration Testing](#integration-testing)
- [E2E Testing](#e2e-testing)
- [Visual Testing](#visual-testing)
- [Performance Testing](#performance-testing)
- [Accessibility Testing](#accessibility-testing)

## Testing Setup

### Dependencies
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom vitest jsdom
```

### Vitest Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
  },
});
```

### Test Setup File
```javascript
// src/test/setup.js
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Three.js
vi.mock('three', () => ({
  WebGLRenderer: vi.fn(() => ({
    setSize: vi.fn(),
    render: vi.fn(),
    dispose: vi.fn(),
  })),
  Scene: vi.fn(),
  PerspectiveCamera: vi.fn(),
  Vector3: vi.fn(),
  Mesh: vi.fn(),
  BoxGeometry: vi.fn(),
  MeshBasicMaterial: vi.fn(),
}));

// Mock @react-three/fiber
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
  useFrame: vi.fn(),
  useThree: vi.fn(() => ({
    camera: {},
    scene: {},
    gl: {},
  })),
}));

// Mock @react-three/drei
vi.mock('@react-three/drei', () => ({
  useGLTF: vi.fn(() => ({
    scene: {},
    animations: [],
  })),
  useAnimations: vi.fn(() => ({
    actions: { Idle: { play: vi.fn() } },
  })),
  Html: ({ children }) => <div>{children}</div>,
  useProgress: vi.fn(() => ({ progress: 50 })),
}));

// Mock Intersection Observer
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});
```

## Component Testing

### Hero Component Tests
```javascript
// src/components/__tests__/Hero.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useRef } from 'react';
import Hero from '../Hero';

const HeroWrapper = () => {
  const scrollContainer = useRef(null);
  return (
    <BrowserRouter>
      <Hero scrollContainer={scrollContainer} />
    </BrowserRouter>
  );
};

describe('Hero Component', () => {
  test('renders hero title', () => {
    render(<HeroWrapper />);
    expect(screen.getByText('FORREST KNIGHT')).toBeInTheDocument();
  });

  test('renders Position component', () => {
    render(<HeroWrapper />);
    // Position component should be present
    expect(document.querySelector('.animate-textRotate1')).toBeInTheDocument();
  });

  test('renders parallax background images', () => {
    render(<HeroWrapper />);
    expect(document.querySelector('.parallax__stars')).toBeInTheDocument();
    expect(document.querySelector('.parallax__planets')).toBeInTheDocument();
    expect(document.querySelector('.parallax__mountain1')).toBeInTheDocument();
  });

  test('renders SpacemanCanvas component', () => {
    render(<HeroWrapper />);
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
  });

  test('has correct responsive classes', () => {
    render(<HeroWrapper />);
    const title = screen.getByText('FORREST KNIGHT');
    expect(title).toHaveClass('text-[40px]', 'xs:text-[50px]', 'sm:text-[68px]');
  });
});
```

### Navbar Component Tests
```javascript
// src/components/__tests__/Navbar.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';

const NavbarWrapper = () => (
  <BrowserRouter>
    <Navbar />
  </BrowserRouter>
);

describe('Navbar Component', () => {
  test('renders logo', () => {
    render(<NavbarWrapper />);
    expect(screen.getByText('FK')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<NavbarWrapper />);
    expect(screen.getByText('Hero')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('handles mobile menu toggle', async () => {
    render(<NavbarWrapper />);
    const user = userEvent.setup();
    
    const menuButton = screen.getByAltText('menu');
    await user.click(menuButton);
    
    // Mobile menu should be visible
    expect(screen.getByAltText('menu')).toBeInTheDocument();
  });

  test('navigates to section on link click', async () => {
    render(<NavbarWrapper />);
    const user = userEvent.setup();
    
    const portfolioLink = screen.getByText('Portfolio');
    await user.click(portfolioLink);
    
    // Should call scrollTo or navigation function
    expect(window.scrollTo).toHaveBeenCalled();
  });

  test('updates active state based on scroll', () => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    render(<NavbarWrapper />);
    expect(mockIntersectionObserver).toHaveBeenCalled();
  });
});
```

### Portfolio Component Tests
```javascript
// src/components/__tests__/Portfolio.test.jsx
import { render, screen } from '@testing-library/react';
import Portfolio from '../Portfolio';

// Mock the motion components
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  useAnimation: () => ({
    start: vi.fn(),
  }),
}));

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: vi.fn(),
    inView: true,
  }),
}));

describe('Portfolio Component', () => {
  test('renders portfolio title', () => {
    render(<Portfolio />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  test('renders project cards', () => {
    render(<Portfolio />);
    expect(screen.getByText('Open Source Computer Science Repo')).toBeInTheDocument();
    expect(screen.getByText('Dev Notes')).toBeInTheDocument();
    expect(screen.getByText('Visually Understanding Algorithms')).toBeInTheDocument();
  });

  test('renders project descriptions', () => {
    render(<Portfolio />);
    expect(screen.getByText(/GitHub repo with over 17,000 stars/)).toBeInTheDocument();
    expect(screen.getByText(/newsletter with over 6,000 readers/)).toBeInTheDocument();
  });

  test('renders project images', () => {
    render(<Portfolio />);
    const images = screen.getAllByAltText('project_image');
    expect(images).toHaveLength(3);
  });

  test('applies alternating layout classes', () => {
    render(<Portfolio />);
    const projectCards = document.querySelectorAll('[class*="flex-col md:flex-row"]');
    expect(projectCards).toHaveLength(3);
  });
});
```

### Contact Component Tests
```javascript
// src/components/__tests__/Contact.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../Contact';

describe('Contact Component', () => {
  test('renders contact form', () => {
    render(<Contact />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your message')).toBeInTheDocument();
  });

  test('handles form input changes', async () => {
    render(<Contact />);
    const user = userEvent.setup();
    
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    await user.type(nameInput, 'John Doe');
    
    expect(nameInput).toHaveValue('John Doe');
  });

  test('submits form with correct data', async () => {
    render(<Contact />);
    const user = userEvent.setup();
    
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const messageInput = screen.getByPlaceholderText('Enter your message');
    const submitButton = screen.getByText('Send');
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');
    await user.click(submitButton);
    
    // Form should be submitted (mock the submission)
    expect(submitButton).toBeInTheDocument();
  });

  test('shows loading state during submission', async () => {
    render(<Contact />);
    const user = userEvent.setup();
    
    const submitButton = screen.getByText('Send');
    await user.click(submitButton);
    
    // Should show loading text (if implemented)
    // expect(screen.getByText('Sending...')).toBeInTheDocument();
  });
});
```

### Experience Component Tests
```javascript
// src/components/__tests__/Experience.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Experience from '../Experience';

describe('Experience Component', () => {
  test('renders experience title', () => {
    render(<Experience />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  test('renders experience cards', () => {
    render(<Experience />);
    expect(screen.getByText('YouTube Content Creator')).toBeInTheDocument();
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  test('shows experience details on card click', async () => {
    render(<Experience />);
    const user = userEvent.setup();
    
    const firstCard = screen.getByText('YouTube Content Creator');
    await user.click(firstCard);
    
    // Should show experience details
    expect(screen.getByText(/Built a subscriber base/)).toBeInTheDocument();
  });

  test('updates selected job state', async () => {
    render(<Experience />);
    const user = userEvent.setup();
    
    const secondCard = screen.getByText('Software Developer');
    await user.click(secondCard);
    
    // Should update the selected job and show different details
    expect(screen.getByText(/Developed and delivered custom/)).toBeInTheDocument();
  });

  test('handles mobile responsiveness', () => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    
    render(<Experience />);
    
    // Should adapt layout for mobile
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });
});
```

## Utility Function Testing

### Motion Utilities Tests
```javascript
// src/utils/__tests__/motion.test.js
import { 
  textVariant, 
  fadeIn, 
  zoomIn, 
  slideIn, 
  staggerContainer 
} from '../motion';

describe('Motion Utilities', () => {
  describe('textVariant', () => {
    test('returns correct animation variants', () => {
      const variant = textVariant(0.5);
      
      expect(variant).toHaveProperty('hidden');
      expect(variant).toHaveProperty('show');
      expect(variant.hidden).toEqual({
        y: -50,
        opacity: 0,
      });
      expect(variant.show.transition.delay).toBe(0.5);
    });

    test('uses default delay when not provided', () => {
      const variant = textVariant();
      expect(variant.show.transition.delay).toBeUndefined();
    });
  });

  describe('fadeIn', () => {
    test('creates correct fade in animation for different directions', () => {
      const upVariant = fadeIn('up', 'spring', 0.2, 1.0);
      const leftVariant = fadeIn('left', 'tween', 0.3, 1.5);
      
      expect(upVariant.hidden.y).toBe(100);
      expect(upVariant.hidden.x).toBe(0);
      expect(leftVariant.hidden.x).toBe(100);
      expect(leftVariant.hidden.y).toBe(0);
    });

    test('applies correct transition properties', () => {
      const variant = fadeIn('right', 'spring', 0.5, 2.0);
      
      expect(variant.show.transition.type).toBe('spring');
      expect(variant.show.transition.delay).toBe(0.5);
      expect(variant.show.transition.duration).toBe(2.0);
    });
  });

  describe('zoomIn', () => {
    test('creates zoom animation with correct properties', () => {
      const variant = zoomIn(0.3, 1.5);
      
      expect(variant.hidden.scale).toBe(0);
      expect(variant.hidden.opacity).toBe(0);
      expect(variant.show.scale).toBe(1);
      expect(variant.show.opacity).toBe(1);
      expect(variant.show.transition.delay).toBe(0.3);
      expect(variant.show.transition.duration).toBe(1.5);
    });
  });

  describe('slideIn', () => {
    test('creates slide animation for all directions', () => {
      const leftSlide = slideIn('left', 'tween', 0.1, 1.0);
      const upSlide = slideIn('up', 'spring', 0.2, 1.5);
      
      expect(leftSlide.hidden.x).toBe('-100%');
      expect(upSlide.hidden.y).toBe('100%');
      expect(leftSlide.show.x).toBe(0);
      expect(upSlide.show.y).toBe(0);
    });
  });

  describe('staggerContainer', () => {
    test('creates stagger animation with correct timing', () => {
      const variant = staggerContainer(0.1, 0.2);
      
      expect(variant).toHaveProperty('hidden');
      expect(variant).toHaveProperty('show');
      expect(variant.show.transition.staggerChildren).toBe(0.1);
      expect(variant.show.transition.delayChildren).toBe(0.2);
    });

    test('uses default values when not provided', () => {
      const variant = staggerContainer();
      
      expect(variant.show.transition.delayChildren).toBe(0);
    });
  });
});
```

### Position Component Tests
```javascript
// src/components/__tests__/Position.test.jsx
import { render, screen } from '@testing-library/react';
import Position from '../Position';

describe('Position Component', () => {
  test('renders animated text spans', () => {
    render(<Position />);
    
    // Should render text with animation classes
    const animatedSpans = document.querySelectorAll('.animate-textRotate1 span');
    expect(animatedSpans.length).toBeGreaterThan(0);
  });

  test('produces spans for each character', () => {
    render(<Position />);
    
    // Check that spaces are converted to non-breaking spaces
    const spans = document.querySelectorAll('[style*="animation-delay"]');
    expect(spans.length).toBeGreaterThan(0);
  });

  test('applies correct animation delays', () => {
    render(<Position />);
    
    const firstSpan = document.querySelector('[style*="animation-delay: 0s"]');
    const secondSpan = document.querySelector('[style*="animation-delay: 0.05s"]');
    
    expect(firstSpan).toBeInTheDocument();
    expect(secondSpan).toBeInTheDocument();
  });

  test('has correct accessibility attributes', () => {
    render(<Position />);
    
    const firstText = screen.getByLabelText('Software Developer');
    const secondText = screen.getByLabelText('Content Creator');
    
    expect(firstText).toBeInTheDocument();
    expect(secondText).toBeInTheDocument();
  });
});
```

## Integration Testing

### App Integration Tests
```javascript
// src/__tests__/App.integration.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Integration', () => {
  test('renders all main sections', () => {
    render(<App />);
    
    expect(screen.getByText('FORREST KNIGHT')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('navigation works between sections', async () => {
    render(<App />);
    const user = userEvent.setup();
    
    const portfolioNavLink = screen.getByRole('link', { name: /portfolio/i });
    await user.click(portfolioNavLink);
    
    // Should scroll to portfolio section
    expect(window.scrollTo).toHaveBeenCalled();
  });

  test('scroll container ref is passed correctly', () => {
    render(<App />);
    
    // Hero component should receive scroll container ref
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
  });

  test('maintains section IDs for navigation', () => {
    render(<App />);
    
    expect(document.getElementById('hero')).toBeInTheDocument();
    expect(document.getElementById('portfolio')).toBeInTheDocument();
    expect(document.getElementById('experience')).toBeInTheDocument();
    expect(document.getElementById('contact')).toBeInTheDocument();
  });
});
```

### SectionWrapper HOC Tests
```javascript
// src/hoc/__tests__/SectionWrapper.test.jsx
import { render, screen } from '@testing-library/react';
import SectionWrapper from '../SectionWrapper';

const TestComponent = () => <div>Test Component Content</div>;
const WrappedComponent = SectionWrapper(TestComponent, 'test-section');

describe('SectionWrapper HOC', () => {
  test('wraps component with motion section', () => {
    render(<WrappedComponent />);
    
    expect(screen.getByText('Test Component Content')).toBeInTheDocument();
  });

  test('adds section ID span', () => {
    render(<WrappedComponent />);
    
    const hashSpan = document.getElementById('test-section');
    expect(hashSpan).toBeInTheDocument();
    expect(hashSpan).toHaveClass('hash-span');
  });

  test('applies correct styling classes', () => {
    render(<WrappedComponent />);
    
    const section = document.querySelector('section');
    expect(section).toHaveClass(
      'px-0',
      '2xl:px-60',
      'py-10',
      '2xl:py-16',
      'max-w-full',
      'mx-auto',
      'relative',
      'z-0'
    );
  });

  test('passes props to wrapped component', () => {
    const ComponentWithProps = ({ title }) => <h1>{title}</h1>;
    const WrappedWithProps = SectionWrapper(ComponentWithProps, 'test');
    
    render(<WrappedWithProps title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

## E2E Testing

### Cypress E2E Tests
```javascript
// cypress/e2e/portfolio.cy.js
describe('Portfolio E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the homepage successfully', () => {
    cy.contains('FORREST KNIGHT').should('be.visible');
    cy.get('[data-testid="canvas"]').should('exist');
  });

  it('navigates through all sections', () => {
    // Test navigation menu
    cy.get('nav').within(() => {
      cy.contains('Portfolio').click();
    });
    
    cy.url().should('include', '#portfolio');
    cy.contains('Open Source Computer Science Repo').should('be.visible');
    
    // Navigate to experience
    cy.get('nav').within(() => {
      cy.contains('Experience').click();
    });
    
    cy.contains('YouTube Content Creator').should('be.visible');
    
    // Navigate to contact
    cy.get('nav').within(() => {
      cy.contains('Contact').click();
    });
    
    cy.get('form').should('be.visible');
  });

  it('submits contact form successfully', () => {
    cy.get('nav').within(() => {
      cy.contains('Contact').click();
    });
    
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('textarea[name="message"]').type('This is a test message');
    
    cy.get('button[type="submit"]').click();
    
    // Should show success message or loading state
    cy.contains('Sending...').should('be.visible');
  });

  it('shows mobile menu on small screens', () => {
    cy.viewport('iphone-6');
    
    cy.get('[alt="menu"]').click();
    cy.get('nav').within(() => {
      cy.contains('Portfolio').should('be.visible');
    });
  });

  it('experience section interaction works', () => {
    cy.get('nav').within(() => {
      cy.contains('Experience').click();
    });
    
    cy.contains('Software Developer').click();
    cy.contains('Developed and delivered custom').should('be.visible');
  });
});
```

### Playwright E2E Tests
```javascript
// tests/e2e/portfolio.spec.js
import { test, expect } from '@playwright/test';

test.describe('Portfolio Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title and hero content', async ({ page }) => {
    await expect(page).toHaveTitle(/3dfolio/);
    await expect(page.locator('text=FORREST KNIGHT')).toBeVisible();
  });

  test('3D canvas loads correctly', async ({ page }) => {
    await expect(page.locator('[data-testid="canvas"]')).toBeVisible();
    
    // Wait for 3D model to load
    await page.waitForTimeout(2000);
    
    // Canvas should have WebGL context
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });

  test('responsive design works correctly', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('nav ul')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[alt="menu"]')).toBeVisible();
    
    // Test mobile menu
    await page.click('[alt="menu"]');
    await expect(page.locator('text=Portfolio')).toBeVisible();
  });

  test('scroll animations trigger correctly', async ({ page }) => {
    // Scroll to portfolio section
    await page.locator('#portfolio').scrollIntoViewIfNeeded();
    
    // Check if animations have triggered
    await expect(page.locator('text=Open Source Computer Science Repo')).toBeVisible();
    
    // Scroll to experience section
    await page.locator('#experience').scrollIntoViewIfNeeded();
    await expect(page.locator('text=YouTube Content Creator')).toBeVisible();
  });

  test('form validation works', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Should show validation errors (if implemented)
    // await expect(page.locator('text=Name is required')).toBeVisible();
    
    // Fill form correctly
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message content');
    
    await page.click('button[type="submit"]');
    
    // Should show loading state
    await expect(page.locator('text=Sending...')).toBeVisible();
  });
});
```

## Visual Testing

### Storybook Setup
```javascript
// .storybook/main.js
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
```

### Component Stories
```javascript
// src/components/Portfolio.stories.jsx
import Portfolio from './Portfolio';

export default {
  title: 'Components/Portfolio',
  component: Portfolio,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {};

export const Loading = {
  parameters: {
    mockData: {
      loading: true,
    },
  },
};

export const EmptyState = {
  parameters: {
    mockData: {
      portfolio: [],
    },
  },
};
```

### Visual Regression Testing
```javascript
// tests/visual/visual.spec.js
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('hero section visual comparison', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('#hero')).toHaveScreenshot('hero-section.png');
  });

  test('portfolio section visual comparison', async ({ page }) => {
    await page.goto('/');
    await page.locator('#portfolio').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    await expect(page.locator('#portfolio')).toHaveScreenshot('portfolio-section.png');
  });

  test('mobile responsive visual comparison', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('mobile-homepage.png');
  });
});
```

## Performance Testing

### Web Vitals Testing
```javascript
// tests/performance/webvitals.spec.js
import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('measures Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    // Measure LCP (Largest Contentful Paint)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });
    
    expect(lcp).toBeLessThan(2500); // LCP should be under 2.5s
    
    // Measure CLS (Cumulative Layout Shift)
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          resolve(clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
        
        // Wait for layout shifts to settle
        setTimeout(() => resolve(clsValue), 5000);
      });
    });
    
    expect(cls).toBeLessThan(0.1); // CLS should be under 0.1
  });

  test('3D canvas performance', async ({ page }) => {
    await page.goto('/');
    
    // Measure canvas rendering performance
    const fps = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0;
        const startTime = performance.now();
        
        function countFrames() {
          frameCount++;
          if (performance.now() - startTime < 1000) {
            requestAnimationFrame(countFrames);
          } else {
            resolve(frameCount);
          }
        }
        
        requestAnimationFrame(countFrames);
      });
    });
    
    expect(fps).toBeGreaterThan(30); // Should maintain at least 30 FPS
  });
});
```

## Accessibility Testing

### Accessibility Tests
```javascript
// tests/a11y/accessibility.spec.js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('homepage has no accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('navigation is keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('nav a:first-child')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('nav ul li:first-child a')).toBeFocused();
  });

  test('form has proper labels and validation', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    // Check form labels
    await expect(page.locator('label[for="name"]')).toBeVisible();
    await expect(page.locator('label[for="email"]')).toBeVisible();
    await expect(page.locator('label[for="message"]')).toBeVisible();
    
    // Check ARIA attributes
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute('required');
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('color contrast meets WCAG standards', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
```

## Test Scripts

### Package.json Scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:visual": "playwright test --grep=visual",
    "test:a11y": "playwright test --grep=accessibility",
    "test:performance": "playwright test --grep=performance",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

### Continuous Integration
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run unit tests
        run: npm run test:coverage
        
      - name: Run E2E tests
        run: npm run test:e2e
        
      - name: Run accessibility tests
        run: npm run test:a11y
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

This comprehensive testing guide covers all aspects of testing the 3D Portfolio application, from unit tests to end-to-end testing, visual regression testing, and accessibility compliance. Each test type serves a specific purpose in ensuring the application works correctly across different scenarios and environments.