import { useState } from 'react';
import { FormLayout } from '../FormLayout';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';
import { FormDateInput } from '../FormDateInput';
import { FormSummary } from '../FormSummary';
import { useFormValidation } from '../../hooks/useFormValidation';
import { golfersInsuranceSchema } from '../../schemas/golfersInsurance';
import { useFormState, useFormDispatch } from '../../context/FormContext';

const GOLF_CLUBS = [
  { value: 'karen', label: 'Karen Country Club' },
  { value: 'muthaiga', label: 'Muthaiga Golf Club' },
  { value: 'windsor', label: 'Windsor Golf Hotel & Country Club' },
  { value: 'limuru', label: 'Limuru Country Club' },
  { value: 'royal', label: 'Royal Nairobi Golf Club' },
  { value: 'vetlab', label: 'Vetlab Sports Club' },
];

export const GolfersInsuranceForm = () => {
  const [showSummary, setShowSummary] = useState(false);
  const { formData, isSubmitting, error } = useFormState();
  const dispatch = useFormDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useFormValidation(golfersInsuranceSchema, formData);

  const onSubmit = async (data) => {
    try {
      dispatch({ type: 'SET_SUBMITTING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', data);
      
      dispatch({ type: 'SET_FORM_DATA', payload: data });
      setShowSummary(true);
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  };

  if (showSummary) {
    return (
      <FormSummary
        title="Golfers Insurance Summary"
        description="Please review your insurance details"
        data={formData}
        onEdit={() => setShowSummary(false)}
      />
    );
  }

  return (
    <FormLayout
      title="Golfers Insurance"
      description="Protect yourself and your equipment on the golf course"
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      error={error}
    >
      <FormInput
        label="Full Name"
        {...register('name')}
        error={errors.name?.message}
      />

      <FormInput
        label="Phone Number"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <FormInput
        label="Email Address"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <div className="space-y-4">
        <label className="form-label">Golf Club Memberships</label>
        <div className="space-y-2">
          {GOLF_CLUBS.map((club) => (
            <div key={club.value} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={`club-${club.value}`}
                value={club.value}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                {...register('golfClubMemberships')}
              />
              <label
                htmlFor={`club-${club.value}`}
                className="text-sm text-gray-700"
              >
                {club.label}
              </label>
            </div>
          ))}
        </div>
        {errors.golfClubMemberships && (
          <p className="form-error">{errors.golfClubMemberships.message}</p>
        )}
      </div>

      <FormInput
        label="Occupation"
        {...register('occupation')}
        error={errors.occupation?.message}
      />

      <FormDateInput
        label="Policy Start Date"
        value={watch('policyStartDate')}
        onChange={(value) => setValue('policyStartDate', value)}
        error={errors.policyStartDate?.message}
      />
    </FormLayout>
  );
}; 