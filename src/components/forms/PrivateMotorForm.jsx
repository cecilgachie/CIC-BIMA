import { useState, useEffect } from 'react';
import { FormLayout } from '../FormLayout';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';
import { FormSummary } from '../FormSummary';
import { useFormValidation } from '../../hooks/useFormValidation';
import { privateMotorSchema } from '../../schemas/privateMotor';
import { useFormState, useFormDispatch } from '../../context/FormContext';

// This would typically come from an API or database
const VEHICLE_MAKES = [
  { value: 'toyota', label: 'Toyota' },
  { value: 'honda', label: 'Honda' },
  { value: 'volkswagen', label: 'Volkswagen' },
  { value: 'bmw', label: 'BMW' },
  { value: 'mercedes', label: 'Mercedes-Benz' },
  { value: 'audi', label: 'Audi' },
  { value: 'nissan', label: 'Nissan' },
  { value: 'mazda', label: 'Mazda' },
];

// This would typically be fetched based on the selected make
const VEHICLE_MODELS = {
  toyota: [
    { value: 'camry', label: 'Camry' },
    { value: 'corolla', label: 'Corolla' },
    { value: 'rav4', label: 'RAV4' },
    { value: 'highlander', label: 'Highlander' },
    { value: 'prado', label: 'Land Cruiser Prado' },
  ],
  honda: [
    { value: 'civic', label: 'Civic' },
    { value: 'accord', label: 'Accord' },
    { value: 'crv', label: 'CR-V' },
    { value: 'hrv', label: 'HR-V' },
  ],
  // Add more models for other makes...
};

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push({ value: year, label: year.toString() });
  }
  return years;
};

export const PrivateMotorForm = () => {
  const [showSummary, setShowSummary] = useState(false);
  const { formData, isSubmitting, error } = useFormState();
  const dispatch = useFormDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useFormValidation(privateMotorSchema, formData);

  const selectedMake = watch('vehicleMake');

  useEffect(() => {
    if (selectedMake) {
      setValue('vehicleModel', '');
    }
  }, [selectedMake, setValue]);

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
        title="Private Motor Insurance Summary"
        description="Please review your insurance details"
        data={formData}
        onEdit={() => setShowSummary(false)}
      />
    );
  }

  return (
    <FormLayout
      title="Private Motor Insurance"
      description="Protect your vehicle with our comprehensive motor insurance"
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
        label="Vehicle Make"
        options={VEHICLE_MAKES}
        placeholder="Select vehicle make"
        {...register('vehicleMake')}
        error={errors.vehicleMake?.message}
      />

      <FormSelect
        label="Vehicle Model"
        options={selectedMake ? VEHICLE_MODELS[selectedMake] || [] : []}
        placeholder="Select vehicle model"
        disabled={!selectedMake}
        {...register('vehicleModel')}
        error={errors.vehicleModel?.message}
      />

      <FormSelect
        label="Year of Manufacture"
        options={generateYearOptions()}
        placeholder="Select year"
        {...register('yearOfManufacture', { valueAsNumber: true })}
        error={errors.yearOfManufacture?.message}
      />

      <FormInput
        label="Vehicle Value (KES)"
        type="number"
        min="0"
        step="0.01"
        {...register('vehicleValue', { valueAsNumber: true })}
        error={errors.vehicleValue?.message}
      />
    </FormLayout>
  );
}; 