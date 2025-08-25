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
  console.debug('[3x3] projects.len =', projects.length);
  const [page, setPage] = useState(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  
  const visible = useMemo(() => projects.slice(0, page * PAGE_SIZE), [projects, page]);

  // IntersectionObserver for auto-append
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    console.debug('[3x3] IO init');
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = !!entries?.[0]?.isIntersecting;
        if (hit) {
          console.debug('[3x3] IO hit → page++');
          setPage((p) => p + 1);
        }
      },
      { root: null, rootMargin: '1500px 0px 1500px 0px', threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Near-bottom fallback guard
  useEffect(() => {
    console.debug('[3x3] scroll fallback init');
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 600;
      if (nearBottom) setPage((p) => p + 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Unlock body/html overflow on mount
  useEffect(() => {
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = '';            // allow page scroll
    document.body.style.overflow = '';   // allow page scroll
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  console.debug('[3x3] page =', page, 'visible =', visible.length);

  return (
    <ReducedMotionProvider>
      <section className="work-3x3 px-4 sm:px-6 lg:px-10 py-8" style={{ overflow: 'visible' }}>
        <h1 className="text-2xl sm:text-3xl font-medium mb-6">Work</h1>

        {/* 3x3 desktop, 2x? tablet, 1x mobile */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16"
          style={{ overflow: 'visible' }}
        >
          {visible.map((p: any, i: number) => {
            const poster = resolvePoster(p);
            const title = p.title || p.client || 'Project';
            const to = p.slug ? `/the-work/${p.slug}` : undefined;

            const card =
              <div className="project-card rounded-xl overflow-hidden bg-black/40 border border-white/10">
                {/* Strict 16:9 media box */}
                <div
                  className="media"
                  style={{
                    aspectRatio: '16 / 9',
                    width: '105%',         // allow overflow
                    marginLeft: '-2.5%',   // re-center
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
        
        {/* sentinel + spacer to guarantee intersection */}
        <div
          ref={sentinelRef}
          aria-hidden="true"
          style={{ height: 8, marginTop: 24, background: '#222' }}
        />
        <div aria-hidden="true" style={{ height: 800 }} />   {/* spacer ensures page is scrollable */}
        
        {/* Guarantee page can scroll even if first page fills the viewport */}
        <div aria-hidden="true" style={{ height: Math.max(0, 600 - (window.innerHeight - document.body.offsetHeight)) }} />
      </section>
    </ReducedMotionProvider>
  );
}