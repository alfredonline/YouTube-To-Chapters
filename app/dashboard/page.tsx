import Header from "@/components/common/Header";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ChaptersWrapper from "@/components/ChaptersWrapper";
import {
  checkChapterCreationEligibility,
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "@/utils/stripe";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return redirect("/signin");
  }

  await createCustomerIfNull();

  const subscribed = await hasSubscription();

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    select: {
      savedChapters: true,
      stripe_customer_id: true,
    },
  });

  if (!user) {
    return redirect("/signin");
  }

  const manage_link = await generateCustomerPortalLink(
    "" + user?.stripe_customer_id
  );
  const checkout_link = await createCheckoutLink("" + user?.stripe_customer_id);

  const { isEligible, message } =
    await checkChapterCreationEligibility();

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-4 mt-12">
        <div className="flex flex-row justify-between items-center">
          <Header text={`👋 Hello, ${session?.user?.name || "User"}`} />
          {subscribed.isSubscribed && (
            <Link
              href={"" + manage_link}
              className={buttonVariants({
                variant: "outline",
                className: "w-48",
              })}
            >
              Manage subscription
            </Link>
          )}
          {!subscribed.isSubscribed && (
            <Link
              href={"" + checkout_link}
              className={buttonVariants({
                variant: "default",
                className: "w-48",
              })}
            >
              Upgrade to premium
            </Link>
          )}
        </div>
        {isEligible && message}
        {!isEligible && message}
      </div>
      <ChaptersWrapper user={user && {
        savedChapters: user.savedChapters,
        stripe_customer_id: user.stripe_customer_id || ''
      }} />
    </MaxWidthWrapper>
  );
};

export default Page;
