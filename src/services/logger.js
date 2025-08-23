const LogLevel = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
}

class Logger {
  constructor() {
    this.isDevelopment = import.meta.env.DEV
    this.logs = []
  }

  log(level, message, data = {}) {
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      level,
      message,
      data
    }

    // Store log entry
    this.logs.push(logEntry)

    // In development, output to console
    if (this.isDevelopment) {
      const consoleMethod = console[level] || console.log
      consoleMethod(`[${timestamp}] ${message}`, data)
    }

    // In production, you could send to external service here
    // Example: this.sendToService(logEntry)
  }

  error(message, data) {
    this.log(LogLevel.ERROR, message, data)
  }

  warn(message, data) {
    this.log(LogLevel.WARN, message, data)
  }

  info(message, data) {
    this.log(LogLevel.INFO, message, data)
  }

  debug(message, data) {
    if (this.isDevelopment) {
      this.log(LogLevel.DEBUG, message, data)
    }
  }

  getLogs() {
    return this.logs
  }

  clearLogs() {
    this.logs = []
  }
}

export default new Logger()