import { MailIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            📜
            <span className="text-lg font-bold">YouTubeToChapters</span>
          </Link>
          <p className="text-gray-500 dark:text-gray-400">
            YouTubeToChapters is a tool that allows you to generate timestamps for your YouTube videos.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold">Contact</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MailIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>
                <a href="mailto:hello@alfiewebdev.com">
                  hello@alfiewebdev.com
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold">Get in touch with the creator</h4>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.youtube.com/@alfiewebdev"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="h-6 w-6" />
            </Link>
            <Link
              href="https://x.com/alfiewebdev"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
              target="_blank"
              rel="noopener noreferrer"
            >
              <XIcon className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/alfie-fort-39ba19264/"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            &copy; 2024 YouTubeToChapters. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Designed and developed by{" "}
            <Link
              href="#"
              className="text-gray-900 hover:underline dark:text-gray-50"
              prefetch={false}
              target="_blank"
              rel="noopener noreferrer"
            >
              AlfieWebDev
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
