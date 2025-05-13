import { twMerge } from 'tailwind-merge';

const SummaryRow = ({ label, value, className }) => {
  if (!value && value !== 0) return null;
  
  return (
    <div className={twMerge('py-4 sm:grid sm:grid-cols-3 sm:gap-4', className)}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
      </dd>
    </div>
  );
};

const formatDate = ({ day, month, year }) => {
  if (!day || !month || !year) return null;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const FormSummary = ({
  data,
  title,
  description,
  className,
  onEdit,
}) => {
  return (
    <div className={twMerge('max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8', className)}>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="btn btn-secondary"
            >
              Edit
            </button>
          )}
        </div>
        {description && (
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        )}
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <dl className="divide-y divide-gray-200">
            {Object.entries(data).map(([key, value]) => {
              // Skip internal form state properties
              if (key.startsWith('_')) return null;

              // Format the label
              const label = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase());

              // Format the value based on its type
              let formattedValue = value;
              if (typeof value === 'object' && value !== null) {
                if ('day' in value && 'month' in value && 'year' in value) {
                  formattedValue = formatDate(value);
                } else if (Array.isArray(value)) {
                  formattedValue = value.join(', ');
                } else {
                  // Recursively render nested objects
                  return (
                    <div key={key} className="py-4">
                      <dt className="text-sm font-medium text-gray-500 mb-2">
                        {label}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <dl className="divide-y divide-gray-200">
                          {Object.entries(value).map(([nestedKey, nestedValue]) => (
                            <SummaryRow
                              key={`${key}-${nestedKey}`}
                              label={nestedKey
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, (str) => str.toUpperCase())}
                              value={nestedValue}
                            />
                          ))}
                        </dl>
                      </dd>
                    </div>
                  );
                }
              }

              return (
                <SummaryRow
                  key={key}
                  label={label}
                  value={formattedValue}
                />
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
}; 