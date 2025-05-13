import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const generateOptions = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => ({
    value: start + i,
    label: String(start + i).padStart(2, '0'),
  }));
};

const days = generateOptions(1, 31);
const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];
const currentYear = new Date().getFullYear();
const years = generateOptions(1900, currentYear);

export const FormDateInput = forwardRef(({
  label,
  error,
  className,
  value = {},
  onChange,
  name,
  ...props
}, ref) => {
  const handleChange = (field) => (e) => {
    const newValue = {
      ...value,
      [field]: parseInt(e.target.value, 10),
    };
    onChange?.(newValue);
  };

  return (
    <div className={className}>
      {label && <label className="form-label">{label}</label>}
      <div className="grid grid-cols-3 gap-2">
        <select
          className={twMerge(
            'form-input',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
          )}
          value={value.day || ''}
          onChange={handleChange('day')}
          {...props}
        >
          <option value="">Day</option>
          {days.map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </select>
        <select
          className={twMerge(
            'form-input',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
          )}
          value={value.month || ''}
          onChange={handleChange('month')}
          {...props}
        >
          <option value="">Month</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        <select
          className={twMerge(
            'form-input',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
          )}
          value={value.year || ''}
          onChange={handleChange('year')}
          {...props}
        >
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.value}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}); 