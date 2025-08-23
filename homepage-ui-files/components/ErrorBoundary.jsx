import React from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import logger from '../services/logger'
import { sanitizeForDisplay } from '../utils/security'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Sanitize error message before logging to prevent XSS
    const sanitizedError = error?.toString ? sanitizeForDisplay(error.toString()) : 'Unknown error'
    const sanitizedStack = error?.stack ? sanitizeForDisplay(error.stack) : 'No stack trace'
    
    // Log error using logger service with sanitized data
    logger.error('ErrorBoundary caught an error', {
      error: sanitizedError,
      errorInfo: errorInfo?.componentStack ? sanitizeForDisplay(errorInfo.componentStack) : 'No component stack',
      stack: sanitizedStack,
      url: window.location.href,
      userAgent: navigator.userAgent
    })
    
    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // You could also log to an error reporting service here
    // logErrorToService(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
          <div className="max-w-2xl w-full">
            <div className="glass-dark rounded-3xl p-8 md:p-12 text-center">
              {/* Error Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>

              {/* Error Message */}
              <h1 className="heading-sans text-3xl md:text-4xl font-bold text-white mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="body-sans text-white/60 mb-8 max-w-md mx-auto">
                {this.props.fallbackMessage || 
                  "We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists."}
              </p>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-8 text-left">
                  <summary className="body-sans text-white/40 cursor-pointer hover:text-white/60 transition-colors">
                    Show error details
                  </summary>
                  <pre className="mt-4 p-4 bg-black/50 rounded-xl text-xs text-red-400 overflow-x-auto">
                    {sanitizeForDisplay(this.state.error?.toString() || 'Unknown error')}
                    {this.state.errorInfo && sanitizeForDisplay(this.state.errorInfo.componentStack)}
                  </pre>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span className="body-sans font-medium">Refresh Page</span>
                </button>
                
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#00D4FF]/25"
                >
                  <Home className="w-5 h-5" />
                  <span className="body-sans font-medium">Go Home</span>
                </a>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary