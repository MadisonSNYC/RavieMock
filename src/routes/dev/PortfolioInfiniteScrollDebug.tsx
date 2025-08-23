import { useEffect, useState } from 'react'
import { PROJECTS_DATA } from '../../data/projectsData'

export default function PortfolioInfiniteScrollDebug() {
  const [error, setError] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      console.log('PROJECTS_DATA:', PROJECTS_DATA)
      setLoaded(true)
    } catch (e: any) {
      setError(e.message)
      console.error('Error loading:', e)
    }
  }, [])

  return (
    <div style={{ 
      padding: '2rem', 
      background: '#000', 
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'monospace'
    }}>
      <h1>Portfolio Infinite Scroll - Debug</h1>
      
      {error && (
        <div style={{ color: 'red', border: '1px solid red', padding: '1rem', marginBottom: '1rem' }}>
          Error: {error}
        </div>
      )}
      
      <div style={{ marginTop: '1rem' }}>
        <h2>Status:</h2>
        <ul>
          <li>Page Loaded: ✅</li>
          <li>Projects Data Loaded: {loaded ? '✅' : '❌'}</li>
          <li>Number of Projects: {PROJECTS_DATA?.length || 0}</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Projects Data:</h2>
        <pre style={{ 
          background: '#111', 
          padding: '1rem', 
          overflow: 'auto',
          maxHeight: '300px' 
        }}>
          {JSON.stringify(PROJECTS_DATA, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>First Project:</h2>
        {PROJECTS_DATA && PROJECTS_DATA[0] && (
          <pre style={{ background: '#111', padding: '1rem' }}>
            {JSON.stringify(PROJECTS_DATA[0], null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}