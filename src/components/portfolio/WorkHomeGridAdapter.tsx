import React, { useMemo } from 'react';
import { SmoothGrid } from '../homepage/SmoothGrid';
import { ReducedMotionProvider } from '../../providers/ReducedMotionProvider';
import projectsJson from '../../data/projects.json';

export default function WorkHomeGridAdapter() {
  const projects: any[] = useMemo(() => (Array.isArray(projectsJson) ? projectsJson : []), []);
  
  // SmoothGrid has SpotlightProvider built-in and needs ReducedMotionProvider
  return (
    <ReducedMotionProvider>
      <SmoothGrid projects={projects} />
    </ReducedMotionProvider>
  );
}