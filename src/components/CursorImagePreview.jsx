import { useEffect, useRef, useState } from 'react';

/**
 * A floating image preview that follows the cursor when hovering over target elements.
 * Target elements should have:
 *   - `data-image` attribute with the image URL
 *   - `data-name` attribute (optional) for alt text
 * 
 * @param {Object} props
 * @param {string} props.targetSelector - CSS selector for elements that trigger the preview
 * @param {number} [props.width=360] - Preview width in pixels
 * @param {number} [props.height=240] - Preview height in pixels
 * @param {number} [props.offsetX=50] - Horizontal offset from cursor
 * @param {number} [props.offsetY=0] - Vertical offset (negative = above cursor)
 * @param {number} [props.smoothing=0.12] - Cursor following smoothing (0-1, lower = smoother)
 */
export default function CursorImagePreview({
  targetSelector,
  width = 360,
  height = 240,
  offsetX = 50,
  offsetY = 0,
  smoothing = 0.12,
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentAlt, setCurrentAlt] = useState('');
  
  const mousePos = useRef({ x: 0, y: 0 });
  const previewPos = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Move to body to avoid clipping
    document.body.appendChild(container);

    const targetElements = document.querySelectorAll(targetSelector);
    
    const animate = () => {
      if (isActive) {
        // Smooth interpolation
        previewPos.current.x += (mousePos.current.x - previewPos.current.x) * smoothing;
        previewPos.current.y += (mousePos.current.y - previewPos.current.y) * smoothing;

        // Calculate position
        let x = previewPos.current.x + offsetX;
        let y = previewPos.current.y - height + offsetY;

        // Viewport boundaries
        if (x + width > window.innerWidth - 10) {
          x = previewPos.current.x - width - 20;
        }
        if (y < 10) y = 10;
        if (y + height > window.innerHeight - 10) {
          y = window.innerHeight - height - 10;
        }

        container.style.left = `${x}px`;
        container.style.top = `${y}px`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = (e) => {
      const imageSrc = e.currentTarget.dataset.image;
      const name = e.currentTarget.dataset.name || '';
      if (imageSrc) {
        mousePos.current = { x: e.clientX, y: e.clientY };
        previewPos.current = { x: e.clientX, y: e.clientY };
        setCurrentImage(imageSrc);
        setCurrentAlt(name);
        setIsActive(true);
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    targetElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
      el.addEventListener('mousemove', handleMouseMove);
    });

    // Start animation loop
    animationRef.current = requestAnimationFrame(animate);

    // Initial position off-screen
    container.style.left = '-1000px';
    container.style.top = '-1000px';

    return () => {
      targetElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.removeEventListener('mousemove', handleMouseMove);
      });
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Move back before unmount
      if (container.parentNode === document.body) {
        document.body.removeChild(container);
      }
    };
  }, [targetSelector, width, height, offsetX, offsetY, smoothing, isActive]);

  return (
    <div
      ref={containerRef}
      className={`cursor-preview ${isActive ? 'active' : ''}`}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-3deg)',
        transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform, opacity',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        }}
      >
        <img
          ref={imageRef}
          src={currentImage}
          alt={currentAlt ? `Preview of ${currentAlt}` : 'Project preview'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(213, 169, 8, 0.2) 0%, transparent 50%, rgba(255, 95, 67, 0.1) 100%)',
            opacity: isActive ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}

