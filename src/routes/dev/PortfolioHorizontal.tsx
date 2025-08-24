import React, { useMemo, useState } from 'react';
import { PROJECTS_DATA } from '../../data/projectsData';
import '../../components/portfolio/styles/portfolio-layout.css';
import '../../components/portfolio/styles/horizontal-gallery-3d.css';
import '../../components/portfolio/styles/tiles.css';
import Horizontal3DGallery from '../../components/portfolio/Horizontal3DGallery';

export default function PortfolioHorizontal() {
  const [idx, setIdx] = useState(0);
  const project = useMemo(() => PROJECTS_DATA[idx] ?? PROJECTS_DATA[0], [idx]);

  return (
    <div className="portfolio-wrapper">
      <div className="portfolio-container">
        <aside className="project-sidebar">
          {PROJECTS_DATA.map((p, i) => (
            <button
              key={p.id ?? i}
              onClick={() => setIdx(i)}
              style={{
                display:'block', width:'100%', textAlign:'left',
                padding:'8px 10px', border:'1px solid #333', marginBottom:6,
                borderRadius:6, background:i===idx?'#00D4FF':'transparent',
                color:i===idx?'#000':'#fff'
              }}
            >
              {p.title ?? `Project ${i+1}`}
            </button>
          ))}
        </aside>

        <main className="main-content">
          <h2 style={{marginBottom:12}}>{project.title ?? 'Project'}</h2>
          {/* mount the recovered horizontal 3D component */}
          <Horizontal3DGallery key={project.id ?? idx} project={project} />
        </main>
      </div>
    </div>
  );
}