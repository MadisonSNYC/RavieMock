/**
 * Bento Grid Configuration
 * Defines the layout and properties for each project tile
 */

import { projects } from '../../data/projects'

export const bentoLayout = [
  {
    id: 'coinbase',
    gridArea: 'coinbase', // 2x2 large card
    className: 'col-span-2 row-span-2',
    project: projects.find(p => p.id === 'coinbase'),
    gradient: 'from-[#00D4FF]/80 via-[#8B5CF6]/60 to-transparent',
    size: 'large'
  },
  {
    id: 'loops',
    gridArea: 'loops', // 2x1 wide card
    className: 'col-span-2 row-span-1',
    project: projects.find(p => p.id === 'loops'),
    gradient: 'from-[#8B5CF6]/80 to-transparent',
    size: 'wide'
  },
  {
    id: 'kw',
    gridArea: 'kw', // 1x2 tall card
    className: 'col-span-1 row-span-2',
    project: projects.find(p => p.id === 'keller-williams'),
    gradient: 'from-red-600/80 to-transparent',
    size: 'tall'
  },
  {
    id: 'jhene',
    gridArea: 'jhene', // 1x1 square
    className: 'col-span-1 row-span-1',
    project: projects.find(p => p.id === 'jhene-aiko'),
    gradient: 'from-purple-600/80 to-transparent',
    size: 'normal'
  },
  {
    id: 'ozone',
    gridArea: 'ozone', // 1x1 square
    className: 'col-span-1 row-span-1',
    project: projects.find(p => p.id === 'ozone'),
    gradient: 'from-cyan-500/80 to-transparent',
    size: 'normal'
  },
  {
    id: 'osos',
    gridArea: 'osos', // 2x1 wide card
    className: 'col-span-2 row-span-1',
    project: projects.find(p => p.id === 'osos'),
    gradient: 'from-gray-600/80 to-transparent',
    size: 'wide'
  },
  {
    id: 'amex',
    gridArea: 'amex', // 1x1 square
    className: 'col-span-1 row-span-1',
    project: projects.find(p => p.id === 'amex'),
    gradient: 'from-blue-600/80 to-transparent',
    size: 'normal'
  },
  {
    id: 'soho',
    gridArea: 'soho', // 1x1 square
    className: 'col-span-1 row-span-1',
    project: projects.find(p => p.id === 'soho'),
    gradient: 'from-orange-600/80 to-transparent',
    size: 'normal'
  }
]

// Animation delays for staggered reveal
export const getAnimationDelay = (index) => index * 0.05

// Grid positions for desktop layout
export const desktopGridPositions = {
  coinbase: { col: '1/3', row: '1/3' },
  loops: { col: '3/5', row: '1/2' },
  kw: { col: '5/6', row: '1/3' },
  jhene: { col: '3/4', row: '2/3' },
  ozone: { col: '4/5', row: '2/3' },
  osos: { col: '1/3', row: '3/4' },
  amex: { col: '3/4', row: '3/4' },
  soho: { col: '4/5', row: '3/4' }
}