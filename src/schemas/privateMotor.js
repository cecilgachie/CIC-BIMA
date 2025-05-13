import { z } from 'zod';
import { basicInfoSchema } from './common';

export const privateMotorSchema = basicInfoSchema.extend({
  vehicleMake: z.string().min(1, 'Please select a vehicle make'),
  vehicleModel: z.string().min(1, 'Please select a vehicle model'),
  yearOfManufacture: z.number()
    .min(1900, 'Year must be after 1900')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  vehicleValue: z.number()
    .min(0, 'Vehicle value must be greater than or equal to 0')
    .transform(val => Math.round(val * 100) / 100), // Round to 2 decimal places
}); 