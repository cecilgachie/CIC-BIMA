import { useState, useEffect } from 'react';
import { FormLayout } from '../FormLayout';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';
import { FormSummary } from '../FormSummary';
import { useFormValidation } from '../../hooks/useFormValidation';
import { marineCargoSchema } from '../../schemas/marineCargo';
import { useFormState, useFormDispatch } from '../../context/FormContext';

const GOODS_CATEGORIES = [
  { value: 'cotton', label: 'Cotton' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'machinery', label: 'Machinery' },
  { value: 'textiles', label: 'Textiles' },
  { value: 'chemicals', label: 'Chemicals' },
  { value: 'food', label: 'Food Products' },
  { value: 'metals', label: 'Metals' },
  { value: 'vehicles', label: 'Vehicles' },
];

// This would typically come from an API or database
const COUNTRIES = {
  seaports: [
    {
      code: 'KE',
      name: 'Kenya',
      ports: [
        { value: 'mombasa', label: 'Port of Mombasa' },
      ],
    },
    {
      code: 'TZ',
      name: 'Tanzania',
      ports: [
        { value: 'dar', label: 'Port of Dar es Salaam' },
      ],
    },
    // Add more countries with seaports...
  ],
  airports: [
    {
      code: 'KE',
      name: 'Kenya',
      ports: [
        { value: 'nbo', label: 'Jomo Kenyatta International Airport' },
        { value: 'mba', label: 'Moi International Airport' },
      ],
    },
    {
      code: 'TZ',
      name: 'Tanzania',
      ports: [
        { value: 'dar', label: 'Julius Nyerere International Airport' },
      ],
    },
    // Add more countries with airports...
  ],
};

export const MarineCargoForm = () => {
  const [showSummary, setShowSummary] = useState(false);
  const { formData, isSubmitting, error } = useFormState();
  const dispatch = useFormDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useFormValidation(marineCargoSchema, formData);

  const modeOfConveyance = watch('modeOfConveyance');
  const originCountry = watch('originCountry');
  const destinationCountry = watch('destinationCountry');

  const availableCountries = modeOfConveyance === 'sea' ? COUNTRIES.seaports : COUNTRIES.airports;
  
  const countryOptions = availableCountries.map(country => ({
    value: country.code,
    label: country.name,
  }));

  const getPortOptions = (countryCode) => {
    const country = availableCountries.find(c => c.code === countryCode);
    return country ? country.ports : [];
  };

  useEffect(() => {
    if (modeOfConveyance) {
      setValue('originCountry', '');
      setValue('originPort', '');
      setValue('destinationCountry', '');
      setValue('destinationPort', '');
    }
  }, [modeOfConveyance, setValue]);

  useEffect(() => {
    if (originCountry) {
      setValue('originPort', '');
    }
  }, [originCountry, setValue]);

  useEffect(() => {
    if (destinationCountry) {
      setValue('destinationPort', '');
    }
  }, [destinationCountry, setValue]);

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
        title="Marine Cargo Insurance Summary"
        description="Please review your insurance details"
        data={formData}
        onEdit={() => setShowSummary(false)}
      />
    );
  }

  return (
    <FormLayout
      title="Marine Cargo Insurance"
      description="Protect your goods during transit"
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

      <FormInput
        label="Value of Goods (KES)"
        type="number"
        min="0"
        step="0.01"
        {...register('valueOfGoods', { valueAsNumber: true })}
        error={errors.valueOfGoods?.message}
      />

      <FormSelect
        label="Mode of Conveyance"
        options={[
          { value: 'air', label: 'Air Transport' },
          { value: 'sea', label: 'Sea Transport' },
        ]}
        placeholder="Select mode of transport"
        {...register('modeOfConveyance')}
        error={errors.modeOfConveyance?.message}
      />

      <FormSelect
        label="Category of Goods"
        options={GOODS_CATEGORIES}
        placeholder="Select category"
        {...register('categoryOfGoods')}
        error={errors.categoryOfGoods?.message}
      />

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Origin</h3>
          <FormSelect
            label="Country"
            options={countryOptions}
            placeholder="Select country"
            disabled={!modeOfConveyance}
            {...register('originCountry')}
            error={errors.originCountry?.message}
          />

          <FormSelect
            label={modeOfConveyance === 'sea' ? 'Port' : 'Airport'}
            options={getPortOptions(originCountry)}
            placeholder={`Select ${modeOfConveyance === 'sea' ? 'port' : 'airport'}`}
            disabled={!originCountry}
            {...register('originPort')}
            error={errors.originPort?.message}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Destination</h3>
          <FormSelect
            label="Country"
            options={countryOptions}
            placeholder="Select country"
            disabled={!modeOfConveyance}
            {...register('destinationCountry')}
            error={errors.destinationCountry?.message}
          />

          <FormSelect
            label={modeOfConveyance === 'sea' ? 'Port' : 'Airport'}
            options={getPortOptions(destinationCountry)}
            placeholder={`Select ${modeOfConveyance === 'sea' ? 'port' : 'airport'}`}
            disabled={!destinationCountry}
            {...register('destinationPort')}
            error={errors.destinationPort?.message}
          />
        </div>
      </div>
    </FormLayout>
  );
}; 