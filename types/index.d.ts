// TypeScript definitions for 3D Portfolio project

import { RefObject, ReactNode } from 'react';
import { Variants } from 'framer-motion';

// =============================================================================
// Data Types
// =============================================================================

export interface NavLink {
  id: string;
  title: string;
}

export interface Experience {
  title: string;
  company_name: string;
  date: string;
  details: string[];
  technologies?: string[];
  location?: string;
}

export interface PortfolioProject {
  name: string;
  description: string;
  image: string;
  technologies?: string[];
  github?: string;
  live?: string;
}

// =============================================================================
// Component Props
// =============================================================================

export interface HeroProps {
  scrollContainer: RefObject<HTMLDivElement>;
}

export interface NavbarProps {
  // No props - uses data from context
}

export interface PortfolioProps {
  // No props - uses data from data/index.js
}

export interface ProjectCardProps {
  index: number;
  name: string;
  description: string;
  image: string;
  technologies?: string[];
  github?: string;
  live?: string;
}

export interface ExperienceProps {
  // No props - uses data from data/index.js
}

export interface ExperienceCardProps {
  experience: Experience;
  onClick: () => void;
  isActive: boolean;
  isMobile: boolean;
}

export interface ExperienceDetailsProps {
  experience: Experience;
}

export interface ContactProps {
  // No props
}

export interface SpacemanCanvasProps {
  scrollContainer: RefObject<HTMLDivElement>;
}

export interface SpacemanProps {
  scale: [number, number, number];
  position: [number, number, number];
  rotationX?: number;
  rotationY?: number;
}

export interface PositionProps {
  // No props
}

export interface CanvasLoaderProps {
  // No props
}

// =============================================================================
// Higher-Order Component Types
// =============================================================================

export interface SectionWrapperProps {
  children: ReactNode;
}

export type SectionWrapper = <T extends React.ComponentType<any>>(
  Component: T,
  idName: string
) => React.ComponentType<React.ComponentProps<T>>;

// =============================================================================
// Utility Types
// =============================================================================

export type AnimationDirection = 'left' | 'right' | 'up' | 'down';
export type AnimationType = 'spring' | 'tween' | 'just' | 'keyframes';

export interface MotionVariants extends Variants {
  hidden: {
    [key: string]: any;
  };
  show: {
    [key: string]: any;
    transition?: {
      [key: string]: any;
    };
  };
}

// =============================================================================
// Motion Utility Function Types
// =============================================================================

export declare function textVariant(delay?: number): MotionVariants;

export declare function fadeIn(
  direction: AnimationDirection,
  type: AnimationType,
  delay: number,
  duration: number
): MotionVariants;

export declare function zoomIn(delay: number, duration: number): MotionVariants;

export declare function slideIn(
  direction: AnimationDirection,
  type: AnimationType,
  delay: number,
  duration: number
): MotionVariants;

export declare function staggerContainer(
  staggerChildren?: number,
  delayChildren?: number
): MotionVariants;

// =============================================================================
// Style Types
// =============================================================================

export interface Styles {
  sectionText: string;
  [key: string]: string;
}

// =============================================================================
// Form Types
// =============================================================================

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// =============================================================================
// Asset Types
// =============================================================================

export interface Assets {
  algorithms: string;
  close: string;
  devnotes: string;
  logo: string;
  menu: string;
  oscs: string;
}

// =============================================================================
// 3D Types
// =============================================================================

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface Rotation3D {
  x: number;
  y: number;
  z: number;
}

export interface Scale3D {
  x: number;
  y: number;
  z: number;
}

export interface LightConfig {
  position: [number, number, number];
  intensity: number;
  color?: string;
}

export interface CameraConfig {
  position?: [number, number, number];
  fov?: number;
  near?: number;
  far?: number;
}

// =============================================================================
// Animation State Types
// =============================================================================

export interface AnimationControls {
  start: (variant: string) => Promise<any>;
  stop: () => void;
  set: (variant: string) => void;
}

export interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// =============================================================================
// Responsive Types
// =============================================================================

export type BreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface ResponsiveConfig {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  currentBreakpoint: BreakpointSize;
}

// =============================================================================
// Configuration Types
// =============================================================================

export interface ProjectConfig {
  name: string;
  version: string;
  author: string;
  description: string;
  technologies: string[];
  features: string[];
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    [key: string]: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    [key: string]: string;
  };
  spacing: {
    [key: string]: string;
  };
}

// =============================================================================
// Event Handler Types
// =============================================================================

export type ScrollHandler = (event: Event) => void;
export type ResizeHandler = (event: UIEvent) => void;
export type ClickHandler = (event: React.MouseEvent) => void;
export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;

// =============================================================================
// API Response Types
// =============================================================================

export interface EmailServiceResponse {
  success: boolean;
  message: string;
  status: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

// =============================================================================
// Component State Types
// =============================================================================

export interface NavbarState {
  active: string;
  toggle: boolean;
  scrolled: boolean;
}

export interface ContactState {
  form: ContactFormData;
  loading: boolean;
  errors: FormErrors;
}

export interface ExperienceState {
  selectedJob: Experience;
  isMobile: boolean;
}

export interface SpacemanState {
  rotationX: number;
  rotationY: number;
  scale: [number, number, number];
  position: [number, number, number];
}

// =============================================================================
// Custom Hook Types
// =============================================================================

export interface UseScrollReturn {
  scrollY: number;
  scrollDirection: 'up' | 'down';
  isScrolling: boolean;
}

export interface UseResponsiveReturn extends ResponsiveConfig {
  windowSize: {
    width: number;
    height: number;
  };
}

export interface UseAnimationReturn {
  controls: AnimationControls;
  ref: RefObject<HTMLElement>;
  inView: boolean;
}

// =============================================================================
// Module Declarations
// =============================================================================

declare module '*.glb' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

// =============================================================================
// Global Type Extensions
// =============================================================================

declare global {
  interface Window {
    scrollTo: (x: number, y: number) => void;
    addEventListener: (event: string, handler: EventListener) => void;
    removeEventListener: (event: string, handler: EventListener) => void;
  }
}

// =============================================================================
// Utility Helper Types
// =============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// =============================================================================
// Performance Types
// =============================================================================

export interface PerformanceMetrics {
  fps: number;
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
}

export interface OptimizationConfig {
  enableLazyLoading: boolean;
  enableImageOptimization: boolean;
  enableCodeSplitting: boolean;
  enablePreloading: boolean;
}

// =============================================================================
// Accessibility Types
// =============================================================================

export interface A11yConfig {
  enableKeyboardNavigation: boolean;
  enableScreenReaderSupport: boolean;
  enableHighContrast: boolean;
  enableReducedMotion: boolean;
}

export type AriaRole = 'button' | 'link' | 'navigation' | 'main' | 'section' | 'article' | 'banner' | 'contentinfo';
export type AriaLabel = string;
export type AriaDescribedBy = string;

// =============================================================================
// Error Types
// =============================================================================

export interface AppError {
  message: string;
  code: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  context?: any;
}

export interface ValidationError extends AppError {
  field: string;
  value: any;
  rule: string;
}

// =============================================================================
// Export All Types
// =============================================================================

export * from './index';