import React from 'react'

export default function TestPortfolio() {
  return (
    <div style={{ 
      padding: '2rem', 
      background: '#000', 
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1>Test Portfolio Page</h1>
      <p>If you can see this, the route is working.</p>
      
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #fff' }}>
        <h2>Testing imports:</h2>
        <ul>
          <li>ProjectsData: {typeof import('../../data/projectsData').then(m => console.log('ProjectsData loaded', m))}</li>
          <li>TileTemplates: {typeof import('../../components/portfolio/TileTemplates').then(m => console.log('TileTemplates loaded', m))}</li>
        </ul>
      </div>
    </div>
  )
}