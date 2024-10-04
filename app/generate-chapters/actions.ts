"use server";

import { validateYouTubeLink } from "@/utils/validation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import {
  getVideoDetails,
  getVideoIdFromLink,
  getVideoTranscript,
} from "@/utils/youtube";
import { parseXMLContent } from "@/utils/parsing";
import { generateChaptersWithOpenAI } from "@/utils/openai";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type GenerateChaptersResponse = {
  success: boolean;
  error?: string;
  data?: {
    title: string;
    content: string[];
    userId: string;
    id: string;
    createdAt: Date;
  };
};

export async function generateChapters(
  formData: FormData
): Promise<GenerateChaptersResponse> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { success: false, error: "authentication_required" };
  }

  const userDB = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!userDB) {
    return {
      success: false,
      error: "user_not_found",
    };
  }

  const link = formData.get("link") as string;
  if (!link) {
    return { success: false, error: "link_required" };
  }

  if (!(await validateYouTubeLink(link))) {
    return { success: false, error: "invalid_youtube_link" };
  }

  const videoId = await getVideoIdFromLink(link);

  if (!videoId) {
    return {
      success: false,
      error: "failed_to_get_video_id",
    };
  }

  const videoDetails = await getVideoDetails(videoId);
  const videoTranscript = await getVideoTranscript(videoId);

  if (
    !videoDetails ||
    !videoTranscript?.subtitles ||
    videoTranscript.subtitles.length === 0
  ) {
    return {
      success: false,
      error: "video_issue",
    };
  }

  const lengthSeconds =
    typeof videoDetails.lengthSeconds === "string"
      ? parseInt(videoDetails.lengthSeconds, 10)
      : videoDetails.lengthSeconds;

  if (isNaN(lengthSeconds)) {
    return {
      success: false,
      error: "video_issue",
    };
  }

  if (lengthSeconds > 3600) {
    return {
      success: false,
      error: "video_too_long",
    };
  }

  const parsedTranscript = await parseXMLContent(videoTranscript.subtitles[0]);

  if (!parsedTranscript) {
    return {
      success: false,
      error: "subtitles_issue",
    };
  }

  const openAiChapters = await generateChaptersWithOpenAI(
    parsedTranscript,
    lengthSeconds
  );

  if (!openAiChapters) {
    return {
      success: false,
      error: "openai_issue",
    };
  }

  const saveChaptersToDatabase = await prisma.chapterSet.create({
    data: {
      title: videoDetails.title,
      content: openAiChapters,
      userId: userDB.id,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: true,
    data: saveChaptersToDatabase,
  };
}
