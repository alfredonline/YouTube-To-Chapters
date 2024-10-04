"use server";
import { OpenAI } from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { ChapterSet } from "@prisma/client";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ChapterSchema = z.object({
  chapters: z.array(z.string()),
});

export async function generateChaptersWithOpenAI(
  parsedTranscript: {
    text: string;
    timestamp: string;
  }[],
  length: number
): Promise<string[] | null> {
  try {
    const response = await client.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that generates chapters / timestamps for a video based on the transcript of a video. The transcript contains the timestamp for the beginning of a sentence as well as the sentence itself. ",
        },
        {
          role: "user",
          content: `Generate chapters / timestamps for a video based on the following array of objects where each object represents a sentence.
                        Each timestamp / chapter should summarise a section of the video. Your job is to find the natural stopping points for the video 
                        based on the transcript. You MUST include timestamps in your response for each chapter. The length of the video is ${length} seconds. 
                        The timestamps should not exceed the length of the video. The timestamps should be in the following format: [00:00].
                        The transcript is as follows: ${parsedTranscript
                          .map(
                            ({ text, timestamp }) => `${timestamp} - ${text}`
                          )
                          .join("\n")}
                        }
                    `,
        },
      ],
      response_format: zodResponseFormat(ChapterSchema, "ChapterSchema"),
    });

    if (!response.choices[0].message.parsed) {
      throw new Error("No parsed response");
    }

    return response.choices[0].message.parsed.chapters;
  } catch (error) {
    console.error(error);
    return null;
  }
}
