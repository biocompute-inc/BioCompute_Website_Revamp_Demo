/**
 * Responsive Configuration
 * Centralized responsive breakpoints and settings for the application
 */

// Screen breakpoints (in pixels)
export const SCREEN_SIZES = {
    xs: 475,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Video animation configuration for the homepage hero section
 * Controls scale and positioning for different screen sizes
 */
export const VIDEO_ANIMATION_CONFIG = {
    xs: {
        // Extra small devices (< 475px)
        section0: { scale: 2.5, top: '100%' },
        section1: { scale: 1.5, top: '65%' },
        section2: { scale: 1.5, top: '45%' },
        width: 180,
        height: 180,
    },
    sm: {
        // Small devices (475px - 640px)
        section0: { scale: 2.5, top: '100%' },
        section1: { scale: 1.8, top: '70%' },
        section2: { scale: 1.3, top: '45%' },
        width: 220,
        height: 220,
    },
    md: {
        // Medium devices (640px - 768px)
        section0: { scale: 2.3, top: '105%' },
        section1: { scale: 1, top: '75%' },
        section2: { scale: 1, top: '45%' },
        width: 280,
        height: 280,
    },
    lg: {
        // Large devices (768px - 1024px)
        section0: { scale: 2, top: '110%' },
        section1: { scale: 1, top: '75%' },
        section2: { scale: 1, top: '48%' },
        width: 320,
        height: 320,
    },
    xl: {
        // Extra large devices (1024px+)
        section0: { scale: 1.5, top: '105%' },
        section1: { scale: 1, top: '72%' },
        section2: { scale: 1, top: '48%' },
        width: 400,
        height: 400,
    },
    '2xl': {
        // 2xl devices (1536px+)
        section0: { scale: 1.5, top: '110%' },
        section1: { scale: 0.8, top: '70%' },
        section2: { scale: 0.9, top: '50%' },
        width: 450,
        height: 450,
    },
} as const;

/**
 * Text animation configuration for homepage
 */
export const TEXT_ANIMATION_CONFIG = {
    xs: {
        titleScale: { section0: 1.8, section1: 1.3 },
        dnaScale: { section0: 2.5, section1: 2.0 },
        titleY: { section0: -20, section1: 0 },
        dnaY: { section0: 0, section1: 0 },
        containerTop: { section0: '0%', section1: '-30%' },
    },
    sm: {
        titleScale: { section0: 2.5, section1: 2.0 },
        dnaScale: { section0: 3.0, section1: 2.5 },
        titleY: { section0: -25, section1: 15 },
        dnaY: { section0: 10, section1: 40 },
        containerTop: { section0: '0%', section1: '-40%' },
    },
    md: {
        titleScale: { section0: 2.5, section1: 2 },
        dnaScale: { section0: 2.7, section1: 2.5 },
        titleY: { section0: -30, section1: 20 },
        dnaY: { section0: 30, section1: 55 },
        containerTop: { section0: '0%', section1: '-30%' },
    },
    lg: {
        titleScale: { section0: 2.5, section1: 2 },
        dnaScale: { section0: 2, section1: 2.5 },
        titleY: { section0: -30, section1: -10 },
        dnaY: { section0: 25, section1: 30 },
        containerTop: { section0: '0%', section1: '-30%' },
    },
    xl: {
        titleScale: { section0: 1.6, section1: 1.3 },
        dnaScale: { section0: 1.4, section1: 1.5 },
        titleY: { section0: -30, section1: 20 },
        dnaY: { section0: 0, section1: 40 },
        containerTop: { section0: '0%', section1: '-40%' },
    },
    '2xl': {
        titleScale: { section0: 2, section1: 1.4 },
        dnaScale: { section0: 1.5, section1: 1.2 },
        titleY: { section0: -30, section1: 40 },
        dnaY: { section0: 40, section1: 60 },
        containerTop: { section0: '0%', section1: '-45%' },
    },
} as const;

/**
 * Floating label positions for section 2 on homepage
 */
export const FLOATING_LABELS_CONFIG = {
    xs: {
        secure: { top: '25%', left: '5%' },
        ultraDense: { top: '45%', right: '0%' },
        longLasting: { top: '60%', left: '5%' },
    },
    sm: {
        secure: { top: '32%', left: '12%' },
        ultraDense: { top: '45%', right: '12%' },
        longLasting: { top: '58%', left: '12%' },
    },
    md: {
        secure: { top: '33%', left: '10%' },
        ultraDense: { top: '45%', right: '10%' },
        longLasting: { top: '57%', left: '10%' },
    },
    lg: {
        secure: { top: '30%', left: '15%' },
        ultraDense: { top: '45%', right: '15%' },
        longLasting: { top: '60%', left: '15%' },
    },
    xl: {
        secure: { top: '30%', left: '15%' },
        ultraDense: { top: '45%', right: '15%' },
        longLasting: { top: '60%', left: '15%' },
    },
    '2xl': {
        secure: { top: '30%', left: '20%' },
        ultraDense: { top: '45%', right: '20%' },
        longLasting: { top: '60%', left: '20%' },
    },
} as const;

/**
 * Header configuration
 */
export const HEADER_CONFIG = {
    height: {
        mobile: 64,
        desktop: 80,
    },
    padding: {
        xs: { horizontal: 16, vertical: 8 },
        sm: { horizontal: 24, vertical: 12 },
        md: { horizontal: 32, vertical: 16 },
        lg: { horizontal: 64, vertical: 16 },
        xl: { horizontal: 112, vertical: 20 },
    },
    borderRadius: {
        mobile: 24,
        desktop: 100,
    },
} as const;

/**
 * Utility function to get current screen size
 */
export function getScreenSize(width: number): ScreenSize {
    if (width < SCREEN_SIZES.xs) return 'xs';
    if (width < SCREEN_SIZES.sm) return 'sm';
    if (width < SCREEN_SIZES.md) return 'md';
    if (width < SCREEN_SIZES.lg) return 'lg';
    if (width < SCREEN_SIZES.xl) return 'xl';
    return '2xl';
}

/**
 * Hook utility to track screen size changes
 */
export function useScreenSize(): ScreenSize {
    if (typeof window === 'undefined') return 'xl';

    const [size, setSize] = useState<ScreenSize>(() =>
        getScreenSize(window.innerWidth)
    );

    useEffect(() => {
        const handleResize = () => {
            setSize(getScreenSize(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}

// React imports for the hook
import { useState, useEffect } from 'react';
