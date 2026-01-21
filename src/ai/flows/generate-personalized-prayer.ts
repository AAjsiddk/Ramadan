'use server';

/**
 * @fileOverview An AI agent to generate personalized prayers based on daily reflections.
 *
 * - generatePersonalizedPrayer - A function that generates a personalized prayer.
 * - GeneratePersonalizedPrayerInput - The input type for the generatePersonalizedPrayer function.
 * - GeneratePersonalizedPrayerOutput - The return type for the generatePersonalizedPrayer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GeneratePersonalizedPrayerInputSchema = z.object({
  dailyReflection: z
    .string()
    .describe('The user\'s daily reflection entry during Ramadan.'),
  relevantPrayers: z
    .string()
    .describe('List of relevant prayers to incorporate into the personalized prayer'),
});
export type GeneratePersonalizedPrayerInput = z.infer<
  typeof GeneratePersonalizedPrayerInputSchema
>;

const GeneratePersonalizedPrayerOutputSchema = z.object({
  personalizedPrayer: z
    .string()
    .describe('The AI-generated personalized prayer.'),
});
export type GeneratePersonalizedPrayerOutput = z.infer<
  typeof GeneratePersonalizedPrayerOutputSchema
>;

export async function generatePersonalizedPrayer(
  input: GeneratePersonalizedPrayerInput
): Promise<GeneratePersonalizedPrayerOutput> {
  return generatePersonalizedPrayerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedPrayerPrompt',
  input: {schema: GeneratePersonalizedPrayerInputSchema},
  output: {schema: GeneratePersonalizedPrayerOutputSchema},
  prompt: `You are an AI prayer assistant during Ramadan.

  Based on the user's daily reflection and the list of potentially relevant prayers, you will craft a personalized prayer that resonates with their spiritual journey.

  Daily Reflection: {{{dailyReflection}}}
  Relevant Prayers: {{{relevantPrayers}}}

  Compose a personalized prayer:
  `,
});

const generatePersonalizedPrayerFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedPrayerFlow',
    inputSchema: GeneratePersonalizedPrayerInputSchema,
    outputSchema: GeneratePersonalizedPrayerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
