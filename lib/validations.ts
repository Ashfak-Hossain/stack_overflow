import { z } from 'zod';

export const QuestionSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must contain at least 5 character(s)')
    .max(130, 'Title must contain at most 130 character(s)'),

  explaination: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
