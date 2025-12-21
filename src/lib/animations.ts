import { animate, inView, stagger } from 'motion';

/**
 * Initialize staggered fade-up animation for bento cards
 * Uses CSS animations with JS trigger for optimal performance
 */
export function initBentoAnimations(): void {
  const cards = document.querySelectorAll('.bento-card');
  
  if (cards.length === 0) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Just show the cards without animation
    cards.forEach((card) => {
      const el = card as HTMLElement;
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Trigger CSS animations by adding animate class
  // Small delay to ensure styles are loaded
  requestAnimationFrame(() => {
    cards.forEach((card) => {
      card.classList.add('animate');
    });
  });
}

/**
 * Initialize scroll-triggered animations
 */
export function initScrollAnimations(): void {
  const sections = document.querySelectorAll('[data-animate]');

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    sections.forEach((section) => {
      (section as HTMLElement).style.opacity = '1';
    });
    return;
  }

  sections.forEach((section) => {
    inView(section, () => {
      animate(
        section,
        { opacity: [0, 1], y: [30, 0] },
        { duration: 0.6, easing: 'ease-out' }
      );
    });
  });
}

/**
 * Initialize all animations
 */
export function initAnimations(): void {
  initBentoAnimations();
  initScrollAnimations();
}


