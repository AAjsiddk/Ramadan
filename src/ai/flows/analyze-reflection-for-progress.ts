'use server';

/**
 * @fileOverview Analyzes a user's reflection to determine their spiritual progress during Ramadan.
 *
 * - analyzeReflectionForProgress - A function that analyzes the reflection text and returns a progress summary.
 * - AnalyzeReflectionInput - The input type for the analyzeReflectionForProgress function.
 * - AnalyzeReflectionOutput - The return type for the analyzeReflectionForProgress function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeReflectionInputSchema = z.object({
  reflectionText: z
    .string()
    .describe('The text of the user\'s daily Ramadan reflection.'),
});
export type AnalyzeReflectionInput = z.infer<typeof AnalyzeReflectionInputSchema>;

const AnalyzeReflectionOutputSchema = z.object({
  progress: z
    .string()
    .describe(
      'A one-sentence summary of the user\'s spiritual progress, based on the reflection text.'
    ),
});
export type AnalyzeReflectionOutput = z.infer<typeof AnalyzeReflectionOutputSchema>;

export async function analyzeReflectionForProgress(
  input: AnalyzeReflectionInput
): Promise<AnalyzeReflectionOutput> {
  return analyzeReflectionForProgressFlow(input);
}

const reflectionAnalysisPrompt = ai.definePrompt({
  name: 'reflectionAnalysisPrompt',
  input: {schema: AnalyzeReflectionInputSchema},
  output: {schema: AnalyzeReflectionOutputSchema},
  prompt: `Analyze the following Ramadan reflection and provide a one-sentence summary of the user's spiritual progress:

  Reflection: {{{reflectionText}}}
  \n  Progress Summary: `,
});

const analyzeReflectionForProgressFlow = ai.defineFlow(
  {
    name: 'analyzeReflectionForProgressFlow',
    inputSchema: AnalyzeReflectionInputSchema,
    outputSchema: AnalyzeReflectionOutputSchema,
  },
  async input => {
    const {output} = await reflectionAnalysisPrompt(input);
    return output!;
  }
);
