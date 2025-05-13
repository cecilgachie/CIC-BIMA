import { useEffect, useState } from 'react';
import { FormLayout } from '../FormLayout';
import { FormInput } from '../FormInput';
import { FormDateInput } from '../FormDateInput';
import { FormSummary } from '../FormSummary';
import { useFormValidation } from '../../hooks/useFormValidation';
import { familyMedisureSchema } from '../../schemas/familyMedisure';
import { useFormState, useFormDispatch } from '../../context/FormContext';

export const FamilyMedisureForm = () => {
  const [showSummary, setShowSummary] = useState(false);
  const { formData, isSubmitting, error } = useFormState();
  const dispatch = useFormDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useFormValidation(familyMedisureSchema, formData);

  const includeSpouse = watch('includeSpouse');
  const includeChildren = watch('includeChildren');
  const numberOfChildren = watch('numberOfChildren');

  useEffect(() => {
    if (!includeSpouse) {
      setValue('spouseDetails', null);
    }
  }, [includeSpouse, setValue]);

  useEffect(() => {
    if (!includeChildren) {
      setValue('numberOfChildren', null);
      setValue('childrenDetails', null);
    }
  }, [includeChildren, setValue]);

  useEffect(() => {
    if (numberOfChildren) {
      const currentChildren = watch('childrenDetails') || [];
      if (currentChildren.length > numberOfChildren) {
        setValue('childrenDetails', currentChildren.slice(0, numberOfChildren));
      } else if (currentChildren.length < numberOfChildren) {
        setValue('childrenDetails', [
          ...currentChildren,
          ...Array(numberOfChildren - currentChildren.length).fill({ dob: {} }),
        ]);
      }
    }
  }, [numberOfChildren, setValue, watch]);

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
        title="Family Medisure Plan Summary"
        description="Please review your insurance details"
        data={formData}
        onEdit={() => setShowSummary(false)}
      />
    );
  }

  return (
    <FormLayout
      title="Family Medisure Plan"
      description="Protect your family with our comprehensive medical insurance"
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

      <FormDateInput
        label="Date of Birth"
        value={watch('dob')}
        onChange={(value) => setValue('dob', value)}
        error={errors.dob?.message}
      />

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="includeSpouse"
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            {...register('includeSpouse')}
          />
          <label htmlFor="includeSpouse" className="text-sm font-medium text-gray-700">
            Include Spouse
          </label>
        </div>

        {includeSpouse && (
          <FormDateInput
            label="Spouse's Date of Birth"
            value={watch('spouseDetails.dob')}
            onChange={(value) => setValue('spouseDetails.dob', value)}
            error={errors.spouseDetails?.dob?.message}
          />
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="includeChildren"
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            {...register('includeChildren')}
          />
          <label htmlFor="includeChildren" className="text-sm font-medium text-gray-700">
            Include Children
          </label>
        </div>

        {includeChildren && (
          <div className="space-y-4">
            <FormInput
              type="number"
              label="Number of Children"
              min={1}
              max={10}
              {...register('numberOfChildren', { valueAsNumber: true })}
              error={errors.numberOfChildren?.message}
            />

            {numberOfChildren > 0 && (
              <div className="space-y-4">
                {Array.from({ length: numberOfChildren }).map((_, index) => (
                  <FormDateInput
                    key={index}
                    label={`Child ${index + 1}'s Date of Birth`}
                    value={watch(`childrenDetails.${index}.dob`)}
                    onChange={(value) =>
                      setValue(`childrenDetails.${index}.dob`, value)
                    }
                    error={errors.childrenDetails?.[index]?.dob?.message}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </FormLayout>
  );
}; 