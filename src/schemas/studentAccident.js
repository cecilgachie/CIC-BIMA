import { z } from 'zod';
import { basicInfoSchema } from './common';

export const studentAccidentSchema = basicInfoSchema.extend({
  occupation: z.enum(['intern', 'security service', 'rider', 'driver'], {
    errorMap: () => ({ message: 'Please select a valid occupation' }),
  }),
  placeOfAttachment: z.string().min(2, 'Please enter your place of attachment'),
  natureOfAttachment: z.string().min(2, 'Please describe the nature of your attachment'),
  durationOfAttachment: z.enum(['3', '6', '12'], {
    errorMap: () => ({ message: 'Please select a valid duration (3, 6, or 12 months)' }),
  }),
}); 