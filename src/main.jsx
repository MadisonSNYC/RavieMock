import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context' // new import

const withAuth = import.meta.env.VITE_AUTH_ENABLED === 'true'

const AppWithProviders = () => {
  const content = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  
  return withAuth ? <AuthProvider>{content}</AuthProvider> : content
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
)
