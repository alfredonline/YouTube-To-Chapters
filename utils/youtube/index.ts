"use server";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

export interface SubtitlesResponse {
  subtitles: Subtitle[];
  format: string;
  msg: string;
  translationLanguages: TranslationLanguage[];
}

export interface Subtitle {
  languageName: string;
  languageCode: string;
  isTranslatable: boolean;
  url: string;
}

export interface TranslationLanguage {
  languageCode: string;
  languageName: string;
}

export interface VideoDetails {
  id: string;
  title: string;
  lengthSeconds: string;
  keywords: string[];
  channelTitle: string;
  channelId: string;
  description: string;
  thumbnail: Thumbnail[];
  allowRatings: boolean;
  viewCount: string;
  isPrivate: boolean;
  isUnpluggedCorpus: boolean;
  isLiveContent: boolean;
  isCrawlable: boolean;
  isFamilySafe: boolean;
  availableCountries: string[];
  isUnlisted: boolean;
  category: string;
  publishDate: string;
  uploadDate: string;
  subtitles: Subtitles;
  storyboards: Storyboard[];
  superTitle: any;
  likeCount: string;
  channelThumbnail: ChannelThumbnail[];
  channelBadges: string[];
  subscriberCountText: string;
  subscriberCount: number;
  commentCountText: string;
  commentCount: number;
  relatedVideos: RelatedVideos;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Subtitles {
  subtitles: Subtitle[];
  format: string;
  translationLanguages: TranslationLanguage[];
}

export interface Subtitle {
  languageName: string;
  languageCode: string;
  isTranslatable: boolean;
  url: string;
}

export interface TranslationLanguage {
  languageCode: string;
  languageName: string;
}

export interface Storyboard {
  width: string;
  height: string;
  thumbsCount: string;
  columns: string;
  rows: string;
  interval: string;
  storyboardCount: number;
  url: string[];
}

export interface ChannelThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface RelatedVideos {
  continuation: string;
  data: Daum[];
}

export interface Daum {
  type: string;
  videoId: string;
  title: string;
  lengthText: string;
  viewCount: string;
  publishedTimeText: string;
  thumbnail: Thumbnail2[];
  channelTitle: string;
  channelId: string;
  channelThumbnail: ChannelThumbnail2[];
}

export interface Thumbnail2 {
  url: string;
  width: number;
  height: number;
}

export interface ChannelThumbnail2 {
  url: string;
  width: number;
  height: number;
}

export async function getVideoIdFromLink(link: string): Promise<string | null> {
  const videoIdPattern = /[?&]v=([^&]+)/;
  const match = link.match(videoIdPattern);
  return match ? match[1] : null;
}

export async function fetchFromYouTubeApi<T>(
  endpoint: string,
  params: Record<string, string>
): Promise<T | null> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://yt-api.p.rapidapi.com/${endpoint}`,
      params: {
        id: params.videoId,
      },
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
      },
    };

    const response: AxiosResponse<T> = await axios.request(options);

    if (response.status !== 200 || !response.data) {
      console.error(
        "failed to fetch from youtube api",
        response.status,
        response.data
      );
      return null;
    }

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("failed to fetch from youtube api", error);
    return null;
  }
}

export async function getVideoDetails(videoId: string) {
  if (!videoId) {
    throw new Error("videoId is required");
  }

  return fetchFromYouTubeApi<VideoDetails>("video/info", { videoId });
}

export async function getVideoTranscript(
  videoId: string
): Promise<SubtitlesResponse | null> {
  if (!videoId) {
    throw new Error("videoId is required");
  }

  return fetchFromYouTubeApi<SubtitlesResponse>("subtitles", { videoId });
}
