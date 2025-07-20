import { Schema, model } from 'mongoose';
import { IEvent } from './event.interface';

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: 'Title cannot be empty',
      },
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
      validate: {
        validator: (value: string) => {
          return (
            /^\d{4}-\d{2}-\d{2}$/.test(value) &&
            !isNaN(new Date(value).getTime())
          );
        },
        message: 'Date must be in YYYY-MM-DD format and a valid date',
      },
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
      validate: {
        validator: (value: string) => {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: 'Time must be in HH:MM 24-hour format',
      },
    },
    notes: { type: String },
    archived: { type: Boolean, default: false },
    category: {
      type: String,
      enum: ['Work', 'Personal', 'Other'],
      required: [true, 'Category is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Event = model<IEvent>('Event', EventSchema);
