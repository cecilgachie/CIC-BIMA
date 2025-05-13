import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const FormSelect = forwardRef(({
  label,
  error,
  className,
  options = [],
  placeholder,
  ...props
}, ref) => {
  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={twMerge(
          'form-input',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}); 