"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidation = void 0;
const zod_1 = require("zod");
const createEventZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({ required_error: 'Title is required' })
            .min(1, 'Title cannot be empty')
            .transform(str => str.trim()),
        date: zod_1.z
            .string({ required_error: 'Date is required' })
            .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
            .refine(val => !isNaN(new Date(val).getTime()), {
            message: 'Date must be a valid date',
        }),
        time: zod_1.z
            .string({ required_error: 'Time is required' })
            .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM 24-hour format'),
        notes: zod_1.z.string().optional(),
        archived: zod_1.z.boolean().default(false),
    }),
});
exports.EventValidation = {
    createEventZodSchema,
};
