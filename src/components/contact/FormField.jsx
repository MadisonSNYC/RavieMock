/**
 * FormField Component
 * Reusable form field with label and error handling
 */

export default function FormField({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder, 
  required = false,
  options = null,
  className = '',
  maxLength = null
}) {
  const baseInputClass = `w-full p-4 bg-white/[0.03] backdrop-blur-md border rounded-2xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 ${
    error ? 'border-red-500' : 'border-white/20 focus:border-neon-blue focus:bg-white/[0.05]'
  } ${className}`

  return (
    <div>
      <label htmlFor={name} className="caption-text mb-2 block uppercase tracking-wider">
        {label} {required && '*'}
      </label>
      
      {type === 'select' && options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={baseInputClass}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <div className="relative">
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={4}
            maxLength={maxLength || 2000}
            className={baseInputClass}
          />
          {value && (
            <div className="absolute bottom-2 right-3 text-xs text-white/40">
              {value.length} / {maxLength || 2000}
            </div>
          )}
        </div>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength || (type === 'email' ? 254 : 200)}
          className={baseInputClass}
        />
      )}
      
      {error && (
        <p className="text-red-400 text-sm mt-2">{error}</p>
      )}
    </div>
  )
}