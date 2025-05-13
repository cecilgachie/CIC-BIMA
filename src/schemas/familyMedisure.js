import { z } from 'zod';
import { basicInfoSchema, dateSchema, validateDate, validatePastDate } from './common';

const familyMemberSchema = z.object({
  dob: dateSchema.refine(validateDate, {
    message: 'Please enter a valid date',
  }).refine(validatePastDate, {
    message: 'Date of birth must be in the past',
  }),
});

export const familyMedisureSchema = basicInfoSchema.extend({
  dob: dateSchema.refine(validateDate, {
    message: 'Please enter a valid date',
  }).refine(validatePastDate, {
    message: 'Date of birth must be in the past',
  }),
  includeSpouse: z.boolean(),
  spouseDetails: z.object({
    dob: dateSchema.refine(validateDate, {
      message: 'Please enter a valid date',
    }).refine(validatePastDate, {
      message: 'Date of birth must be in the past',
    }),
  }).optional().nullable(),
  includeChildren: z.boolean(),
  numberOfChildren: z.number().min(0).max(10).optional().nullable(),
  childrenDetails: z.array(familyMemberSchema).max(10).optional().nullable(),
}); 