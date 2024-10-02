"use server"

export async function validateYouTubeLink(link: string): Promise<boolean> {
  const isYouTubeLink =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})(\S*)?$/;
  return isYouTubeLink.test(link);
}
