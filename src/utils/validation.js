import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),

  email: z.string().email('Invalid email address'),

  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});
