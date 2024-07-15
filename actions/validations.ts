import { z } from 'zod';

export const QuestionSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must contain at least 5 character(s)')
    .max(130, 'Title must contain at most 130 character(s)'),

  explaination: z
    .string()
    .min(20, 'Explaination must contain at least 20 character(s)'),

  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(20),
});

export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),

  username: z.string().min(3).max(50),

  bio: z.string().max(200),

  portfolioWebsite: z
    .string()
    .url()
    .refine((value) => value === '' || /^https?:\/\//.test(value), {
      message: 'Invalid URL',
    }),

  // portfolioWebsite: not showing

  location: z.string().max(50),
});
