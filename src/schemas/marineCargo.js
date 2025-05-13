import { z } from 'zod';
import { basicInfoSchema } from './common';

export const marineCargoSchema = basicInfoSchema.extend({
  valueOfGoods: z.number()
    .min(0, 'Value must be greater than or equal to 0')
    .transform(val => Math.round(val * 100) / 100), // Round to 2 decimal places
  modeOfConveyance: z.enum(['air', 'sea'], {
    errorMap: () => ({ message: 'Please select a valid mode of transport' }),
  }),
  categoryOfGoods: z.string().min(1, 'Please select a category of goods'),
  originCountry: z.string().min(1, 'Please select the origin country'),
  originPort: z.string().min(1, 'Please select the origin port/airport'),
  destinationCountry: z.string().min(1, 'Please select the destination country'),
  destinationPort: z.string().min(1, 'Please select the destination port/airport'),
}); 