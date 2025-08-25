import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import projectsJson from '../../data/projects.json';
import { ReducedMotionProvider } from '../../providers/ReducedMotionProvider';

// Poster resolver
function resolvePoster(p: any): string | undefined {
  const cand = p.posterSrc || p.image || p.thumbnail || (p.media && p.media[0]?.src);
  return (typeof cand === 'string' && cand.trim()) ? cand : '/Assts/Ravie Logos/Vector.png';
}

const PAGE_SIZE = 9;

export default function WorkGrid3x3Counter() {
  const projects: any[] = useMemo(() => (Array.isArray(projectsJson) ? projectsJson : []), []);
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  
  // Get scroll progress - no target means it tracks window scroll
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });
  
  // Create transforms for each column (3 columns)
  // Column 1: moves up, Column 2: moves down, Column 3: moves up
  // Increased movement range for more dramatic effect
  const column1Y = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const column2Y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const column3Y = useTransform(scrollYProgress, [0, 1], [0, -400]);
  
  // Debug log
  useEffect(() => {
    console.log('[WorkGrid3x3Counter] Mounted with', projects.length, 'projects');
  }, [projects.length]);
  
  // Monitor scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      console.log('[WorkGrid3x3Counter] Scroll progress:', latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  const visible = useMemo(() => projects.slice(0, page * PAGE_SIZE), [projects, page]);
  
  // Distribute projects into 3 columns
  const columns = useMemo(() => {
    const cols: any[][] = [[], [], []];
    visible.forEach((project, index) => {
      cols[index % 3].push(project);
    });
    return cols;
  }, [visible]);
  
  // IntersectionObserver for auto-append
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { root: null, rootMargin: '1500px 0px 1500px 0px', threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  
  // Near-bottom fallback
  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 600;
      if (nearBottom) setPage((p) => p + 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  // Unlock scroll
  useEffect(() => {
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = '';
    document.body.style.overflow = '';
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);
  
  const columnTransforms = [column1Y, column2Y, column3Y];
  
  return (
    <ReducedMotionProvider>
      <section 
        ref={containerRef}
        className="work-3x3-counter px-4 sm:px-6 lg:px-10 py-8" 
        style={{ overflow: 'visible' }}
      >
        <h1 className="text-2xl sm:text-3xl font-medium mb-6">Work</h1>
        
        {/* 3 columns with counter-scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
          {columns.map((columnProjects, colIndex) => (
            <motion.div
              key={`col-${colIndex}`}
              style={{ y: columnTransforms[colIndex] }}
              className="space-y-10 sm:space-y-12 lg:space-y-16"
            >
              {columnProjects.map((p: any, i: number) => {
                const poster = resolvePoster(p);
                const title = p.title || p.client || 'Project';
                const to = p.slug ? `/the-work/${p.slug}` : undefined;
                const globalIndex = colIndex + i * 3;
                
                const card = (
                  <div className="project-card rounded-xl overflow-hidden bg-black/40 border border-white/10">
                    <div
                      className="media"
                      style={{
                        aspectRatio: '16 / 9',
                        width: '105%',
                        marginLeft: '-2.5%',
                      }}
                    >
                      {poster ? (
                        <img
                          src={poster}
                          alt={title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="img-fallback">No preview</div>
                      )}
                    </div>
                    <div className="px-3 py-2 text-sm opacity-85">{title}</div>
                  </div>
                );
                
                return (
                  <div key={p.id ?? p.slug ?? globalIndex}>
                    {to ? (
                      <a href={to} className="block focus:outline-none focus:ring">
                        {card}
                      </a>
                    ) : card}
                  </div>
                );
              })}
            </motion.div>
          ))}
        </div>
        
        {/* Sentinel for infinite scroll */}
        <div ref={sentinelRef} aria-hidden="true" style={{ height: 8, marginTop: 24, background: '#333' }} />
        
        {/* Large spacer to ensure scroll range for counter-scroll effect */}
        <div aria-hidden="true" style={{ height: 2000 }} />
      </section>
    </ReducedMotionProvider>
  );
}