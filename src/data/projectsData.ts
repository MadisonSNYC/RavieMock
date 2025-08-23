/**
 * Project Data Types and Sample Data
 * Minimal implementation to fix missing import
 * This preserves the existing 3D gallery and infinite scroll functionality
 */

export interface ProjectData {
  id: string
  title: string
  description?: string
  tiles: Array<{
    type: string
    data: any
  }>
}

// Sample project data - replace with actual data
export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'project-1',
    title: 'Project One',
    description: 'First project description',
    tiles: [
      { type: 'image', data: { src: '/images/project1-1.jpg', alt: 'Project 1 Image 1' } },
      { type: 'text', data: { title: 'Overview', description: 'Project overview text' } },
      { type: 'image', data: { src: '/images/project1-2.jpg', alt: 'Project 1 Image 2' } },
      { type: 'video', data: { src: '/videos/project1.mp4' } }
    ]
  },
  {
    id: 'project-2', 
    title: 'Project Two',
    description: 'Second project description',
    tiles: [
      { type: 'image', data: { src: '/images/project2-1.jpg', alt: 'Project 2 Image 1' } },
      { type: 'text', data: { title: 'Details', description: 'Project details text' } },
      { type: 'image', data: { src: '/images/project2-2.jpg', alt: 'Project 2 Image 2' } }
    ]
  },
  {
    id: 'project-3',
    title: 'Project Three',
    description: 'Third project description',
    tiles: [
      { type: 'image', data: { src: '/images/project3-1.jpg', alt: 'Project 3 Image 1' } },
      { type: 'video', data: { src: '/videos/project3.mp4' } },
      { type: 'text', data: { title: 'Concept', description: 'Project concept text' } }
    ]
  }
]