"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
export default function Page() {
  return (
    <div className="relative min-h-screen container flex flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative w-full h-40 lg:h-full lg:flex lg:flex-col bg-muted p-10 text-white dark:border-r">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/damqrrryq/image/upload/v1727349411/pexels-divinetechygirl-1181244_tlg3ic.jpg"
            alt="background"
            layout="fill"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      </div>
      <div className="w-full p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-centr space-y-6 sm:w-[350px]">
          <Button
            className="p-4 w-full text-base font-semibold flex items-center justify-center"
            style={{
              backgroundColor: "#5165F6",
              color: "white",
            }}
            onClick={() => signIn("discord", { callbackUrl: "/dashboard"})}
          >
            <FaDiscord className="mr-2 text-2xl" />
            <span>Log in with Discord</span>
          </Button>
          <p className="px-4 text-center text-sm text-muted-foreground">
            By signing in, you agree to our <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
