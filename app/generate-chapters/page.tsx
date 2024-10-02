import React from "react";
import PageContent from "./generate-child-component";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  return <PageContent />;
};

export default page;
