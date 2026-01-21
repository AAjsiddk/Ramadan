
'use server';

import {
  generatePersonalizedPrayer,
  type GeneratePersonalizedPrayerInput,
} from '@/ai/flows/generate-personalized-prayer';
import { z } from 'zod';

const formSchema = z.object({
  reflection: z.string().min(10, {
    message: 'Reflection must be at least 10 characters.',
  }),
  topics: z.array(z.string()).optional(),
});

export type PrayerState = {
  prayer?: string;
  errors?: {
    reflection?: string[];
    topics?: string[];
    server?: string;
  };
};

export async function handleGeneratePrayer(
  prevState: PrayerState,
  formData: FormData
): Promise<PrayerState> {
  const validatedFields = formSchema.safeParse({
    reflection: formData.get('reflection'),
    topics: formData.getAll('topics'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const input: GeneratePersonalizedPrayerInput = {
      dailyReflection: validatedFields.data.reflection,
      relevantPrayers: (validatedFields.data.topics ?? []).join(', '),
    };

    const result = await generatePersonalizedPrayer(input);

    if (result.personalizedPrayer) {
      return { prayer: result.personalizedPrayer };
    } else {
      return {
        errors: { server: 'Could not generate prayer. Please try again.' },
      };
    }
  } catch (e) {
    console.error(e);
    return { errors: { server: 'An unexpected error occurred.' } };
  }
}
