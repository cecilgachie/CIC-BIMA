import { z } from 'zod';

export const basicInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^(?:\+254|0)[17]\d{8}$/, 'Please enter a valid Kenyan phone number'),
  email: z.string().email('Please enter a valid email address'),
});

export const dateSchema = z.object({
  day: z.number().min(1).max(31),
  month: z.number().min(1).max(12),
  year: z.number().min(1900).max(new Date().getFullYear()),
});

export const formatDate = ({ day, month, year }) => {
  return new Date(year, month - 1, day);
};

export const validateDate = (date) => {
  const parsed = formatDate(date);
  return parsed.getDate() === date.day &&
    parsed.getMonth() === date.month - 1 &&
    parsed.getFullYear() === date.year;
};

export const validateFutureDate = (date) => {
  const parsed = formatDate(date);
  return parsed > new Date();
};

export const validatePastDate = (date) => {
  const parsed = formatDate(date);
  return parsed < new Date();
}; 