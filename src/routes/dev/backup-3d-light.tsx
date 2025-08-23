import React from "react"
import ThreeDFoldGalleryLight from "../../components/portfolio/ThreeDFoldGalleryLight"
import { PROJECTS_DATA } from "../../data/projectsData"

/**
 * Backup route for testing the extracted 3D Fold Gallery (Light variant)
 * This should visually match /dev/portfolio-light
 */
export default function Backup3DLight() {
  // Use the first project as sample data
  const sampleProject = PROJECTS_DATA[0] || {
    id: 'sample',
    title: 'Sample Project',
    tiles: [
      { type: 'image', data: { src: '/placeholder.jpg', alt: 'Sample' } },
      { type: 'text', data: { title: 'Test', description: 'Test description' } }
    ]
  }
  
  return <ThreeDFoldGalleryLight project={sampleProject} />
}