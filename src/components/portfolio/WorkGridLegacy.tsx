import React, { useEffect, useMemo, useRef, useState } from 'react';
import projectsJson from '../../data/projects.json';
import ProjectGrid from './ProjectGrid';

const PAGE_SIZE = 9; // 3x3

function resolvePoster(p:any): string | undefined {
  // prefer existing poster fields
  const cand = p.posterSrc || p.image || p.thumbnail || (p.media && p.media[0]?.src);
  if (typeof cand === 'string' && cand.trim()) return cand;

  // graceful final fallback (brand mark) so card is never empty
  return '/Assts/Ravie Logos/Vector.png';
}

function normalizeProject(p:any) {
  // Ensure ProjectCard gets a poster field it expects
  const poster = resolvePoster(p);
  // keep rest of the object intact; override/add the poster key ProjectCard relies on
  return { ...p, posterSrc: poster, image: p.image ?? poster };
}

export default function WorkGridLegacy() {
  const projects: any[] = Array.isArray(projectsJson) ? projectsJson : [];
  const [page, setPage] = useState(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [ioReady, setIoReady] = useState(false);

  const visible = useMemo(() => {
    const list = projects.slice(0, page * PAGE_SIZE).map(normalizeProject);
    return list;
  }, [projects, page]);

  // IntersectionObserver for endless append
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setPage((p) => p + 1);
      },
      { root: null, rootMargin: '1200px 0px 1200px 0px', threshold: 0 }
    );
    obs.observe(el);
    setIoReady(true);
    return () => obs.disconnect();
  }, []);

  // Optional: scroll fallback if content is short
  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 600;
      if (nearBottom) setPage((p) => p + 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ProjectGrid is a simple 3-col layout
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-8">
      <h1 className="text-2xl sm:text-3xl font-medium mb-6">Work</h1>

      <ProjectGrid projects={visible} />

      {/* Sentinel to trigger more */}
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 8, marginTop: 24 }} />
    </section>
  );
}