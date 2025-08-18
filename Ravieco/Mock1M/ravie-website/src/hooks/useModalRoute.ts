import { useLocation, useNavigate, useParams } from 'react-router-dom'

export function useModalRoute() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()

  const open = (to: string) => {
    // keep the current location as background
    navigate(to, { state: { background: location } })
  }
  
  const close = () => navigate(-1)

  const slug = params.slug as string | undefined
  const hasModal = Boolean(slug)

  return { 
    hasModal, 
    slug, 
    open, 
    close, 
    background: location.state?.background || null 
  }
}