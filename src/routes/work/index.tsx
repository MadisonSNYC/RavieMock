import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../../data/projects.json';
import WorkHorizontalAdapter from '../../components/portfolio/WorkHorizontalAdapter';
import WorkGridLegacy from '../../components/portfolio/WorkGridLegacy';
import { ReducedMotionProvider } from '../../providers/ReducedMotionProvider';
import { SpotlightProvider } from '../../components/portfolio/SpotlightContext';
import '../../components/portfolio/styles/horizontal-gallery-3d.css';

const PAGE_SIZE = 6; // was 12

const WorkIndex: React.FC = () => {
  const USE_HORIZONTAL = import.meta.env.VITE_WORK_HORIZ_3D === 'true';
  const USE_LEGACY_GRID = import.meta.env.VITE_WORK_LEGACY_GRID === 'true';
  
  const projects = projectsData;
  const [page, setPage] = useState(1);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [debug, setDebug] = useState({ page, visible: 0, total: Array.isArray(projects) ? projects.length : 0, intersections: 0 });

  const visibleProjects = useMemo(() => {
    const list = Array.isArray(projects) ? projects : [];
    return list.slice(0, page * PAGE_SIZE);
  }, [page, projects]);

  // Safety guard: ensure global scroll is enabled on /work
  useEffect(() => {
    // remove body class used by portfolio route
    document.body.classList.remove('portfolio-infinite-active');

    // clear any inline overflow locks that might have been left behind
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    html.style.overflow = '';
    document.body.style.overflow = '';

    return () => {
      // do NOT re-apply locks on unmount; /work should never set them
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  // Hide page scrollbar and let the gallery own wheel while this route is mounted
  React.useEffect(() => {
    if (!USE_HORIZONTAL) return;
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [USE_HORIZONTAL]);

  useEffect(() => {
    setDebug((d) => ({ ...d, page, visible: visibleProjects.length, total: Array.isArray(projects) ? projects.length : 0 }));
  }, [page, visibleProjects]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsIntersecting(true);
          setDebug((d) => ({ ...d, intersections: d.intersections + 1 }));
        } else {
          setIsIntersecting(false);
        }
      },
      { root: null, rootMargin: '1500px 0px 1500px 0px', threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;
    setPage(p => p + 1);
  }, [isIntersecting]);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 600;
      if (nearBottom) setPage((p) => p + 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const loadMore = () => setPage(p => p + 1);

  if (USE_LEGACY_GRID) {
    return (
      <main className="min-h-screen">
        <ReducedMotionProvider>
          <SpotlightProvider>
            <WorkGridLegacy />
          </SpotlightProvider>
        </ReducedMotionProvider>
      </main>
    );
  }

  if (USE_HORIZONTAL) {
    return (
      <main className="min-h-screen">
        {/* Full-viewport section so the gallery has a canvas */}
        <section style={{ height: '100vh' }}>
          <WorkHorizontalAdapter />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-10 py-8">
      <h1 className="text-2xl sm:text-3xl font-medium mb-6">Work</h1>

      <div style={{fontSize:12,opacity:.7,marginBottom:8}}>
        page={page} • visible={debug.visible}/{debug.total} • intersections={debug.intersections}
      </div>

      {/* CLS-safe grid container */}
      <div
        className="grid gap-6 sm:gap-7 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        aria-live="polite"
        aria-busy={isIntersecting ? 'true' : 'false'}
      >
        {visibleProjects.map((p: any, i: number) => {
          const poster =
            p.posterSrc || p.image || p.thumbnail || (p.media && p.media[0]?.src);
          const title = p.title || p.client || 'Project';
          const to = p.slug ? `/the-work/${p.slug}` : undefined;

          return (
            <div key={p.id ?? p.slug ?? i} className="group">
              {to ? (
                <a href={to} className="block focus:outline-none focus:ring">
                  <div className="relative w-full rounded-xl overflow-hidden">
                    {/* Reserve aspect ratio to prevent CLS */}
                    <div style={{ aspectRatio: '16 / 9', background: '#0d0d0d' }}>
                      {poster && (
                        <img
                          src={poster}
                          alt={title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm opacity-80">{title}</div>
                      {p.durationSec ? (
                        <span className="text-xs opacity-60">{p.durationSec}s</span>
                      ) : null}
                    </div>
                  </div>
                </a>
              ) : (
                <div className="relative w-full rounded-xl overflow-hidden">
                  <div style={{ aspectRatio: '16 / 9', background: '#0d0d0d' }}>
                    {poster && (
                      <img
                        src={poster}
                        alt={title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                  <div className="mt-3 text-sm opacity-80">{title}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sentinel & fallback */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        style={{ height: 8, marginTop: 24, background: isIntersecting ? '#16a34a' : '#333', borderRadius: 4 }}
      />
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={loadMore}
          className="px-4 py-2 rounded-md border border-white/10 hover:bg-white/5 text-sm"
        >
          Load more
        </button>
      </div>
    </main>
  );
};

export default WorkIndex;