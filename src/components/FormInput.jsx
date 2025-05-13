import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const FormInput = forwardRef(({
  label,
  error,
  className,
  type = 'text',
  ...props
}, ref) => {
  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={twMerge(
          'form-input',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
        )}
        {...props}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}); 