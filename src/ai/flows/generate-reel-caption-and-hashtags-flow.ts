'use server';
/**
 * @fileOverview A Genkit flow for generating Instagram reel captions and hashtags.
 *
 * - generateReelCaptionAndHashtags - A function that generates creative Instagram captions and trending hashtags.
 * - GenerateReelCaptionAndHashtagsInput - The input type for the generateReelCaptionAndHashtags function.
 * - GenerateReelCaptionAndHashtagsOutput - The return type for the generateReelCaptionAndHashtags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReelCaptionAndHashtagsInputSchema = z.object({
  concept: z
    .string()
    .describe('A brief description or concept for the Instagram reel.'),
});
export type GenerateReelCaptionAndHashtagsInput = z.infer<
  typeof GenerateReelCaptionAndHashtagsInputSchema
>;

const GenerateReelCaptionAndHashtagsOutputSchema = z.object({
  captions: z
    .array(z.string())
    .describe('Multiple creative and engaging caption options for the Instagram reel.'),
  hashtags: z
    .array(z.string())
    .describe('A set of trending and relevant hashtags for the Instagram reel.'),
});
export type GenerateReelCaptionAndHashtagsOutput = z.infer<
  typeof GenerateReelCaptionAndHashtagsOutputSchema
>;

export async function generateReelCaptionAndHashtags(
  input: GenerateReelCaptionAndHashtagsInput
): Promise<GenerateReelCaptionAndHashtagsOutput> {
  return generateReelCaptionAndHashtagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReelCaptionAndHashtagsPrompt',
  input: {schema: GenerateReelCaptionAndHashtagsInputSchema},
  output: {schema: GenerateReelCaptionAndHashtagsOutputSchema},
  prompt: `You are an expert social media manager specializing in Instagram Reels. Your task is to generate creative and engaging caption options along with a set of trending and relevant hashtags for an Instagram reel based on the provided concept.

The reel concept is: "{{{concept}}}"

Please generate:
1. At least 3 distinct caption options, each designed to maximize engagement and virality.
2. A list of 5-10 trending and highly relevant hashtags.

Ensure the output is strictly in JSON format matching the provided schema.`,
});

const generateReelCaptionAndHashtagsFlow = ai.defineFlow(
  {
    name: 'generateReelCaptionAndHashtagsFlow',
    inputSchema: GenerateReelCaptionAndHashtagsInputSchema,
    outputSchema: GenerateReelCaptionAndHashtagsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
