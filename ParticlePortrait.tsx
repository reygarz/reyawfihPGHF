import React, { useRef, useEffect, useState } from 'react';

interface ParticlePortraitProps {
  animationState: 'assembling' | 'holding' | 'liquid' | 'dispersing';
  onAnimationComplete: () => void;
  reducedMotion: boolean;
}

// Mathematical approximation of a face
const generateFacePoints = (count: number, width: number, height: number) => {
  const points = [];
  const cx = width / 2;
  const cy = height / 2;
  const scale = Math.min(width, height) * 0.35;

  for (let i = 0; i < count; i++) {
    let x, y, z;
    const r = Math.random();
    
    // Distribution: 60% face oval, 15% eyes, 10% nose, 15% mouth
    if (r < 0.6) {
        // Face Oval (parametric)
        const theta = Math.random() * Math.PI * 2;
        // Adding some noise to fill the face, not just outline
        const fillFactor = Math.sqrt(Math.random()); 
        x = cx + Math.cos(theta) * scale * 0.85 * fillFactor;
        y = cy + Math.sin(theta) * scale * 1.1 * fillFactor;
        z = 0; // Depth
    } else if (r < 0.75) {
        // Eyes
        const isLeft = Math.random() > 0.5;
        const eyeOffsetX = isLeft ? -scale * 0.35 : scale * 0.35;
        const eyeOffsetY = -scale * 0.1;
        const theta = Math.random() * Math.PI * 2;
        const eyeRad = scale * 0.1 * Math.sqrt(Math.random());
        x = cx + eyeOffsetX + Math.cos(theta) * eyeRad;
        y = cy + eyeOffsetY + Math.sin(theta) * eyeRad * 0.6; // Flattened y for eye shape
        z = 10;
    } else if (r < 0.85) {
        // Nose
        const noseH = scale * 0.4 * Math.random();
        const noseW = scale * 0.1 * (Math.random() - 0.5);
        x = cx + noseW + (Math.random() - 0.5) * 5;
        y = cy - scale * 0.1 + noseH;
        z = 20;
    } else {
        // Mouth
        const mouthW = scale * 0.4;
        const t = Math.random() * Math.PI; // Top arch
        const mx = (Math.random() - 0.5) * mouthW;
        // Quadratic curve approximation
        const my = scale * 0.5 + (mx*mx)/(mouthW) * 0.5; 
        x = cx + mx;
        y = cy + my;
        z = 5;
    }
    
    points.push({
      tx: x, // Target X
      ty: y, // Target Y
      x: Math.random() * width, // Current X
      y: Math.random() * height, // Current Y
      vx: 0,
      vy: 0,
      z: z,
      color: `rgba(${200 + Math.random() * 55}, ${230 + Math.random() * 25}, 255, ${0.3 + Math.random() * 0.5})`
    });
  }
  return points;
};

const ParticlePortrait: React.FC<ParticlePortraitProps> = ({ animationState, onAnimationComplete, reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const requestRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        // Regenerate points on resize
        particlesRef.current = generateFacePoints(reducedMotion ? 800 : 2500, canvas.width, canvas.height);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Animation Logic based on State
      particles.forEach(p => {
        let dx = 0;
        let dy = 0;
        let speed = 0.05;

        if (animationState === 'assembling') {
          dx = p.tx - p.x;
          dy = p.ty - p.y;
          speed = 0.04 + Math.random() * 0.02;
        } else if (animationState === 'holding' || animationState === 'liquid') {
          // Slight hover/jitter
          const time = Date.now() * 0.001;
          const hoverX = Math.sin(time + p.ty) * 2;
          const hoverY = Math.cos(time + p.tx) * 2;
          dx = (p.tx + hoverX) - p.x;
          dy = (p.ty + hoverY) - p.y;
          speed = 0.1;
        } else if (animationState === 'dispersing') {
            // Fly away from center
            const angle = Math.atan2(p.y - centerY, p.x - centerX);
            dx = Math.cos(angle) * 500;
            dy = Math.sin(angle) * 500;
            speed = 0.02;
        }

        // Mouse Interaction (Parallax/Repel)
        const mx = mouseRef.current.x - canvas.getBoundingClientRect().left;
        const my = mouseRef.current.y - canvas.getBoundingClientRect().top;
        const distMouse = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2);
        
        if (distMouse < 100 && (animationState === 'holding' || animationState === 'liquid')) {
            const angle = Math.atan2(p.y - my, p.x - mx);
            p.x += Math.cos(angle) * 2;
            p.y += Math.sin(angle) * 2;
        }

        p.vx = (p.vx * 0.9) + (dx * speed);
        p.vy = (p.vy * 0.9) + (dy * speed);
        
        p.x += p.vx * 0.05;
        p.y += p.vy * 0.05;

        // Draw
        ctx.fillStyle = p.color;
        
        // Liquid effect enhancement: larger, more transparent particles
        if (animationState === 'liquid') {
             ctx.beginPath();
             ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
             ctx.fill();
        } else {
             // Standard thin lines
             ctx.fillRect(p.x, p.y, 1.2, 1.2);
        }
      });

      // Check completion for state transitions
      // This is a simplified check; usually done via time in parent
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animationState, reducedMotion]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full transition-all duration-1000 ${animationState === 'liquid' ? 'blur-[2px] opacity-80' : 'opacity-100'}`}
    />
  );
};

export default ParticlePortrait;