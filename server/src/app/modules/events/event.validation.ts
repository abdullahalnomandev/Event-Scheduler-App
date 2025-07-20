import { z } from 'zod';

const createEventZodSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, 'Title cannot be empty')
      .transform(str => str.trim()),

    date: z
      .string({ required_error: 'Date is required' })
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
      .refine(val => !isNaN(new Date(val).getTime()), {
        message: 'Date must be a valid date',
      }),

    time: z
      .string({ required_error: 'Time is required' })
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        'Time must be in HH:MM 24-hour format'
      ),

    notes: z.string().optional(),

    archived: z.boolean({ required_error: 'Archived status is required' }),
  }),
});

export const EventValidation = {
  createEventZodSchema,
};
