"use client";

import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { useSearchParams } from "next/navigation";
import React from "react";
import Link from "next/link";

const errors = {
  subtitles_issue: "There was an issue with the subtitles. Please try again.",
  video_issue: "There was an issue with the video. Please try again.",
  failed_to_get_video_id: "Failed to get the video ID. Please try again.",
  unknown_error: "An unknown error occurred. Please try again.",
  user_not_found: "User not found. Please try again.",
  authentication_required: "Authentication is required. Please sign in.",
  invalid_youtube_link: "Invalid YouTube link. Please try again.",
  video_too_long: "Video is too long. Please try again.",
  openai_issue: "There was an issue with OpenAI. Please try again.",
};

const Page = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  let errorMessage = errors.unknown_error;
  let errorTitle = "Unknown Error";

  if (error) {
    if (errors[error as keyof typeof errors]) {
      errorMessage = errors[error as keyof typeof errors];
      errorTitle = error;
    }
  }

  return (
    <MaxWidthWrapper className="py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">{errorTitle}</h1>
      <p className="text-xl mb-6">{errorMessage}</p>
      <Link href="/" className="text-primary hover:text-primary/80">
        Go back to home
      </Link>
    </MaxWidthWrapper>
  );
};

export default Page;
