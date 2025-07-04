

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import {
  createOrUpdateSubscription,
  updateUserPoints,
} from "@/utils/db/actions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: Request) {
  const body = await req.text();

  const headerList = await headers();
  const signature = headerList.get("Stripe-Signature") as string;

  if (!signature) {
    console.error("No Stripe signature found");
    return NextResponse.json({ error: "No Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
  let message = "Unknown error";

  if (err instanceof Error) {
    message = err.message;
  }

  console.error(`Webhook signature verification failed: ${message}`);

  return NextResponse.json(
    { error: `Webhook Error: ${message}` },
    { status: 400 }
  );
}


  console.log(`Received event type: ${event.type}`);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;
    const subscriptionId = session.subscription as string;

    if (!userId || !subscriptionId) {
      console.error("Missing userId or subscriptionId in session", { session });
      return NextResponse.json(
        { error: "Invalid session data" },
        { status: 400 }
      );
    }

    try {
      console.log(`Retrieving subscription: ${subscriptionId}`);
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      console.log("Retrieved subscription:", subscription);

      if (!subscription.items.data.length) {
        console.error("No items found in subscription", { subscription });
        return NextResponse.json(
          { error: "Invalid subscription data" },
          { status: 400 }
        );
      }

      const priceId = subscription.items.data[0].price.id;
      console.log(`Price ID: ${priceId}`);

      let plan: string;
      let pointsToAdd: number;

      // Map price IDs to plan names and points
      switch (priceId) {
        case "price_1RcN6rPgwnvQepbn0cIrZoSS":
          plan = "Basic";
          pointsToAdd = 100;
          break;
        case "price_1RcN8UPgwnvQepbnResz5sfD":
          plan = "Pro";
          pointsToAdd = 500;
          break;
        default:
          console.error("Unknown price ID", { priceId });
          return NextResponse.json(
            { error: "Unknown price ID" },
            { status: 400 }
          );
      }

      console.log(`Creating/updating subscription for user ${userId}`);

      function safeDate(timestamp?: number | null): Date {
        return timestamp ? new Date(timestamp * 1000) : new Date();
      }
      

      const updatedSubscription = await createOrUpdateSubscription(
        userId,
        subscriptionId,
        plan,
        "active",
       // @ts-expect-error: Stripe types missing for current_period_start
        safeDate(subscription.current_period_start),
        // @ts-expect-error: Stripe types missing for current_period_end
        safeDate(subscription.current_period_end)
      );

      if (!updatedSubscription) {
        console.error("Failed to create or update subscription");
        return NextResponse.json(
          { error: "Failed to create or update subscription" },
          { status: 500 }
        );
      }

      console.log(`Updating points for user ${userId}: +${pointsToAdd}`);
      await updateUserPoints(userId, pointsToAdd);

      console.log(`Successfully processed subscription for user ${userId}`);
    } catch (error: unknown) {
  console.error("Error processing subscription:", error);

  let message = "Error processing subscription";

  if (error instanceof Error) {
    message = error.message;
  }

  return NextResponse.json(
    { error: message },
    { status: 500 }
  );
    }
  }


  return NextResponse.json({ received: true });
}
