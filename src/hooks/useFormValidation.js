import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useFormValidation = (schema, defaultValues = {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    trigger,
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const setFieldValue = useCallback((name, value) => {
    setValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [setValue]);

  return {
    register,
    handleSubmit,
    errors,
    watch,
    setValue: setFieldValue,
    reset,
    trigger,
    getValues,
  };
}; 