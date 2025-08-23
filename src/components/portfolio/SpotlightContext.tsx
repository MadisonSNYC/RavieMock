import React, { createContext, useContext, useState, useMemo } from 'react';

type Ctx = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

const SpotlightCtx = createContext<Ctx | null>(null);

export function SpotlightProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const value = useMemo(() => ({ activeId, setActiveId }), [activeId]);
  return <SpotlightCtx.Provider value={value}>{children}</SpotlightCtx.Provider>;
}

export function useSpotlight() {
  const ctx = useContext(SpotlightCtx);
  if (!ctx) throw new Error('useSpotlight must be used within SpotlightProvider');
  return ctx;
}