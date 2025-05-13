import { z } from 'zod';
import { basicInfoSchema, dateSchema, validateDate, validateFutureDate } from './common';

export const golfersInsuranceSchema = basicInfoSchema.extend({
  golfClubMemberships: z.array(z.string()).min(1, 'Please select at least one golf club membership'),
  occupation: z.string().min(2, 'Please enter your occupation'),
  policyStartDate: dateSchema.refine(validateDate, {
    message: 'Please enter a valid date',
  }).refine(validateFutureDate, {
    message: 'Policy start date must be in the future',
  }),
}); 