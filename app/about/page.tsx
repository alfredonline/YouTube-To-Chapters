import Header from "@/components/common/Header";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { ChevronRightCircleIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <MaxWidthWrapper className="flex flex-col gap-8 py-12 min-h-screen">
      <Header text="About YouTubeToChapters" />
      <div className="grid md:grid-cols-2 gap-8 items-center w-full">
        <div className="space-y-6">
          <p className="text-xl text-muted-foreground leading-relaxed">
            YouTubeToChapters is a YouTube video to chapter converter that uses
            AI to generate chapters from YouTube videos.
          </p>
          <div className="bg-secondary p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">How it works</h2>
            <ul className="list-disc list-inside mb-2">
              <li>Automatic chapter generation for YouTube videos</li>
              <li>Easy to use</li>
              <li>No need to manually create chapters</li>
            </ul>
          </div>
        </div>
        <Image
          src="https://res.cloudinary.com/damqrrryq/image/upload/v1727349411/pexels-divinetechygirl-1181244_tlg3ic.jpg"
          alt="YouTubeToChapters"
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="bg-primary/5 p-6 rounded-lg mt-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            About AlfieWebDev
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            AlfieWebDev is a YouTube channel that creates educational content
            with a focus on web dev.
          </p>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            className="mt-4 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Watch the development journey
            <ChevronRightCircleIcon className="w-4 h-4 ml-2" />
          </a>
        </div>
    </MaxWidthWrapper>
  );
};

export default Page;
