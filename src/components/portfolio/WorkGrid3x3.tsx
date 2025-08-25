import React, { useEffect, useMemo, useRef, useState } from 'react';
// PICK THE LIVE DATA SOURCE. If this path differs in your repo, STOP and ask.
import projectsJson from '../../data/projects.json';
import { ReducedMotionProvider } from '../../providers/ReducedMotionProvider';

// small, local poster resolver so we never render broken boxes
function resolvePoster(p:any): string | undefined {
  const cand = p.posterSrc || p.image || p.thumbnail || (p.media && p.media[0]?.src);
  return (typeof cand === 'string' && cand.trim()) ? cand : '/Assts/Ravie Logos/Vector.png';
}

const NINE = 9;
const PAGE_SIZE = 9;

export default function WorkGrid3x3() {
  const projects: any[] = useMemo(() => (Array.isArray(projectsJson) ? projectsJson : []), []);
  const [page, setPage] = useState(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  
  const visible = useMemo(() => projects.slice(0, page * PAGE_SIZE), [projects, page]);

  // IntersectionObserver for auto-append
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && setPage((p) => p + 1),
      { root: null, rootMargin: '1200px 0px 1200px 0px', threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Near-bottom fallback guard
  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 600;
      if (nearBottom) setPage((p) => p + 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Guard against stray body/html overflow locks
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

  return (
    <ReducedMotionProvider>
      <section className="work-3x3 px-4 sm:px-6 lg:px-10 py-8">
        <h1 className="text-2xl sm:text-3xl font-medium mb-6">Work</h1>

        {/* 3x3 desktop, 2x? tablet, 1x mobile */}
        <div className="grid gap-6 sm:gap-7 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p: any, i: number) => {
            const poster = resolvePoster(p);
            const title = p.title || p.client || 'Project';
            const to = p.slug ? `/the-work/${p.slug}` : undefined;

            const card =
              <div className="project-card rounded-xl overflow-hidden bg-black/40 border border-white/10">
                {/* Strict 16:9 media box */}
                <div className="media" style={{ aspectRatio: '16 / 9', width: '100%' }}>
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
              </div>;

            return (
              <div key={p.id ?? p.slug ?? i}>
                {to ? (
                  <a href={to} className="block focus:outline-none focus:ring">
                    {card}
                  </a>
                ) : card}
              </div>
            );
          })}
        </div>
        
        {/* Sentinel to trigger more loads */}
        <div ref={sentinelRef} aria-hidden="true" style={{ height: 8, marginTop: 24 }} />
      </section>
    </ReducedMotionProvider>
  );
}