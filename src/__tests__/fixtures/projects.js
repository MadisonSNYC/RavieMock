export const mockProjects = [
  {
    id: 'test-project-1',
    title: 'Test Brand Film',
    client: 'Test Client',
    category: 'Launch Film',
    thumbnail: 'test-thumb-1.jpg',
    metrics: '1M+ views',
    description: 'Test description for brand film project',
    tags: ['Motion Design', 'Brand Identity']
  },
  {
    id: 'test-project-2',
    title: 'Test Social Campaign',
    client: 'Another Client',
    category: 'Social Content',
    thumbnail: 'test-thumb-2.jpg',
    metrics: '500K engagement',
    description: 'Test social media campaign',
    tags: ['Social Media', 'Animation']
  }
]

export const mockProjectsFactory = (count = 5) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `project-${i}`,
    title: `Project ${i}`,
    client: `Client ${i}`,
    category: ['Launch Film', 'Social Content', 'Brand Identity'][i % 3],
    thumbnail: `thumb-${i}.jpg`,
    metrics: `${(i + 1) * 100}K views`,
    description: `Description for project ${i}`,
    tags: [`Tag ${i}`]
  }))
}