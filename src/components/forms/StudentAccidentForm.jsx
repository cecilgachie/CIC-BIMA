import { useState } from 'react';
import { FormLayout } from '../FormLayout';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';
import { FormSummary } from '../FormSummary';
import { useFormValidation } from '../../hooks/useFormValidation';
import { studentAccidentSchema } from '../../schemas/studentAccident';
import { useFormState, useFormDispatch } from '../../context/FormContext';

const OCCUPATIONS = [
  { value: 'intern', label: 'Intern' },
  { value: 'security service', label: 'Security Service' },
  { value: 'rider', label: 'Rider' },
  { value: 'driver', label: 'Driver' },
];

const DURATIONS = [
  { value: '3', label: '3 Months' },
  { value: '6', label: '6 Months' },
  { value: '12', label: '12 Months' },
];

export const StudentAccidentForm = () => {
  const [showSummary, setShowSummary] = useState(false);
  const { formData, isSubmitting, error } = useFormState();
  const dispatch = useFormDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidation(studentAccidentSchema, formData);

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
        title="Student Accident Plan Summary"
        description="Please review your insurance details"
        data={formData}
        onEdit={() => setShowSummary(false)}
      />
    );
  }

  return (
    <FormLayout
      title="Student Accident Plan"
      description="Protect yourself during your attachment period"
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

      <FormSelect
        label="Occupation"
        options={OCCUPATIONS}
        placeholder="Select your occupation"
        {...register('occupation')}
        error={errors.occupation?.message}
      />

      <FormInput
        label="Place of Attachment"
        {...register('placeOfAttachment')}
        error={errors.placeOfAttachment?.message}
      />

      <FormInput
        label="Nature of Attachment"
        {...register('natureOfAttachment')}
        error={errors.natureOfAttachment?.message}
      />

      <FormSelect
        label="Duration of Attachment"
        options={DURATIONS}
        placeholder="Select duration"
        {...register('durationOfAttachment')}
        error={errors.durationOfAttachment?.message}
      />
    </FormLayout>
  );
}; 