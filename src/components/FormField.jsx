/**
 * Reusable form field component with validation display
 * Ensures consistent error handling across all forms
 */

import { AlertCircle } from 'lucide-react'

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  className = '',
  inputClassName = '',
  rows,
  as = 'input',
  children,
  ...rest
}) {
  const baseInputClass = `w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-colors ${
    error 
      ? 'border-red-500/50 focus:border-red-500' 
      : 'border-white/10 focus:border-[#00D4FF]'
  } ${inputClassName}`

  const Component = as === 'textarea' ? 'textarea' : as === 'select' ? 'select' : 'input'

  return (
    <div className={className}>
      {label && (
        <label className="body-sans text-white/60 text-sm mb-2 block">
          {label} {required && '*'}
        </label>
      )}
      
      {as === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={baseInputClass}
          required={required}
          {...rest}
        >
          {children}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseInputClass}
          required={required}
          rows={rows || 4}
          {...rest}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseInputClass}
          required={required}
          {...rest}
        />
      )}
      
      {error && (
        <div className="mt-2 flex items-start gap-2 text-red-500">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  )
}