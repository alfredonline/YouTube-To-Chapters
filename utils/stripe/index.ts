import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2024-06-20",
});

interface StripeSubscription {
  status: string;
  current_period_start: number;
  current_period_end: number;
  created: number;
}

export async function hasSubscription(): Promise<{
  isSubscribed: boolean;
  subscriptionData: StripeSubscription[];
}> {
  const session = await getServerSession(authOptions);

  if (session && session.user?.email) {
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user?.stripe_customer_id) {
      return {
        isSubscribed: false,
        subscriptionData: [],
      };
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: String(user?.stripe_customer_id),
    });

    return {
      isSubscribed: subscriptions.data.length > 0,
      subscriptionData: subscriptions.data,
    };
  }

  return {
    isSubscribed: false,
    subscriptionData: [],
  };
}

export async function createCheckoutLink(customer: string) {
  const checkout = await stripe.checkout.sessions.create({
    success_url: `http://localhost:3000/dashboard`,
    cancel_url: `http://localhost:3000/dashboard`,
    customer: customer,
    line_items: [
      {
        price: process.env.PRICE_KEY,
        quantity: 1,
      },
    ],
    mode: "subscription",
  });

  return checkout.url;
}

export async function generateCustomerPortalLink(customerId: string) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: "http://localhost:3000/dashboard",
    });

    return portalSession.url;
  } catch (error) {
    throw new Error("Failed to generate portal link");
  }
}

export async function createCustomerIfNull() {
  const session = await getServerSession(authOptions);

  if (session && session.user?.email) {
    const userDB = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });

    if (!userDB?.stripe_customer_id) {
      const customer = await stripe.customers.create({
        email: session.user.email,
      });

      await prisma.user.update({
        where: {
          id: userDB?.id,
        },
        data: {
          stripe_customer_id: customer.id,
        },
      });

      const user2 = await prisma.user.findFirst({
        where: {
          id: userDB?.id,
        },
      });

      return user2?.stripe_customer_id;
    }
  }
}

export async function checkChapterCreationEligibility(): Promise<{
  isEligible: boolean;
  message: string;
  remainingGenerations: number;
}> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return {
      isEligible: false,
      message: "You must be logged in to check your eligibility",
      remainingGenerations: 0,
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  if (!user) {
    return {
      isEligible: false,
      message: "You must be logged in to check your eligibility",
      remainingGenerations: 0,
    };
  }

  const stripeSubscriptionData = await hasSubscription();

  const currentDate = new Date();

  let isSubscribed = false;
  let periodStart: number;
  let periodEnd: number;
  let subscriptionDated: number | null = null;

  if (stripeSubscriptionData.subscriptionData.length > 0) {
    const subscription = stripeSubscriptionData.subscriptionData[0];
    isSubscribed = subscription.status === "active";
    periodStart = subscription.current_period_start;
    periodEnd = subscription.current_period_end;
    subscriptionDated = subscription.created;
  } else {
    periodStart = Math.floor(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime() /
        1000
    );
    periodEnd = Math.floor(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getTime() / 1000
    );
  }

  const chapterGenerationCount = await prisma.chapterSet.count({
    where: {
      userId: user.id,
      createdAt: {
        gte: new Date(
          isSubscribed
            ? Math.max(periodStart, subscriptionDated!) * 1000
            : periodStart * 1000
        ),
        lt: new Date(periodEnd * 1000),
      },
    },
  });

  const limit = isSubscribed ? 40 : 5;
  const remainingGenerations = Math.max(0, limit - chapterGenerationCount);

  if (remainingGenerations === 0) {
    const resetDate = new Date(periodEnd * 1000).toLocaleDateString();
    return {
      isEligible: false,
      message: isSubscribed
        ? `You have reached the maximum number of chapters for this subscription period. Reset Date: ${resetDate}`
        : `You have reached the maximum number of chapter generations for the free tier. You can make more on ${resetDate}`,
      remainingGenerations: 0,
    };
  }

  return {
    isEligible: true,
    message: `You have ${remainingGenerations} chapter generation${
      remainingGenerations !== 1 ? "s" : ""
    } remaining for 
    this ${isSubscribed ? "billing cycle" : "month"}
    `,
    remainingGenerations: remainingGenerations,
  };
}
